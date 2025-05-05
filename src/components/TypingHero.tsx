'use client';

import { useEffect, useState } from "react";

const phrases = [
  "Make a map for learning backend",
  "Make a map for your startup idea",
  "Make a map for exam prep",
  "Make a map for your dream trip",
  "Make a map for goals",
];

export default function TypingHero() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        const newIndex = deleting ? charIndex - 1 : charIndex + 1;
        setText(currentPhrase.slice(0, newIndex));
        setCharIndex(newIndex);
      }, deleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  const highlight = "Make a map for";
  const coloredText = text.startsWith(highlight)
    ? [highlight, text.slice(highlight.length)]
    : [text,""];

  return (
    <div className="flex-1 justify-center items-center mb-17 hidden sm:flex">
      <h1 className="font-extrabold text-4xl md:text-5xl">
        <span className="text-black">{coloredText[0]}</span>
        <span className="text-[var(--button-bg)]">{coloredText[1]}</span>
        <span className="border-r-4 border-[var(--button-bg)] animate-pulse ml-1" />
      </h1>
    </div>
  );
}
