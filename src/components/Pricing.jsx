import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Drop-In',
    price: '$25',
    per: 'per session',
    tagline: 'Come try us out.',
    features: [
      'Single class access',
      'All skill levels welcome',
      'Coach-led WOD',
      'All equipment provided',
    ],
    cta: 'Book a Drop-In',
    featured: false,
  },
  {
    name: 'Monthly',
    price: '$150',
    per: 'per month',
    tagline: 'Unlimited classes, unlimited gains.',
    features: [
      'Unlimited class access',
      'All class types included',
      'Progress tracking dashboard',
      'Nutrition coaching',
      'Community events & challenges',
      'Cancel anytime',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Annual',
    price: '$120',
    per: 'per month, billed yearly',
    tagline: 'Best value — save $360/yr.',
    features: [
      'Everything in Monthly',
      '2 months free vs. monthly',
      'Quarterly personal goal review',
      'Priority class booking',
      'Guest passes (2× / month)',
      'Merchandise discount',
    ],
    cta: 'Get Annual Access',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-zinc-950 py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="font-heading font-bold text-[11px] tracking-[0.3em] uppercase text-red-500 mb-3">Membership Plans</p>
          <h2 className="font-heading font-black italic text-5xl sm:text-6xl text-white mb-4">INVEST IN YOURSELF</h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            No contracts, no hidden fees. Honest pricing for world-class coaching.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col transition-colors duration-300 ${
                plan.featured
                  ? 'border-2 border-red-600 bg-zinc-900'
                  : 'border border-zinc-800 bg-zinc-900 hover:border-zinc-600'
              }`}
            >
              {plan.featured && (
                <>
                  <div className="absolute -top-px left-0 right-0 h-0.5 bg-red-600" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-3 py-1 bg-red-600 text-white font-heading font-black text-[10px] tracking-widest uppercase">
                      Most Popular
                    </span>
                  </div>
                </>
              )}

              {/* Header */}
              <div className="p-8 border-b border-zinc-800">
                <p className="font-heading font-black text-[11px] tracking-widest uppercase text-zinc-500 mb-4">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-heading font-black text-5xl text-white">{plan.price}</span>
                </div>
                <p className="font-heading font-semibold text-xs tracking-wide text-zinc-600 mb-3">{plan.per}</p>
                <p className="text-zinc-400 text-sm">{plan.tagline}</p>
              </div>

              {/* Features + CTA */}
              <div className="p-8 flex flex-col flex-1">
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${plan.featured ? 'text-red-500' : 'text-zinc-500'}`}
                        strokeWidth={2.5}
                      />
                      <span className="text-zinc-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`w-full py-3.5 font-heading font-black text-[11px] tracking-[0.2em] uppercase text-center transition-all duration-200 ${
                    plan.featured
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30'
                      : 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-8">
          Student & first-responder discounts available — contact us to learn more.
        </p>
      </div>
    </section>
  )
}
