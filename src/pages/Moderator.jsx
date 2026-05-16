import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSchedule, saveSchedule, getImages, saveImages, getOrders, saveOrders, clearOrders, clearAuthed, ROLES, getOfficers, saveOfficers, getApplications, saveApplications, clearApplications } from '../store'

function PicDropZone({ pic, onPic }) {
  const [over, setOver] = useState(false)
  const ref = useRef()
  const read = file => {
    if (!file || !file.type.startsWith('image/')) return
    const r = new FileReader()
    r.onload = e => onPic(e.target.result)
    r.readAsDataURL(file)
  }
  return (
    <div
      onClick={e => { e.stopPropagation(); ref.current.click() }}
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); read(e.dataTransfer.files[0]) }}
      className={`relative w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden shrink-0 transition-colors ${
        over ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300 bg-gray-50'
      }`}
    >
      {pic
        ? <img src={pic} className="w-full h-full object-cover" alt="" />
        : <span className="text-gray-400 text-xs text-center leading-tight px-1">Drop photo</span>
      }
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => read(e.target.files[0])} />
    </div>
  )
}

const TABS = [
  { id: 'home', label: '🏠 Home Page' },
  { id: 'schedule', label: '📅 Schedule' },
  { id: 'team', label: '👥 Team Page' },
  { id: 'orders', label: '🛒 Pre-Orders' },
  { id: 'applications', label: '📋 Applications' },
]

export default function Moderator() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('home')

  // Home Page (images)
  const [images, setImages] = useState([])
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  // Schedule
  const [schedule, setSchedule] = useState({})
  const [scheduleSaved, setScheduleSaved] = useState(false)

  // Team
  const [officers, setOfficers] = useState([])
  const [newOfficer, setNewOfficer] = useState({ name: '', role: '', desc: '', pic: '' })
  const [officerError, setOfficerError] = useState(false)
  const [officersSaved, setOfficersSaved] = useState(false)

  // Applications
  const [applications, setApplications] = useState([])

  // Orders
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setSchedule(getSchedule())
    setImages(getImages())
    setOrders(getOrders())
    setOfficers(getOfficers())
    setApplications(getApplications())
  }, [])

  const logout = () => { clearAuthed(); navigate('/login', { replace: true }) }

  // Schedule
  const handleScheduleChange = (role, val) => setSchedule(s => ({ ...s, [role]: val }))
  const handleSaveSchedule = () => {
    saveSchedule(schedule)
    setScheduleSaved(true)
    setTimeout(() => setScheduleSaved(false), 2000)
  }

  const deleteApplication = (id) => {
    const updated = applications.filter(a => a.id !== id)
    saveApplications(updated)
    setApplications(updated)
  }
  const clearAllApplications = () => { clearApplications(); setApplications([]) }

  // Orders
  const deleteOrder = (id) => {
    const updated = orders.filter(o => o.id !== id)
    saveOrders(updated)
    setOrders(updated)
  }
  const clearAllOrders = () => { clearOrders(); setOrders([]) }

  // Officers
  const addOfficer = () => {
    if (!newOfficer.name.trim() || !newOfficer.role.trim()) {
      setOfficerError(true)
      setTimeout(() => setOfficerError(false), 1500)
      return
    }
    setOfficers(prev => {
      const updated = [...prev, { ...newOfficer, id: Date.now() }]
      saveOfficers(updated)
      return updated
    })
    setNewOfficer({ name: '', role: '', desc: '', pic: '' })
  }
  const deleteOfficer = (id) => {
    const updated = officers.filter(o => o.id !== id)
    saveOfficers(updated)
    setOfficers(updated)
  }
  const updateOfficer = (id, field, val) => {
    setOfficers(prev => prev.map(o => o.id === id ? { ...o, [field]: val } : o))
  }
  const handleSaveOfficers = () => {
    saveOfficers(officers)
    setOfficersSaved(true)
    setTimeout(() => setOfficersSaved(false), 2000)
  }

  // Images
  const processFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prev => {
          const updated = [...prev, { id: Date.now() + Math.random(), src: e.target.result, caption: '' }]
          saveImages(updated)
          return updated
        })
      }
      reader.readAsDataURL(file)
    })
  }
  const updateCaption = (id, caption) => {
    setImages(prev => {
      const updated = prev.map(img => img.id === id ? { ...img, caption } : img)
      saveImages(updated)
      return updated
    })
  }
  const deleteImage = (id) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id)
      saveImages(updated)
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Moderator Panel</h1>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">Log out</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                tab === t.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Home Page Tab */}
        {tab === 'home' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Image Gallery</h2>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files) }}
              onClick={() => fileRef.current.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors mb-8 ${
                dragging ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <p className="text-gray-400 text-sm">Drag & drop images here, or <span className="text-indigo-500 font-medium">click to browse</span></p>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => processFiles(e.target.files)} />
            </div>
            {images.length === 0 ? (
              <p className="text-gray-400 italic text-sm">No images uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map(img => (
                  <div key={img.id} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="relative aspect-square bg-gray-100">
                      <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                      <button onClick={() => deleteImage(img.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow transition-colors">✕</button>
                    </div>
                    <input type="text" value={img.caption} onChange={e => updateCaption(img.id, e.target.value)}
                      placeholder="Add caption..."
                      className="w-full px-3 py-2 text-sm text-gray-600 border-t border-gray-100 focus:outline-none focus:bg-indigo-50" />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Schedule Tab */}
        {tab === 'schedule' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Friday Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {ROLES.map(role => (
                <div key={role}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{role}</label>
                  <input
                    type="text"
                    value={schedule[role] || ''}
                    onChange={e => handleScheduleChange(role, e.target.value)}
                    placeholder={`Assign ${role}...`}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleSaveSchedule}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              {scheduleSaved ? '✓ Saved!' : 'Save Schedule'}
            </button>
          </section>
        )}

        {/* Team Page Tab */}
        {tab === 'team' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Officer Cards</h2>
            <div className="space-y-4 mb-4">
              {officers.map(o => (
                <div key={o.id} className="border border-gray-100 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 items-start">
                  <input value={o.name} onChange={e => updateOfficer(o.id, 'name', e.target.value)}
                    placeholder="Name" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <input value={o.role} onChange={e => updateOfficer(o.id, 'role', e.target.value)}
                    placeholder="Role" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <input value={o.desc} onChange={e => updateOfficer(o.id, 'desc', e.target.value)}
                    placeholder="Description" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <div className="flex gap-2 items-start">
                    <PicDropZone pic={o.pic} onPic={src => updateOfficer(o.id, 'pic', src)} />
                    <button onClick={() => deleteOfficer(o.id)} className="text-red-400 hover:text-red-600 font-bold px-2 pt-2">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mb-6">
              <button onClick={handleSaveOfficers}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                {officersSaved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-500 mb-3">Add New Officer</p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end mb-3">
                <input value={newOfficer.name} onChange={e => setNewOfficer(p => ({ ...p, name: e.target.value }))}
                  placeholder="Name *" className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${officerError && !newOfficer.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                <input value={newOfficer.role} onChange={e => setNewOfficer(p => ({ ...p, role: e.target.value }))}
                  placeholder="Role *" className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${officerError && !newOfficer.role ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                <input value={newOfficer.desc} onChange={e => setNewOfficer(p => ({ ...p, desc: e.target.value }))}
                  placeholder="Description" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <PicDropZone pic={newOfficer.pic} onPic={src => setNewOfficer(p => ({ ...p, pic: src }))} />
              </div>
              <button onClick={addOfficer}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">+ Add Officer</button>
            </div>
          </section>
        )}

        {/* Applications Tab */}
        {tab === 'applications' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-700">Applications</h2>
                <p className="text-sm text-gray-400">{applications.length} application{applications.length !== 1 ? 's' : ''} submitted</p>
              </div>
              {applications.length > 0 && (
                <button onClick={clearAllApplications}
                  className="text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-4 py-1.5 rounded-lg transition-colors">Clear All</button>
              )}
            </div>
            {applications.length === 0 ? (
              <p className="text-gray-400 italic text-sm">No applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">#</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Name</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Grade</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Submitted</th>
                      <th className="pb-3 text-gray-500 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((a, i) => (
                      <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 pr-4 text-gray-400">{i + 1}</td>
                        <td className="py-3 pr-4 font-medium text-gray-800">{a.name}</td>
                        <td className="py-3 pr-4 text-gray-600">{a.grade}</td>
                        <td className="py-3 pr-4 text-gray-400 text-xs">{a.submittedAt}</td>
                        <td className="py-3">
                          <button onClick={() => deleteApplication(a.id)}
                            className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Pre-Orders Tab */}
        {tab === 'orders' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-700">Pre-Orders</h2>
                <p className="text-sm text-gray-400">{orders.length} order{orders.length !== 1 ? 's' : ''} submitted</p>
              </div>
              {orders.length > 0 && (
                <button onClick={clearAllOrders}
                  className="text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-4 py-1.5 rounded-lg transition-colors">
                  Clear All
                </button>
              )}
            </div>
            {orders.length === 0 ? (
              <p className="text-gray-400 italic text-sm">No pre-orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">#</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Name</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Grade</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Items</th>
                      <th className="pb-3 pr-4 text-gray-500 font-semibold">Submitted</th>
                      <th className="pb-3 text-gray-500 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 pr-4 text-gray-400">{i + 1}</td>
                        <td className="py-3 pr-4 font-medium text-gray-800">{o.name}</td>
                        <td className="py-3 pr-4 text-gray-600">{o.grade}</td>
                        <td className="py-3 pr-4 text-gray-600">{o.items.join(', ')}</td>
                        <td className="py-3 pr-4 text-gray-400 text-xs">{o.submittedAt}</td>
                        <td className="py-3">
                          <button onClick={() => deleteOrder(o.id)}
                            className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  )
}
