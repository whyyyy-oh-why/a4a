import React, { useState, useEffect } from 'react'
import { getSchedule, ROLES } from '../store'

export default function Schedule() {
  const [schedule, setSchedule] = useState({})

  useEffect(() => { setSchedule(getSchedule()) }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Friday Schedule</h1>
        <p className="text-indigo-200 text-base">Updated every school week on Wednesday after Win Time</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-indigo-700 font-semibold text-sm uppercase tracking-wide">Role</th>
                <th className="px-6 py-3 text-indigo-700 font-semibold text-sm uppercase tracking-wide">Assigned To</th>
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
