import React from 'react'

const rules = [
  { n: '1', text: <>Request release from 7th period at <strong>3:25 PM</strong>.</> },
  { n: '2', text: <>Report directly to the <strong>cafeteria couches</strong> upon release.</> },
  { n: '3', text: <><strong>No yelling or horseplay</strong> at the tables — keep it professional!</> },
  { n: '⚠', text: <>Missing a signed-up sale results in a <strong>one-sale suspension</strong>. Don't ghost us!</>, warn: true },
]

export default function JoinTheTeam() {
  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-6 text-center">
        <span className="bg-white/20 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block uppercase">Join the Team</span>
        <h1 className="text-4xl font-black mb-2">Member <span className="text-teal-200">Corner</span></h1>
        <p className="text-teal-100 text-base max-w-md mx-auto">Members are organized into Sections 1, 2, and 3 for sale rotations — so everyone gets a turn!</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
        {/* Sale Day Rules */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Sale Day Rules</h2>
          <div className="space-y-3">
            {rules.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${r.warn ? 'bg-amber-400 text-white' : 'bg-teal-600 text-white'}`}>{r.n}</span>
                <p className="text-sm text-gray-600 pt-1">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Member Perk */}
        <div className="bg-teal-600 rounded-2xl p-6 text-white flex flex-col justify-between">
          <div className="text-center">
            <div className="text-5xl mb-3">🍦</div>
            <h2 className="text-xl font-bold mb-2">Member Perk!</h2>
            <p className="text-teal-100 text-sm mb-3">Members helping with the sale get <strong>one free ice cream</strong> if there are extras at the end. Your reward for saving lives!</p>
            <p className="text-teal-200 text-xs italic">Subject to availability — first come, first served among helpers!</p>
          </div>
        </div>

        {/* Section Rotation */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">📅 Section Rotation</h2>
          <p className="text-sm text-gray-500 mb-4">Members rotate through three sections to keep things fair and ensure everyone gets to participate in sales.</p>
          <div className="flex gap-3">
            {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
              <span key={s} className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${['bg-teal-600', 'bg-teal-400', 'bg-green-500'][i]}`}>{s}</span>
            ))}
          </div>
        </div>

        {/* Apply */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="text-4xl mb-3">🤝</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Apply to Join the Next Sale</h2>
            <p className="text-sm text-gray-500 mb-4">Ready to make a difference and score free ice cream? Fill out our application form to join the team!</p>
          </div>
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center font-semibold py-3 rounded-full transition-colors">
            Apply Now →
          </a>
        </div>
      </div>
    </main>
  )
}
