// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Truck, Shield, CreditCard, Lock, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Trust Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-20">
          <div>
            <Truck className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <p className="font-bold text-white text-lg">Free Shipping Ghana</p>
            <p className="text-sm">Accra • Kumasi • Tamale • Takoradi • Nationwide Delivery</p>
          </div>
          <div>
            <Shield className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <p className="font-bold text-white text-lg">100% Secure</p>
            <p className="text-sm">Encrypted Checkout • Buyer Protection</p>
          </div>
          <div>
            <CreditCard className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <p className="font-bold text-white text-lg">Mobile Money & Cards</p>
            <p className="text-sm">MTN MoMo • Vodafone Cash • AirtelTigo • Visa • Mastercard</p>
          </div>
          <div>
            <Lock className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <p className="font-bold text-white text-lg">Privacy First</p>
            <p className="text-sm">Your data stays in Ghana • Never shared</p>
          </div>
        </div>

        {/* Ghana Pride & Story */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <h2 className="text-5xl font-thin tracking-widest text-white mb-10">albyeb.shopi</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>Born and raised in the heart of Ghana. We are more than a brand — we are a movement.</p>
            <p>We celebrate African beauty, confidence, and excellence. Every design is inspired by Ghanaian elegance and crafted for the modern soul who knows luxury starts at home.</p>
            <p>From Accra with love. From Ghana to the world.</p>
            <p className="text-2xl italic text-amber-400 mt-10">"Wear your roots. Own your crown. This is Ghana luxury."</p>
          </div>
        </div>

        {/* Links + Social */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm mb-20">
          <div>
            <h3 className="font-bold text-white mb-5">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/new" className="hover:text-amber-400 transition">New Arrivals</Link></li>
              <li><Link to="/women" className="hover:text-amber-400 transition">Women</Link></li>
              <li><Link to="/men" className="hover:text-amber-400 transition">Men</Link></li>
              <li><Link to="/sale" className="hover:text-amber-400 transition">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-amber-400 transition">Our Story</Link></li>
              <li><Link to="/vision" className="hover:text-amber-400 transition">Vision</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-5">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faqs" className="hover:text-amber-400 transition">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-amber-400 transition">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-amber-400 transition">Returns</Link></li>
              <li><Link to="/size" className="hover:text-amber-400 transition">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-5">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-5">Connect With Us</h3>
            <div className="flex gap-6 text-3xl mb-6">
              <a href="https://instagram.com/albyeb.shopi" target="_blank" rel="noreferrer">
                <Instagram className="hover:text-amber-400 transition" />
              </a>
              <a href="https://facebook.com/albyeb.shopi" target="_blank" rel="noreferrer">
                <Facebook className="hover:text-amber-400 transition" />
              </a>
              <a href="https://twitter.com/albyebshopi" target="_blank" rel="noreferrer">
                <Twitter className="hover:text-amber-400 transition" />
              </a>
            </div>
            <div className="text-xs space-y-3">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@albyeb.shopi</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +233 50 000 2025</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Osu • Accra • Ghana</p>
            </div>
          </div>
        </div>

        {/* Final Copyright */}
        <div className="border-t border-gray-800 pt-10 text-center">
          <p className="text-gray-300 font-medium">© 2025 albyeb.shopi • 100% Ghanaian Owned & Proudly Operated</p>
          <p className="text-sm text-gray-500 mt-4">
            From the vibrant streets of Accra to the world stage — this is Ghana luxury. Made in Ghana. Worn with pride.
          </p>
        </div>
      </div>
    </footer>
  );
}