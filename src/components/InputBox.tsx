import React from 'react'

export default function InputBox(props: any) {
  const { prompt, setPrompt, onClickFunction } = props;
  
  return (
    <div className='flex items-center justify-center'>
    <div className="w-full sm:max-w-xl max-w-sm items-center mx-5 sm:m-auto p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 transition-all duration-300">
      <textarea
        className="w-full h-28 resize-none text-sm text-slate-700 bg-[#F7F7F7] placeholder:text-slate-400 border border-slate-300 rounded-lg px-4 py-3 shadow focus:outline-none focus:border-[var(--button-bg)] focus:ring-2 focus:ring-[var(--button-bg)] transition duration-300"
        placeholder="Start mapping your ideas here..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onClickFunction()}
          className="bg-[var(--button-bg)] text-white px-4 py-2 text-sm rounded-md font-semibold shadow-md hover:cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
        >
          🧠 Map
        </button>
      </div>
    </div>
    </div>
  );
}
