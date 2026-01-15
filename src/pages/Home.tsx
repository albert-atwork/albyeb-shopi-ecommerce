// src/pages/Home.tsx   ← FIXED – NAVBAR WITH LIVE CART & WISHLIST BADGES

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const images = [
  { src: '/img1.jpg',  text: 'Summer Breeze', size: 'big' },
  { src: '/img2.jpg',  text: 'Golden Hour',     size: 'small' },
  { src: '/img3.jpg',  text: 'Midnight Silk',  size: 'small' },
  { src: '/img4.jpg',  text: 'Desert Rose',     size: 'big' },
  { src: '/img5.jpg',  text: 'Ocean Whisper',  size: 'small' },
  { src: '/img6.jpg',  text: 'Velvet Dreams',  size: 'big' },
  { src: '/img7.jpg',  text: 'Sunset Glow',     size: 'small' },
  { src: '/img8.jpg',  text: 'Pure Elegance',   size: 'small' },
  { src: '/img9.jpg',  text: 'City Lights',     size: 'big' },
  { src: '/img10.jpg', text: 'Forever Chic',    size: 'small' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar with live cart & wishlist badges */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Colorful Mixed Gallery */}
      <section className="py-20 bg-gradient-to-br from-rose-50/70 via-amber-50/50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[380px]">
            {images.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer ${
                  item.size === 'big' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.text}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl md:text-3xl font-light tracking-wider drop-shadow-lg">
                    {item.text}
                  </p>
                  <div className="h-0.5 w-16 mt-2 bg-gradient-to-r from-pink-400 to-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}