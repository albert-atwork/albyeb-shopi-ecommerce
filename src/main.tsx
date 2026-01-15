// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // If you have global styles
import { Toaster } from 'sonner'; // Global toast notifications

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
        },
      }}
    />
  </React.StrictMode>
);