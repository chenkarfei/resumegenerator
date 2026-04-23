import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Palette, Layout as LayoutIcon } from 'lucide-react';
import { useResumeStore, ThemeType, ColorTheme } from '@/hooks/use-resume-store';

const themes: { id: ThemeType; name: string; fontClassName: string; description: string }[] = [
  { id: 'clean', name: 'Classic Executive', fontClassName: 'font-inter', description: 'Traditional, balanced, single-column logic.' },
  { id: 'modern', name: 'Modern Split', fontClassName: 'font-outfit font-medium', description: 'Left sidebar orientation for quick scanning.' },
  { id: 'creative', name: 'Creative Bold', fontClassName: 'font-playfair font-serif', description: 'Artistic asymmetrical layouts with large type.' },
  { id: 'it', name: 'IT Tech', fontClassName: 'font-jetbrains font-mono text-sm', description: 'Terminal-inspired grid for tech specialists.' },
  { id: 'academic', name: 'Academic Serif', fontClassName: 'font-garamond italic', description: 'Sophisticated antique serif for formal impact.' },
  { id: 'minimalist', name: 'Swiss Minimal', fontClassName: 'font-montserrat font-black uppercase tracking-tighter', description: 'Architectural grid based on Swiss design.' },
  { id: 'editorial', name: 'Editorial Mag', fontClassName: 'font-lora italic', description: 'Newspaper-style narrative with bold drop caps.' },
  { id: 'startup', name: 'Vibrant Startup', fontClassName: 'font-space font-black transform -skew-x-6', description: 'High-energy neobrutalist tech aesthetic.' },
  { id: 'industrial', name: 'Industrial Dev', fontClassName: 'font-syne font-black uppercase', description: 'Raw, architectural layout with blueprint labels.' },
  { id: 'luxury', name: 'Luxury Lifestyle', fontClassName: 'font-cormorant font-light uppercase tracking-widest', description: 'High-end elegance with expansive white space.' },
];

const colors: { id: ColorTheme; bgClass: string }[] = [
  { id: 'indigo', bgClass: 'bg-indigo-600' },
  { id: 'blue', bgClass: 'bg-blue-600' },
  { id: 'cyan', bgClass: 'bg-cyan-600' },
  { id: 'teal', bgClass: 'bg-teal-600' },
  { id: 'emerald', bgClass: 'bg-emerald-600' },
  { id: 'amber', bgClass: 'bg-amber-600' },
  { id: 'orange', bgClass: 'bg-orange-600' },
  { id: 'rose', bgClass: 'bg-rose-600' },
  { id: 'violet', bgClass: 'bg-violet-600' },
  { id: 'slate', bgClass: 'bg-slate-800' },
];

export function ThemeSelector() {
  const { theme, setTheme, color, setColor } = useResumeStore();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setIsColorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = themes.find(t => t.id === theme) || themes[0];
  const currentColor = colors.find(c => c.id === color) || colors[0];

  return (
    <div className="bg-white/40 backdrop-blur-md border-b border-white/60 px-4 md:px-8 py-3 flex flex-wrap items-center gap-6 z-20 shadow-sm shrink-0 sticky top-0">
      {/* Theme Dropdown */}
      <div className="relative" ref={themeRef}>
        <div className="flex flex-col mb-0.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 flex items-center gap-1">
            <LayoutIcon className="w-2.5 h-2.5" /> Structure
          </span>
          <button
            onClick={() => {
              setIsThemeOpen(!isThemeOpen);
              if (isColorOpen) setIsColorOpen(false);
            }}
            className="flex items-center justify-between w-52 px-4 py-2 bg-white/80 border border-white/80 rounded-xl shadow-sm text-sm font-bold text-slate-700 hover:bg-white transition-all group"
          >
            <span className={currentTheme.fontClassName}>{currentTheme.name}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isThemeOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl p-2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid gap-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsThemeOpen(false);
                  }}
                  className={`flex flex-col p-3 rounded-xl transition-all text-left group ${
                    theme === t.id
                      ? 'bg-indigo-50 border border-indigo-100'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${t.fontClassName} ${theme === t.id ? 'text-indigo-700' : 'text-slate-800'}`}>
                      {t.name}
                    </span>
                    {theme === t.id && <Check className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium leading-tight">
                    {t.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Color Dropdown */}
      <div className="relative" ref={colorRef}>
        <div className="flex flex-col mb-0.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 flex items-center gap-1">
            <Palette className="w-2.5 h-2.5" /> Accent
          </span>
          <button
            onClick={() => {
              setIsColorOpen(!isColorOpen);
              if (isThemeOpen) setIsThemeOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2 bg-white/80 border border-white/80 rounded-xl shadow-sm text-sm font-bold text-slate-700 hover:bg-white transition-all group min-w-[140px]"
          >
            <div className={`w-4 h-4 rounded-full shadow-inner ${currentColor.bgClass}`} />
            <span className="capitalize">{color}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 ml-auto transition-transform ${isColorOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isColorOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl p-3 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-5 gap-2">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setColor(c.id);
                    setIsColorOpen(false);
                  }}
                  className={`group relative w-7 h-7 rounded-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${c.bgClass} ${
                    color === c.id ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : ''
                  }`}
                  title={c.id.charAt(0).toUpperCase() + c.id.slice(1)}
                >
                  {color === c.id && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Select Palette</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

