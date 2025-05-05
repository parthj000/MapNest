'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import LoadingComponent from '@/components/LoadingComponent';

export default function SignUp() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-screen">
      {/* Left Branding Panel */}
      <div className="hidden sm:flex flex-col justify-center items-center bg-gradient-to-br from-[white]  to-[var(--button-bg)] p-10 text-white">
        <LoadingComponent />
        <h1 className="md:text-4xl font-extrabold text-[#433b3b] text-center text-3xl mb-4">Welcome to MapNest</h1>
        
        <p className="md:text-lg  text-md max-w-md text-center font-bold ">
          Visualize your thoughts. Collaborate. Share knowledge through intuitive mind maps.
        </p>
        
      </div>

      {/* Right Auth Panel */}
      <div className="flex justify-center items-center bg-[var(--nav-bg)] p-6 ">
        <LoginForm />
      </div>
    </div>
  );
}

const LoginForm = () => {
  const handleLogin = async (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign in to MapNest</h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleLogin('google')}
          className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-white border hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
        </button>

        <button
          onClick={() => handleLogin('github')}
          className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
        >
          <FaGithub className="text-xl" />
          <span className="text-sm font-medium">Sign in with GitHub</span>
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 mt-6">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};
