import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImages } from '../store'

export default function Home() {
  const [images, setImages] = useState([])
  useEffect(() => { setImages(getImages()) }, [])

  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#e8f5f3] via-[#fdf6f0] to-[#f0e8f5]">
        <span className="bg-teal-600 text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-6 uppercase">America 4 Africa</span>
        <h1 className="text-6xl sm:text-7xl font-black text-gray-900 leading-tight mb-4">
          Save a Life<br />
          <span className="text-teal-500">Today with A4A</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-lg mb-8">
          Every Friday, we sell ice cream for $2 outside the cafeteria.<br />
          All net profits go directly to <strong>United for Malaria</strong> to fight malaria in Africa.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/shop" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full transition-colors">
            Pre-Order Now →
          </Link>
          <Link to="/impact" className="border border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-6 py-3 rounded-full transition-colors">
            Our Impact
          </Link>
        </div>
      </section>

      {/* Quick stats */}
      <section className="max-w-3xl mx-auto px-6 py-12 grid grid-cols-3 gap-4 text-center">
        {[['$2', 'Per ice cream sold'], ['100%', 'Net profits donated'], ['🌍', 'Fighting malaria in Africa']].map(([val, label]) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-3xl font-black text-teal-500 mb-1">{val}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h2>
        {images.length === 0 ? (
          <p className="text-gray-400 italic">No photos yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="rounded-xl overflow-hidden shadow group relative bg-gray-200 aspect-square">
                <img src={img.src} alt={img.caption || 'Gallery'} className="w-full h-full object-cover" />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-8 px-6">
        <p className="text-teal-400 font-bold text-lg mb-1">America 4 Africa</p>
        <p className="text-gray-400 text-sm">Every Friday · 3:25 PM · Outside the Cafeteria · $2 Ice Cream for a Cause</p>
        <p className="text-gray-500 text-sm mt-1">Schoology Code: <span className="text-teal-400 font-medium">KC3-ZH7-6KP2-C4W</span></p>
        <p className="text-gray-600 text-xs mt-2">All net profits go directly to United for Malaria 🌍</p>
      </footer>
    </main>
  )
}
