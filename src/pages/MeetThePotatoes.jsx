import React, { useState, useEffect } from 'react'
import { getOfficers } from '../store'

const saleRoles = [
  { emoji: '🛡️', role: 'Security', desc: 'Keeps the table area safe and organized.' },
  { emoji: '🍦', role: 'Ice Cream', desc: 'Hands out ice cream to customers.' },
  { emoji: '🐧', role: 'Mascot', desc: 'Hypes up the crowd and attracts customers.' },
  { emoji: '💰', role: 'Treasurer', desc: 'Handles cash and counts the money.' },
]

export default function MeetThePotatoes() {
  const [officers, setOfficers] = useState(getOfficers)

  useEffect(() => {
    const sync = () => setOfficers(getOfficers())
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-6 text-center">
        <span className="bg-white/20 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block uppercase">🥔 Meet the Potatoes</span>
        <h1 className="text-4xl font-black mb-2">The <span className="text-teal-200">Officer Team</span></h1>
        <p className="text-teal-100 text-base">The dedicated (and slightly ridiculous) potatoes keeping A4A running every Friday.</p>
      </section>

      {/* Officer Cards */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-14">
          {officers.map(o => (
            <div key={o.id} className="bg-white rounded-2xl border border-teal-100 shadow-sm p-5 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-2xl mx-auto mb-3 overflow-hidden">
                {o.pic ? <img src={o.pic} alt={o.name} className="w-full h-full object-cover" /> : o.name[0]}
              </div>
              <p className="font-bold text-gray-800 text-sm">{o.name}</p>
              <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mt-0.5 mb-2">{o.role}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Standard Sale Roles */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Standard Sale Roles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {saleRoles.map(r => (
            <div key={r.role} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <div className="text-4xl mb-3">{r.emoji}</div>
              <p className="font-bold text-gray-800 text-sm mb-1">{r.role}</p>
              <p className="text-gray-400 text-xs">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
