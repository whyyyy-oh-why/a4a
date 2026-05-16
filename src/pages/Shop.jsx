import React, { useState } from 'react'
import { getOrders, saveOrders, getSaleApps, saveSaleApps } from '../store'

const ITEMS = [
  { emoji: '🍦', name: 'Ice Cream', desc: 'Classic soft serve', price: '$2.00' },
  { emoji: '🍪', name: 'Cookies', desc: 'Freshly stocked', price: '$1.00' },
  { emoji: '🍟', name: 'Chips', desc: 'Savory option', price: '$2.00', note: 'Only available sometimes' },
]

export default function Shop() {
  const [form, setForm] = useState({ name: '', grade: '', items: [] })
  const [submitted, setSubmitted] = useState(false)
  const [appForm, setAppForm] = useState({ name: '', grade: '', teacher: '' })
  const [appSubmitted, setAppSubmitted] = useState(false)

  const handleAppSubmit = (e) => {
    e.preventDefault()
    if (!appForm.name || !appForm.grade || !appForm.teacher) return
    saveSaleApps([...getSaleApps(), { id: Date.now(), ...appForm, submittedAt: new Date().toLocaleString() }])
    setAppSubmitted(true)
  }

  const toggleItem = (item) => {
    setForm(f => ({
      ...f,
      items: f.items.includes(item) ? f.items.filter(i => i !== item) : [...f.items, item]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.grade || form.items.length === 0) return
    const order = { id: Date.now(), ...form, submittedAt: new Date().toLocaleString() }
    saveOrders([...getOrders(), order])
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-6 text-center">
        <span className="bg-white/20 text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block uppercase">The Shop</span>
        <h1 className="text-4xl font-black mb-2">What We're Selling</h1>
        <p className="text-teal-100 text-base">Every purchase fights malaria. Pick your items below.</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        {/* Menu */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
          <div className="space-y-3">
            {ITEMS.map(item => (
              <div key={item.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                  {item.note && <p className="text-xs text-amber-500 mt-0.5">{item.note}</p>}
                </div>
                <span className="text-teal-600 font-bold text-lg">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-l-4 border-teal-400 bg-teal-50 rounded-r-xl p-4 text-sm text-gray-600">
            <strong>📦 Pickup Instructions:</strong> Reserved items must be picked up and paid for at the sales table by <strong>3:45 PM on Friday</strong>. Unclaimed orders may be sold to walk-up customers!
          </div>
        </div>

        {/* Pre-order form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pre-order submitted!</h3>
              <p className="text-gray-500 text-sm">See you Friday at 3:25 PM outside the cafeteria.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', grade: '', items: [] }) }}
                className="mt-6 text-teal-600 text-sm underline">Place another order</button>
            </div>
          ) : (
            <>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Pre-Order</p>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Reserve Your Items</h2>
              <p className="text-sm text-gray-400 mb-6">Fill out your reservation below. You'll pay at pickup on Friday!</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">Student Name</label>
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">Grade Level</label>
                  <select value={form.grade} onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400">
                    <option value="">Select grade</option>
                    {['6th', '7th', '8th'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-2">Item Selection</label>
                  <div className="space-y-2">
                    {[['🍦', 'Ice Cream – $2.00'], ['🍪', 'Cookies – $1.00'], ['🍟', 'Chips – $2.00 (Only available sometimes)']].map(([emoji, label]) => (
                      <label key={label} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.items.includes(label)}
                          onChange={() => toggleItem(label)}
                          className="w-5 h-5 rounded accent-teal-600" />
                        <span className="text-sm text-gray-700">{emoji} {label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition-colors">
                  Submit Pre-Order →
                </button>
                <p className="text-xs text-gray-400 text-center">You'll pay at pickup on Friday!</p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Apply to Join Next Sale */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {appSubmitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Application submitted!</h3>
              <p className="text-gray-500 text-sm">We'll let you know if you're selected for the next sale.</p>
              <button onClick={() => { setAppSubmitted(false); setAppForm({ name: '', grade: '', teacher: '' }) }}
                className="mt-6 text-teal-600 text-sm underline">Submit another</button>
            </div>
          ) : (
            <>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Next Sale</p>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Apply to Join the Next Sale</h2>
              <p className="text-sm text-gray-400 mb-6">Want to help out? Fill out the form below!</p>
              <form onSubmit={handleAppSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">Your Name</label>
                  <input type="text" placeholder="Full name" value={appForm.name}
                    onChange={e => setAppForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">Grade Level</label>
                  <select value={appForm.grade} onChange={e => setAppForm(f => ({ ...f, grade: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400">
                    <option value="">Select grade</option>
                    {['6th', '7th', '8th'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">7th Period Teacher</label>
                  <input type="text" placeholder="Teacher's name" value={appForm.teacher}
                    onChange={e => setAppForm(f => ({ ...f, teacher: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <button type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition-colors">
                  Submit Application →
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
