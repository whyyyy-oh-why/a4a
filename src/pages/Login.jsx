import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PASSCODE, setAuthed, isAuthed } from '../store'

export default function Login() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  if (isAuthed()) {
    navigate('/moderator', { replace: true })
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code === PASSCODE) {
      setAuthed()
      navigate('/moderator', { replace: true })
    } else {
      setError('Incorrect passcode. Please try again.')
      setCode('')
    }
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Moderator Login</h1>
        <p className="text-gray-400 text-sm text-center mb-8">Enter your passcode to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError('') }}
            placeholder="Passcode"
            autoFocus
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center tracking-widest text-lg"
          />
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2 px-3">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
