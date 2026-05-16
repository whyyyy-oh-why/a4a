import React from 'react'

export default function OurImpact() {
  return (
    <main className="min-h-screen bg-[#f0f7f6]">
      <section className="py-20 px-6 text-center">
        <span className="bg-teal-100 text-teal-700 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block uppercase">🌍 United for Malaria</span>
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          Every Scoop <span className="text-teal-500">Saves Lives</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Your $2 ice cream purchase directly funds United for Malaria's mission to fight and eradicate malaria across Africa.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-6 pb-12 grid grid-cols-3 gap-4 text-center">
        {[['$2', 'Per ice cream sold'], ['100%', 'Net profits donated'], ['🌍', 'Fighting malaria in Africa']].map(([val, label]) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-3xl font-black text-teal-500 mb-1">{val}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </section>

      {/* Why card */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-teal-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🦟 Why United for Malaria?</h2>
          <p className="text-teal-100 text-sm leading-relaxed mb-4">
            Malaria remains one of the most preventable yet deadly diseases in the world, claiming hundreds of thousands of lives every year — mostly children. United for Malaria funds mosquito nets, treatments, and prevention programs in the hardest-hit communities across Africa.
          </p>
          <p className="text-teal-100 text-sm leading-relaxed mb-6">
            A4A believes small actions add up. Every Friday sale is a step toward a malaria-free future.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-5 py-2.5 text-sm font-medium">
            ✅ A4A activities count toward student volunteer hours!
          </div>
        </div>
      </section>
    </main>
  )
}
