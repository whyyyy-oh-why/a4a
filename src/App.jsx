import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import JoinTheTeam from './pages/JoinTheTeam'
import MeetThePotatoes from './pages/MeetThePotatoes'
import OurImpact from './pages/OurImpact'
import Members from './pages/Members'
import Login from './pages/Login'
import Moderator from './pages/Moderator'
import { isAuthed } from './store'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'The Shop' },
  { to: '/join', label: 'Join the Team' },
  { to: '/potatoes', label: 'Officers' },
  { to: '/impact', label: 'Our Impact' },
  { to: '/members', label: 'Members' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-teal-600 tracking-tight">A4A <span className="text-gray-800 font-semibold text-base">Sweet Impact</span></Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>)}
        </div>

        <Link to="/login" className="hidden md:block bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          Login
        </Link>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden text-gray-600 text-2xl">☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mt-2">Login</Link>
        </div>
      )}
    </nav>
  )
}

function ProtectedRoute({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/join" element={<JoinTheTeam />} />
        <Route path="/potatoes" element={<MeetThePotatoes />} />
        <Route path="/impact" element={<OurImpact />} />
        <Route path="/members" element={<Members />} />
        <Route path="/login" element={<Login />} />
        <Route path="/moderator" element={<ProtectedRoute><Moderator /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
