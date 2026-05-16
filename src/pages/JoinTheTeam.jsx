import React, { useState } from 'react'
import { getApplications, saveApplications } from '../store'

const rules = [
  { n: '1', text: <>Request release from 7th period at <strong>3:25 PM</strong>.</> },
  { n: '2', text: <>Report directly to the <strong>cafeteria couches</strong> upon release.</> },
  { n: '3', text: <><strong>No yelling or horseplay</strong> at the tables — keep it professional!</> },
  { n: '⚠', text: <>Missing a signed-up sale results in a <strong>one-sale suspension</strong>. Don't ghost us!</>, warn: true },
]

export default function JoinTheTeam() {
  const [form, setForm] = useState({ name: '', grade: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.grade) return
    const app = { id: Date.now(), name: form.name, grade: form.grade, submittedAt: new Date().toLocaleString() }
    saveApplications([...getApplications(), app])
    setSubmitted(true)
  }
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Application submitted!</h3>
              <p className="text-gray-500 text-sm">We'll reach out before the next sale. Thanks for signing up!</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', grade: '' }) }}
                className="mt-6 text-teal-600 text-sm underline">Submit another</button>
            </div>
          ) : (
            <>
              <div className="text-4xl mb-3">🤝</div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Apply for Next Sale</h2>
              <p className="text-sm text-gray-400 mb-5">Fill out the form below and we'll add you to the next sale rotation!</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">Student Name</label>
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">Grade</label>
                  <select value={form.grade} onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400">
                    <option value="">Select grade</option>
                    {['6th', '7th', '8th'].map(g => <option key={g}>{g}</option>)}
                  </select>
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
