import React, { useState, useEffect } from 'react'
import { getSchedule, ROLES } from '../store'

export default function Members() {
  const [schedule, setSchedule] = useState({})
  useEffect(() => { setSchedule(getSchedule()) }, [])

  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-6 text-center">
        <span className="bg-white/20 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block uppercase">Members</span>
        <h1 className="text-4xl font-black mb-2">This Friday's <span className="text-teal-200">Schedule</span></h1>
        <p className="text-teal-100 text-base">Updated every school week on Wednesday after Win Time</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-teal-50">
              <tr>
                <th className="px-6 py-3 text-teal-700 font-semibold text-sm uppercase tracking-wide">Role</th>
                <th className="px-6 py-3 text-teal-700 font-semibold text-sm uppercase tracking-wide">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role, i) => (
                <tr key={role} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-700">{role}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {schedule[role] || <span className="italic text-gray-300">TBD</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
