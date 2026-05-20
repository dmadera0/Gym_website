import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

const INFO = [
  { icon: MapPin, label: 'Location', value: '2847 Industrial Blvd, Suite 101\nAustin, TX 78723' },
  { icon: Phone,  label: 'Phone',    value: '(512) 555-0182' },
  { icon: Mail,   label: 'Email',    value: 'hello@ironboxcrossfit.com' },
]

const HOURS = [
  { days: 'Monday – Friday', time: '5:30 AM – 8:00 PM' },
  { days: 'Saturday',        time: '8:00 AM – 1:00 PM' },
  { days: 'Sunday',          time: '9:00 AM – 12:00 PM' },
]

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-red-600 transition-colors placeholder-zinc-700'

  return (
    <section id="contact" className="bg-zinc-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="font-heading font-bold text-[11px] tracking-[0.3em] uppercase text-red-500 mb-3">Get In Touch</p>
          <h2 className="font-heading font-black italic text-5xl sm:text-6xl text-white mb-4">START YOUR JOURNEY</h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            Questions about membership? Ready to sign up? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="bg-zinc-950 border border-zinc-800 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-14 h-14 border-2 border-red-600 flex items-center justify-center mb-5">
                  <Send size={22} className="text-red-500" />
                </div>
                <h3 className="font-heading font-black text-2xl text-white mb-2">Message Sent!</h3>
                <p className="text-zinc-400 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-heading font-bold text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Full Name</label>
                    <input type="text" required value={form.name} onChange={set('name')}
                      className={inputClass} placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block font-heading font-bold text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={set('email')}
                      className={inputClass} placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block font-heading font-bold text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Phone <span className="text-zinc-700 normal-case tracking-normal">(optional)</span></label>
                  <input type="tel" value={form.phone} onChange={set('phone')}
                    className={inputClass} placeholder="(512) 555-0000" />
                </div>
                <div>
                  <label className="block font-heading font-bold text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Message</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your fitness goals..." />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white font-heading font-black text-[11px] tracking-[0.2em] uppercase transition-all duration-200 shadow-lg shadow-red-900/30"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info column */}
          <div className="space-y-4">
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 p-5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-red-500" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[10px] tracking-widest uppercase text-zinc-600 mb-1">{label}</p>
                  <p className="text-zinc-300 text-sm whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="p-5 bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600/10 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                  <Clock size={17} className="text-red-500" />
                </div>
                <p className="font-heading font-bold text-[10px] tracking-widest uppercase text-zinc-600">Gym Hours</p>
              </div>
              <div className="space-y-2.5">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between items-center text-sm border-b border-zinc-800/80 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-zinc-500">{h.days}</span>
                    <span className="text-zinc-300 font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="h-44 bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center gap-2">
              <MapPin size={26} className="text-zinc-700" />
              <p className="text-zinc-600 text-xs font-heading font-bold tracking-widest uppercase">Google Maps Embed</p>
              <p className="text-zinc-700 text-[11px]">Replace with your iframe embed code</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
