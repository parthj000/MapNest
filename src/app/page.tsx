import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import TypingHero from "@/components/TypingHero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center px-6 py-6">
      {/* Top Navigation */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-2 mb-12">
        <h1 className="text-2xl font-bold">MapNest</h1>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/parthj000" target="_blank">
            <FaGithub size={24} className="text-[var(--button-bg)] hover:opacity-70" />
          </Link>
          <Link href="/signup">
            <Button variant="ghost" className="text-[var(--button-bg)] hover:bg-gray-100">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl w-full text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
          Visualize Your Ideas with <span className="text-[var(--button-bg)]">MapNest</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Turn complex thoughts into clear, connected mind maps. Whether you're studying,
          brainstorming, or planning — MapNest helps you think better.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <Button className="bg-[var(--button-bg)] text-white hover:opacity-90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl w-full">
        <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-[var(--button-bg)] mb-2">Study Smarter</h2>
          <p className="text-gray-600">Organize topics, take visual notes, and recall information faster.</p>
        </div>
        <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-[var(--button-bg)] mb-2">Brainstorm Freely</h2>
          <p className="text-gray-600">Quickly capture and connect ideas without limits or clutter.</p>
        </div>
        <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-[var(--button-bg)] mb-2">Plan Visually</h2>
          <p className="text-gray-600">Map out your goals, tasks, and workflows with a flexible interface.</p>
        </div>
      </section>
    </main>
  );
}
