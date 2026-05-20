#!/usr/bin/env bash
# Deploy Iron Box CrossFit to AWS S3 + CloudFront
# Usage: ./deploy.sh
# Re-run at any time to update; it reads .deploy-config to reuse existing resources.
set -euo pipefail

# ── Color helpers ─────────────────────────────────────────────────────────────
RED='\033[0;31m'; YEL='\033[1;33m'; GRN='\033[0;32m'; BLU='\033[0;34m'; NC='\033[0m'
info()    { echo -e "${BLU}▶${NC} $*"; }
success() { echo -e "${GRN}✓${NC} $*"; }
warn()    { echo -e "${YEL}⚠${NC}  $*"; }
die()     { echo -e "${RED}✗ $*${NC}" >&2; exit 1; }

CONFIG=".deploy-config"
REGION="${AWS_REGION:-us-east-1}"

# Load persisted config from previous runs
[[ -f "$CONFIG" ]] && source "$CONFIG"

# Generate a unique bucket name on first run
[[ -z "${BUCKET_NAME:-}" ]] && BUCKET_NAME="iron-box-crossfit-$(openssl rand -hex 4)"

echo ""
echo -e "${RED}┌──────────────────────────────────────────────┐${NC}"
echo -e "${RED}│   Iron Box CrossFit  ·  AWS Deploy Script    │${NC}"
echo -e "${RED}└──────────────────────────────────────────────┘${NC}"
echo ""

# ── Prerequisites ─────────────────────────────────────────────────────────────
command -v aws  &>/dev/null || die "AWS CLI not found — https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html"
command -v node &>/dev/null || die "Node.js not found — https://nodejs.org"
command -v npm  &>/dev/null || die "npm not found"
aws sts get-caller-identity &>/dev/null || die "AWS credentials not configured. Run: aws configure"

ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
success "AWS account: $ACCOUNT_ID  |  region: $REGION"

# ── Build ─────────────────────────────────────────────────────────────────────
info "Installing dependencies..."
npm ci --silent

info "Building production bundle..."
npm run build
success "Build complete → dist/"

# ── S3 Bucket ─────────────────────────────────────────────────────────────────
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
  info "Reusing existing bucket: $BUCKET_NAME"
else
  info "Creating S3 bucket: $BUCKET_NAME ($REGION)..."
  if [[ "$REGION" == "us-east-1" ]]; then
    aws s3api create-bucket \
      --bucket "$BUCKET_NAME" \
      --region "$REGION"
  else
    aws s3api create-bucket \
      --bucket "$BUCKET_NAME" \
      --region "$REGION" \
      --create-bucket-configuration LocationConstraint="$REGION"
  fi
  success "Bucket created"
fi

# Disable Block Public Access (required for public static hosting)
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Public read bucket policy
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy "$(cat <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
  }]
}
POLICY
)"

# Enable static website hosting
aws s3 website "s3://${BUCKET_NAME}" \
  --index-document index.html \
  --error-document index.html

S3_WEBSITE="${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
success "S3 static website: http://${S3_WEBSITE}"

# ── Upload files ──────────────────────────────────────────────────────────────
info "Syncing hashed assets (1-year cache)..."
aws s3 sync dist/ "s3://${BUCKET_NAME}/" \
  --delete \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --metadata-directive REPLACE \
  --quiet

info "Syncing HTML (no-cache)..."
aws s3 sync dist/ "s3://${BUCKET_NAME}/" \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --metadata-directive REPLACE \
  --quiet

success "Files uploaded"

# ── CloudFront ────────────────────────────────────────────────────────────────
if [[ -n "${CF_DISTRIBUTION_ID:-}" ]]; then
  info "Invalidating existing CloudFront distribution ($CF_DISTRIBUTION_ID)..."
  aws cloudfront create-invalidation \
    --distribution-id "$CF_DISTRIBUTION_ID" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text > /dev/null
  success "Cache invalidated"
else
  info "Creating CloudFront distribution (takes ~2 min)..."

  CF_CONFIG_TMP=$(mktemp)
  trap "rm -f $CF_CONFIG_TMP" EXIT

  cat > "$CF_CONFIG_TMP" <<EOF
{
  "CallerReference": "iron-box-$(date +%s)",
  "Comment": "Iron Box CrossFit Website",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3WebsiteOrigin",
      "DomainName": "${S3_WEBSITE}",
      "CustomOriginConfig": {
        "HTTPPort": 80,
        "HTTPSPort": 443,
        "OriginProtocolPolicy": "http-only"
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3WebsiteOrigin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "Compress": true,
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": { "Quantity": 2, "Items": ["GET", "HEAD"] }
    }
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [{
      "ErrorCode": 404,
      "ResponseCode": "200",
      "ResponsePagePath": "/index.html",
      "ErrorCachingMinTTL": 0
    }]
  },
  "PriceClass": "PriceClass_100",
  "Enabled": true,
  "HttpVersion": "http2and3"
}
EOF

  CF_DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config "file://${CF_CONFIG_TMP}" \
    --query 'Distribution.Id' \
    --output text)

  CF_DOMAIN=$(aws cloudfront get-distribution \
    --id "$CF_DISTRIBUTION_ID" \
    --query 'Distribution.DomainName' \
    --output text)

  success "Distribution created: $CF_DISTRIBUTION_ID"
fi

# ── Persist config ────────────────────────────────────────────────────────────
CF_DOMAIN="${CF_DOMAIN:-$(aws cloudfront get-distribution --id "$CF_DISTRIBUTION_ID" --query 'Distribution.DomainName' --output text)}"

cat > "$CONFIG" <<EOF
BUCKET_NAME="${BUCKET_NAME}"
REGION="${REGION}"
CF_DISTRIBUTION_ID="${CF_DISTRIBUTION_ID}"
CF_DOMAIN="${CF_DOMAIN}"
EOF

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${GRN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
success "Deployment complete!"
echo -e "${GRN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${BLU}S3 Bucket${NC}    ${BUCKET_NAME}"
echo -e "  ${BLU}CF Dist ID${NC}   ${CF_DISTRIBUTION_ID}"
echo -e "  ${BLU}Live URL${NC}     ${GRN}https://${CF_DOMAIN}${NC}"
echo ""
warn "New distributions take 10–15 min to finish deploying globally."
warn "Re-run this script any time you make changes to update the site."
echo ""
