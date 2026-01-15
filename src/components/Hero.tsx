// src/components/Hero.tsx

import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* DISCOVER + SHOP NOW – super clean & professional */}
      <div className="relative flex h-full flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-widest mb-4">
          DISCOVER
        </h1>
        <p className="text-2xl md:text-4xl font-light tracking-wide mb-12 opacity-90">
          The New Collection
        </p>

        <Link
          to="/shop"
          className="border-2 border-white px-16 py-5 text-lg font-medium tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}