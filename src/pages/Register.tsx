// src/pages/Register.tsx   ← UPDATED – REDIRECT TO INTENDED PAGE AFTER REGISTER

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../stores/useAuthStore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

const schema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const registerUser = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Get intended destination

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await registerUser(data.name, data.email, data.password);
    navigate(from, { replace: true }); // Redirect to intended page after register
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* SAME BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img src="/logreg-bg.jpg" alt="albyeb" className="absolute left-0 top-0 w-1/2 h-full object-cover hidden lg:block" />
        <img src="/logreg-right.jpg" alt="albyeb" className="absolute right-0 top-0 w-1/2 h-full object-cover hidden lg:block" />
        <div className="absolute inset-0 bg-black/60 lg:bg-black/50" />
      </div>
      <div className="lg:hidden fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* REGISTER FORM */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/97 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/40">
            <div className="text-center mb-10">
              <Link to="/" className="text-5xl font-thin tracking-widest text-gray-900">
                albyeb.shopi
              </Link>
              <h2 className="text-3xl font-light text-gray-800 mt-6">Join the Family</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <input {...register('name')} type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-amber-600 focus:outline-none" />
              {errors.name && <p className="text-red-600 text-sm ml-2">{errors.name.message}</p>}

              <input {...register('email')} type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-amber-600 focus:outline-none" />
              {errors.email && <p className="text-red-600 text-sm ml-2">{errors.email.message}</p>}

              <input {...register('password')} type="password" placeholder="Create Password" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-amber-600 focus:outline-none" />
              {errors.password && <p className="text-red-600 text-sm ml-2">{errors.password.message}</p>}

              <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-amber-600 focus:outline-none" />
              {errors.confirmPassword && <p className="text-red-600 text-sm ml-2">{errors.confirmPassword.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-rose-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-60"
              >
                {isSubmitting ? 'Creating Account...' : 'Join albyeb.shopi'}
              </button>
            </form>

            <p className="text-center mt-10 text-gray-700">
              Already with us? <Link to="/login" className="font-bold text-amber-600 hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}