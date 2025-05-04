'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function SignUp() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-screen">
      {/* Left Branding Panel */}
      <div className="hidden sm:flex flex-col justify-center items-center bg-gradient-to-br from-[#f3f3f3]  to-[#b7b8c4] p-10 text-white">
        <h1 className="text-4xl font-bold text-[#433b3b] mb-4">Welcome to MapNest</h1>
        <p className="text-lg max-w-md text-center font-semibold">
          Visualize your thoughts. Collaborate. Share knowledge through intuitive mind maps.
        </p>
      </div>

      {/* Right Auth Panel */}
      <div className="flex justify-center items-center bg-[#fdf4f5] p-6">
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
