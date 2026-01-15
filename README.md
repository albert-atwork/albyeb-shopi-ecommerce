# Albyeb Shopi E-Commerce Frontend

A modern, responsive e-commerce application built with React and TypeScript. Features product browsing, cart/wishlist management, user authentication, profile settings, and a simulated checkout process. Designed as a portfolio project to demonstrate frontend skills.

## Features
- Homepage with dynamic gallery and hero section
- Shop page with search, product modals, and add to cart/wishlist
- Cart and Wishlist with live updates, quantity controls, and badges
- User auth (login/register) with protected routes and redirects
- Profile with tabs for account, orders, payments (interactive add/remove), etc.
- Checkout with multi-payment options (Visa, Mastercard, MTN MoMo, Bank, PayPal)

## Tech Stack
- React 18 + TypeScript
- Vite for fast development/build
- Zustand for state management (with localStorage persistence)
- React Router for navigation
- Lucide Icons for UI elements
- Sonner for notifications/toasts
- React Hook Form + Zod for form validation

## Installation
To run locally:
1. Clone the repo: `git clone https://github.com/yourusername/albyeb-shopi-ecommerce.git`
2. Navigate to folder: `cd albyeb-shopi-ecommerce`
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Open http://localhost:5173 in browser

## Usage
- Browse home/shop without login
- Login/register to access protected features (shop, cart, wishlist, checkout)
- Add products to cart, manage quantity, proceed to simulated checkout

## Notes
- Payments are simulated (no real integration) – for demo only.
- Persistent sessions via localStorage.
- Responsive design for mobile/desktop.

Built by Albert – CS Graduate Portfolio Project (2025). MIT License.
