import React from "react";
import { useResumeStore, ResumeData } from "@/hooks/use-resume-store";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

const getColorHex = (color: string) => {
  switch (color) {
    case "slate":
      return "#1e293b";
    case "blue":
      return "#2563eb";
    case "emerald":
      return "#059669";
    case "violet":
      return "#7c3aed";
    case "rose":
      return "#e11d48";
    case "amber":
      return "#d97706";
    case "cyan":
      return "#0891b2";
    case "indigo":
      return "#4f46e5";
    case "orange":
      return "#ea580c";
    case "teal":
      return "#0d9488";
    default:
      return "#1e293b";
  }
};

const getThemeFont = (theme: string) => {
  switch (theme) {
    case "clean":
      return "font-inter";
    case "modern":
      return "font-outfit";
    case "creative":
      return "font-playfair";
    case "it":
      return "font-jetbrains";
    case "academic":
      return "font-garamond";
    case "minimalist":
      return "font-montserrat";
    case "editorial":
      return "font-lora";
    case "startup":
      return "font-space";
    case "industrial":
      return "font-syne";
    case "luxury":
      return "font-cormorant";
    default:
      return "font-inter";
  }
};

// --- TEMPLATE COMPONENTS ---

const EditorialTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="flex flex-col h-full bg-[#fdfcfb] text-slate-900 p-12 relative overflow-hidden">
    {/* Decorative large letter in background */}
    <div
      className="absolute -top-10 -right-10 text-[300px] font-black opacity-[0.03] select-none pointer-events-none"
      style={{ color: accentColor }}
    >
      {data.personal.fullName?.[0]}
    </div>

    <header className="mb-12 border-b-4 border-slate-900 pb-8 flex justify-between items-end">
      <div className="max-w-[60%]">
        <h1 className="text-5xl font-black mb-4 tracking-tighter leading-tight drop-shadow-sm">
          {data.personal.fullName}
        </h1>
        <p className="text-xl font-bold italic text-slate-500">
          {data.personal.jobTitle}
        </p>
      </div>
      <div className="text-right text-xs font-bold space-y-1">
        {data.personal.email && <p className="mb-1">{data.personal.email}</p>}
        {data.personal.location && <p>{data.personal.location}</p>}
        {data.personal.phone && <p>{data.personal.phone}</p>}
      </div>
    </header>

    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-8 space-y-10">
        <section>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span
              className="w-8 h-1"
              style={{ backgroundColor: accentColor }}
            ></span>{" "}
            Narrative
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            {data.personal.summary}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
            <span
              className="w-8 h-1"
              style={{ backgroundColor: accentColor }}
            ></span>{" "}
            Career History
          </h2>
          <div className="space-y-10">
            {data.experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {exp.title}
                  </h3>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p
                  className="text-sm font-bold italic mb-4"
                  style={{ color: accentColor }}
                >
                  {exp.company}, {exp.location}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="col-span-4 space-y-10 border-l border-slate-200 pl-10">
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest mb-6 opacity-30">
            Education
          </h2>
          <div className="space-y-6 text-sm">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="font-bold text-slate-900 mb-1">{edu.degree}</p>
                <p className="text-xs font-medium text-slate-500 mb-1">
                  {edu.school}
                </p>
                <p className="text-[10px] font-black opacity-50">
                  {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-widest mb-6 opacity-30">
            Expertise
          </h2>
          <div className="flex flex-col gap-3">
            {data.skills.split(",").map((skill, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-xs font-bold text-slate-700"
              >
                <span>{skill.trim()}</span>
                <div
                  className="w-2 h-2 rotate-45"
                  style={{ backgroundColor: accentColor }}
                ></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const StartupTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="h-full bg-white text-slate-900 p-10 flex flex-col gap-8 rounded-lg">
    {/* Dynamic Header with Neobrutalist border */}
    <header
      className="p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_0px_#000] flex flex-col gap-4 relative overflow-hidden"
      style={{ backgroundColor: `${accentColor}10` }}
    >
      <div className="flex justify-between items-start z-10">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2 italic transform -skew-x-6">
            {data.personal.fullName}
          </h1>
          <div className="px-3 py-1 bg-slate-900 text-white text-xs font-black inline-block uppercase tracking-widest">
            {data.personal.jobTitle}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-right">
          {data.personal.email && (
            <div className="text-[10px] font-black px-2 py-1 border-2 border-slate-900 bg-white inline-block">
              {data.personal.email}
            </div>
          )}
          {data.personal.location && (
            <div className="text-[10px] font-black px-2 py-1 border-2 border-slate-900 bg-white inline-block">
              {data.personal.location}
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20"
        style={{ backgroundColor: accentColor }}
      ></div>
    </header>

    <div className="grid grid-cols-2 gap-8 flex-1">
      {/* Bio Section */}
      <section className="col-span-2 p-6 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#000]">
        <h2 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
          <span
            className="w-3 h-3 border-2 border-slate-900"
            style={{ backgroundColor: accentColor }}
          ></span>{" "}
          Summary
        </h2>
        <p className="text-sm font-bold text-slate-600 leading-relaxed">
          {data.personal.summary}
        </p>
      </section>

      {/* Experience Section */}
      <section className="col-span-1 p-6 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#000]">
        <h2 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
          <span
            className="w-3 h-3 border-2 border-slate-900"
            style={{ backgroundColor: accentColor }}
          ></span>{" "}
          Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="group break-inside-avoid">
              <div className="text-xs font-black text-slate-900 mb-1">
                {exp.title}
              </div>
              <div className="text-[10px] font-bold text-slate-400 mb-2">
                {exp.company} | {exp.startDate} — {exp.endDate}
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Education */}
      <div className="col-span-1 flex flex-col gap-6">
        <section className="p-6 border-2 border-slate-900 bg-slate-50 shadow-[4px_4px_0px_0px_#000]">
          <h2 className="text-sm font-black uppercase mb-4">Stack.exe</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 border border-slate-300 bg-white text-[10px] font-black uppercase hover:border-slate-900 transform transition-transform hover:-translate-y-1"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>

        <section className="p-6 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#000]">
          <h2 className="text-sm font-black uppercase mb-4">Academy</h2>
          <div className="space-y-4 text-xs">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="font-black text-slate-900">{edu.degree}</p>
                <p className="text-[10px] font-bold text-slate-400">
                  {edu.school}, {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const IndustrialTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="h-full bg-slate-50 text-slate-800 p-12 flex flex-col gap-10 font-syne">
    {/* Blueprint Header */}
    <header
      className="grid grid-cols-12 gap-8 border-l-[12px] pl-8"
      style={{ borderColor: accentColor }}
    >
      <div className="col-span-12">
        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4">
          {data.personal.fullName}
        </h1>
        <div className="flex items-center gap-10">
          <p className="text-2xl font-bold uppercase tracking-widest text-slate-300">
            {data.personal.jobTitle}
          </p>
          <div className="flex-1 h-[2px] bg-slate-200"></div>
        </div>
      </div>
    </header>

    <div className="grid grid-cols-12 gap-12">
      {/* Main Column */}
      <div className="col-span-7 space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-black uppercase opacity-20 tracking-[0.5em]">
              01
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Mission_statement
            </h2>
          </div>
          <p className="text-sm font-bold leading-relaxed text-slate-600 border-l-2 border-slate-200 pl-6">
            {data.personal.summary}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black uppercase opacity-20 tracking-[0.5em]">
              02
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Operational_history
            </h2>
          </div>
          <div className="space-y-12">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative break-inside-avoid">
                <div className="flex flex-col gap-1 mb-4">
                  <h3 className="text-lg font-black uppercase">{exp.title}</h3>
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                    <span style={{ color: accentColor }}>{exp.company}</span>
                    <span className="opacity-30">
                      {exp.startDate} &gt;&gt; {exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-bold leading-relaxed text-slate-500 pl-6 border-l border-slate-200">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Technical Sidebar */}
      <div className="col-span-5 space-y-12">
        <section className="bg-slate-900 text-white p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-4">
            Contact_coordinates
          </h2>
          <div className="space-y-4 text-[10px] font-bold tracking-widest">
            {data.personal.email && (
              <p className="opacity-60 hover:opacity-100 transition-opacity">
                EMAIL: {data.personal.email}
              </p>
            )}
            {data.personal.phone && (
              <p className="opacity-60 hover:opacity-100 transition-opacity">
                TEL: {data.personal.phone}
              </p>
            )}
            {data.personal.location && (
              <p className="opacity-60 hover:opacity-100 transition-opacity">
                LOC: {data.personal.location}
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-slate-300">
            Technical_toolkit
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.split(",").map((skill, i) => (
              <div
                key={i}
                className="text-[11px] font-black uppercase border-b border-slate-200 pb-2"
              >
                {skill.trim()}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-slate-300">
            Credentials
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="space-y-1 break-inside-avoid">
                <p className="text-sm font-black uppercase leading-tight">
                  {edu.degree}
                </p>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
                  {edu.school} {"//"} {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const LuxuryTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="h-full bg-slate-50 text-slate-900 border-[16px] border-white p-12 flex flex-col font-cormorant">
    <header className="mb-16 text-center border-b-[0.5px] border-slate-200 pb-12">
      <h1 className="text-5xl font-light uppercase tracking-[0.3em] mb-4 text-slate-900">
        {data.personal.fullName?.[0]} {data.personal.fullName?.substring(1)}
      </h1>
      <div className="w-12 h-[0.5px] bg-slate-300 mx-auto mb-6"></div>
      <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 mb-8">
        {data.personal.jobTitle}
      </p>

      <div className="flex justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
        {data.personal.email && (
          <span className="hover:opacity-100 cursor-default transition-opacity">
            {data.personal.email}
          </span>
        )}
        {data.personal.location && (
          <span className="hover:opacity-100 cursor-default transition-opacity">
            {data.personal.location}
          </span>
        )}
        {data.personal.website && (
          <span className="hover:opacity-100 cursor-default transition-opacity font-medium tracking-[0.5em]">
            {data.personal.website}
          </span>
        )}
      </div>
    </header>

    <main className="grid grid-cols-12 gap-16 flex-1 px-8">
      <div className="col-span-4 space-y-12 border-r-[0.5px] border-slate-100 pr-12">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-6 border-b border-slate-200 pb-2">
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 italic text-justify">
            {data.personal.summary}
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-6 border-b border-slate-200 pb-2">
            Competencies
          </h2>
          <div className="flex flex-col gap-4">
            {data.skills.split(",").map((skill, i) => (
              <div
                key={i}
                className="text-xs font-medium tracking-[0.2em] italic text-slate-600 flex items-center justify-between"
              >
                <span>{skill.trim()}</span>
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-6 border-b border-slate-200 pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider">
                  {edu.degree}
                </p>
                <p className="text-[10px] italic text-slate-400 tracking-widest">
                  {edu.school} / {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="col-span-8 space-y-16">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-10 text-center flex items-center gap-6">
            <div className="flex-1 h-[0.5px] bg-slate-200"></div> History{" "}
            <div className="flex-1 h-[0.5px] bg-slate-200"></div>
          </h2>
          <div className="space-y-12">
            {data.experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900">
                    {exp.title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
                  style={{ color: accentColor }}
                >
                  {exp.company} {"//"} {exp.location}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium italic text-justify whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>

    <footer className="mt-16 text-center text-[8px] font-bold uppercase tracking-[0.8em] text-slate-200">
      Professionally curated and verified
    </footer>
  </div>
);

const AcademicTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="flex flex-col h-full bg-white text-[#2d3748] p-12 leading-relaxed">
    {/* Academic Header: Focused on clarity and name */}
    <header className="mb-10 pb-6 border-b-2 border-slate-900 text-center">
      <h1 className="text-3xl font-bold mb-4 tracking-tight text-slate-900 uppercase">
        {data.personal.fullName}
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-[13px] font-medium opacity-80 italic">
        {data.personal.location && <span>{data.personal.location}</span>}
        {data.personal.email && <span>{data.personal.email}</span>}
        {data.personal.phone && <span>{data.personal.phone}</span>}
        {data.personal.website && <span>{data.personal.website}</span>}
      </div>
    </header>

    <main className="space-y-10">
      <section>
        <h2 className="text-lg font-bold border-b border-slate-200 mb-6 pb-1 text-slate-800">
          Professional Summary
        </h2>
        <p className="text-[15px] italic font-serif leading-7 text-slate-700">
          {data.personal.summary}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold border-b border-slate-200 mb-6 pb-1 text-slate-800">
          Experience
        </h2>
        <div className="space-y-8">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-bold text-slate-900">
                  {exp.title}
                </h3>
                <span className="text-[13px] italic">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <div
                className="text-[14px] font-bold mb-3"
                style={{ color: accentColor }}
              >
                {exp.company}, {exp.location}
              </div>
              <div className="text-[14px] text-slate-600 leading-7 font-serif whitespace-pre-wrap">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold border-b border-slate-200 mb-6 pb-1 text-slate-800">
          Education
        </h2>
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-bold text-slate-900">
                  {edu.degree}
                </h3>
                <span className="text-[13px] italic">{edu.graduationDate}</span>
              </div>
              <p
                className="text-[14px] font-bold"
                style={{ color: accentColor }}
              >
                {edu.school}, {edu.location}
              </p>
              {edu.description && (
                <p className="text-[14px] text-slate-500 italic mt-1">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 text-slate-800">
          Core Technical Skills
        </h2>
        <p className="text-[14px] text-slate-600 leading-loose italic">
          {data.skills}
        </p>
      </section>
    </main>
  </div>
);

const MinimalistTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="flex flex-col h-full bg-white text-slate-900 overflow-hidden">
    {/* Ultra Minimalist Header: Tight grid alignment */}
    <header className="px-12 py-16 grid grid-cols-12 gap-8 border-b border-slate-100">
      <div className="col-span-8">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none mb-4">
          {data.personal.fullName}
        </h1>
        <p className="text-lg font-medium tracking-tight text-slate-400">
          {data.personal.jobTitle}
        </p>
      </div>
      <div className="col-span-4 flex flex-col justify-end text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 space-y-2">
        {data.personal.email && (
          <div className="grid grid-cols-[20px_1fr] items-start">
            <span className="text-slate-300">E</span>
            <span className="text-slate-900 break-all leading-tight">
              {data.personal.email}
            </span>
          </div>
        )}
        {data.personal.phone && (
          <div className="grid grid-cols-[20px_1fr] items-start">
            <span className="text-slate-300">T</span>
            <span className="text-slate-900 leading-tight">
              {data.personal.phone}
            </span>
          </div>
        )}
        {data.personal.location && (
          <div className="grid grid-cols-[20px_1fr] items-start">
            <span className="text-slate-300">L</span>
            <span className="text-slate-900 leading-tight">
              {data.personal.location}
            </span>
          </div>
        )}
      </div>
    </header>

    <main className="px-12 py-12 space-y-16">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          About / Summary
        </div>
        <div className="col-span-9">
          <p className="text-sm leading-relaxed text-slate-600 font-medium">
            {data.personal.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          Experience
        </div>
        <div className="col-span-9 space-y-10">
          {data.experience.map((exp) => (
            <div key={exp.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-4 gap-x-4">
                <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase leading-tight">
                  {exp.title}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.1em] shrink-0 whitespace-nowrap">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <div
                className="text-xs font-black mb-4 uppercase tracking-[0.1em]"
                style={{ color: accentColor }}
              >
                {exp.company} {"//"} {exp.location}
              </div>
              <div className="text-sm text-slate-500 leading-relaxed font-medium whitespace-pre-wrap">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          Skills / Assets
        </div>
        <div className="col-span-9">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {data.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className="text-xs font-black uppercase tracking-[0.1em] text-slate-900 flex items-center gap-2"
              >
                <span
                  className="w-1.5 h-[1.5px]"
                  style={{ backgroundColor: accentColor }}
                ></span>{" "}
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

const ClassicTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div
    className="flex flex-col h-full bg-white text-slate-900 border-t-8"
    style={{ borderColor: accentColor }}
  >
    {/* Centered Header */}
    <header className="pt-12 pb-8 px-10 text-center border-b border-slate-100">
      <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-slate-900 leading-none">
        {data.personal.fullName || "First Last"}
      </h1>
      <p
        className="text-xl font-medium tracking-wide uppercase mb-4"
        style={{ color: accentColor }}
      >
        {data.personal.jobTitle || "Professional Title"}
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
        {data.personal.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> <span>{data.personal.email}</span>
          </div>
        )}
        {data.personal.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> <span>{data.personal.phone}</span>
          </div>
        )}
        {data.personal.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />{" "}
            <span>{data.personal.location}</span>
          </div>
        )}
      </div>
    </header>

    <main className="flex-1 px-10 py-8 grid gap-8">
      {/* Summary */}
      {data.personal.summary && (
        <section>
          <h2
            className="text-base font-bold uppercase tracking-widest mb-3 border-b-2 pb-1 inline-block"
            style={{ borderBottomColor: accentColor }}
          >
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 font-medium">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      <section>
        <h2
          className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 pb-1 inline-block"
          style={{ borderBottomColor: accentColor }}
        >
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-800 text-base">
                  {exp.title}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div
                className="flex justify-between text-sm font-bold mb-2"
                style={{ color: accentColor }}
              >
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2
          className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 pb-1 inline-block"
          style={{ borderBottomColor: accentColor }}
        >
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-800 text-base">
                  {edu.degree}
                </h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {edu.graduationDate}
                </span>
              </div>
              <div className="text-sm font-bold" style={{ color: accentColor }}>
                {edu.school}, {edu.location}
              </div>
              {edu.description && (
                <p className="text-sm text-slate-500 mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills badge style */}
      {data.skills && (
        <section>
          <h2
            className="text-base font-bold uppercase tracking-widest mb-4 border-b-2 pb-1 inline-block"
            style={{ borderBottomColor: accentColor }}
          >
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-md border border-slate-100"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  </div>
);

const ModernSidebarTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="flex h-full min-h-[1056px] bg-white">
    {/* Left Sidebar */}
    <aside className="w-64 bg-slate-50 p-8 flex flex-col border-r border-slate-100">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 leading-tight mb-2">
          {data.personal.fullName}
        </h1>
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: accentColor }}
        >
          {data.personal.jobTitle}
        </p>
      </div>

      <div className="space-y-6 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Contact
        </h3>
        <div className="space-y-3">
          {data.personal.email && (
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
              <Mail
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span className="break-all">{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
              <Phone
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.location && (
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
              <MapPin
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span>{data.personal.location}</span>
            </div>
          )}
        </div>
      </div>

      {data.skills && (
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Expertise
          </h3>
          <div className="flex flex-col gap-2">
            {data.skills.split(",").map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <span className="text-xs font-bold text-slate-700">
                  {skill.trim()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-10 flex flex-col gap-10">
      {data.personal.summary && (
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 pb-2 border-b-2 border-slate-900 inline-block">
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 font-medium">
            {data.personal.summary}
          </p>
        </section>
      )}

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 pb-2 border-b-2 border-slate-900 inline-block">
          Experience
        </h2>
        <div className="space-y-8">
          {data.experience.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-4 border-l-2 border-slate-100 break-inside-avoid"
            >
              <div
                className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-white"
                style={{ backgroundColor: accentColor }}
              ></div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {exp.title}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {exp.startDate} – {exp.current ? "Pres" : exp.endDate}
                </span>
              </div>
              <p
                className="text-xs font-bold uppercase mb-3"
                style={{ color: accentColor }}
              >
                {exp.company} | {exp.location}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 pb-2 border-b-2 border-slate-900 inline-block">
          Education
        </h2>
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                {edu.degree}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-xs font-bold"
                  style={{ color: accentColor }}
                >
                  {edu.school}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {edu.graduationDate}
                </span>
              </div>
              {edu.description && (
                <p className="text-sm text-slate-500">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

const ITTechTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="h-full bg-slate-900 text-slate-300 font-mono p-8 flex flex-col gap-8">
    {/* Terminal Style Header */}
    <header className="border border-slate-700 p-6 bg-slate-950/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-emerald-500 mb-2 block text-xs">
            root@user:~$ whoami
          </span>
          <h1 className="text-3xl font-bold text-white mb-1 uppercase tracking-tighter">
            {data.personal.fullName}
          </h1>
          <p className="text-sm text-slate-500 mb-4">
            {data.personal.jobTitle}
          </p>
          <div className="flex flex-wrap gap-4 text-[10px]">
            {data.personal.email && (
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                {data.personal.phone}
              </div>
            )}
            {data.personal.location && (
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                {data.personal.location}
              </div>
            )}
          </div>
        </div>
        <div className="w-16 h-16 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-700">
          {data.personal.fullName?.[0]}
        </div>
      </div>
    </header>

    <div className="grid grid-cols-3 gap-6 flex-1">
      {/* Bio & Skills Column */}
      <div className="col-span-1 space-y-6">
        <section className="border border-slate-800 p-4">
          <h3 className="text-xs font-bold text-white uppercase mb-3 border-b border-slate-800 pb-1 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            ></span>
            System.summary
          </h3>
          <p className="text-[10px] leading-relaxed text-slate-400">
            {data.personal.summary}
          </p>
        </section>

        <section className="border border-slate-800 p-4">
          <h3 className="text-xs font-bold text-white uppercase mb-3 border-b border-slate-800 pb-1 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            ></span>
            Stack.skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>

        <section className="border border-slate-800 p-4">
          <h3 className="text-xs font-bold text-white uppercase mb-3 border-b border-slate-800 pb-1 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            ></span>
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <p className="text-[10px] font-bold text-white leading-tight">
                  {edu.degree}
                </p>
                <p className="text-[9px] text-slate-500">{edu.school}</p>
                <p
                  className="text-[8px] opacity-70"
                  style={{ color: accentColor }}
                >
                  {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Experience Column */}
      <div className="col-span-2 space-y-6">
        <section className="border border-slate-800 p-6 h-full">
          <h3 className="text-xs font-bold text-white uppercase mb-6 border-b border-slate-800 pb-1 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            ></span>
            Execution.history
          </h3>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-bold text-emerald-400">
                    /{exp.title}
                  </p>
                  <span className="text-[9px] text-slate-600">
                    {exp.startDate} - {exp.current ? "now" : exp.endDate}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-bold mb-3">
                  {exp.company}{" "}
                  <span className="opacity-40 text-[9px]">@{exp.location}</span>
                </p>
                <div className="text-[10px] leading-relaxed text-slate-500">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const CreativeBoldTemplate = ({
  data,
  accentColor,
}: {
  data: ResumeData;
  accentColor: string;
}) => (
  <div className="h-full bg-white flex flex-col font-playfair overflow-hidden">
    {/* Large Bold Header */}
    <header className="relative flex flex-col items-center justify-center overflow-hidden min-h-[340px] py-16 px-10 text-center">
      {/* Background accent splash */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full opacity-10 pointer-events-none"
        style={{ backgroundColor: accentColor, borderRadius: "0 0 0 100%" }}
      ></div>

      <h1 className="text-6xl sm:text-7xl font-black text-slate-900 mb-4 break-words leading-[0.9]">
        {data.personal.fullName?.split(" ")[0]}{" "}
        <span style={{ color: accentColor }}>
          {data.personal.fullName?.split(" ").slice(1).join(" ")}
        </span>
      </h1>
      <div
        className="w-20 h-1 mb-8"
        style={{ backgroundColor: accentColor }}
      ></div>
      <p className="text-xl font-bold italic tracking-tight text-slate-500 mb-8">
        {data.personal.jobTitle}
      </p>

      <div className="flex justify-center gap-8 text-sm font-bold text-slate-400">
        {data.personal.email && (
          <div className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Mail className="w-4 h-4" />
            {data.personal.email}
          </div>
        )}
        {data.personal.phone && (
          <div className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Phone className="w-4 h-4" />
            {data.personal.phone}
          </div>
        )}
        {data.personal.location && (
          <div className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <MapPin className="w-4 h-4" />
            {data.personal.location}
          </div>
        )}
      </div>
    </header>

    <div className="px-12 py-12 grid grid-cols-12 gap-12">
      {/* Left side: Intro & Skills */}
      <div className="col-span-4 space-y-12">
        <section>
          <h3
            className="text-lg font-black uppercase tracking-tighter mb-4 italic"
            style={{ color: accentColor }}
          >
            About Me
          </h3>
          <p className="text-base text-slate-600 leading-relaxed font-serif">
            {data.personal.summary}
          </p>
        </section>

        <section>
          <h3
            className="text-lg font-black uppercase tracking-tighter mb-4 italic"
            style={{ color: accentColor }}
          >
            Skillset
          </h3>
          <div className="flex flex-col gap-4">
            {data.skills.split(",").map((skill, i) => (
              <div key={i} className="group flex items-center gap-4">
                <div
                  className="h-[2px] w-4 bg-slate-200 group-hover:w-8 group-hover:bg-accent transition-all"
                  style={
                    {
                      "--tw-bg-opacity": 1,
                      backgroundColor: accentColor,
                    } as any
                  }
                ></div>
                <span className="text-sm font-bold text-slate-800">
                  {skill.trim()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3
            className="text-lg font-black uppercase tracking-tighter mb-4 italic"
            style={{ color: accentColor }}
          >
            Education
          </h3>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-sm font-black text-slate-900">
                  {edu.degree}
                </p>
                <p className="text-xs font-bold text-slate-400 italic">
                  {edu.school}, {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right side: Experience */}
      <div className="col-span-8 space-y-12 border-l border-slate-100 pl-12">
        <section>
          <h3
            className="text-2xl font-black uppercase tracking-tighter mb-8 italic"
            style={{ color: accentColor }}
          >
            Chronology
          </h3>
          <div className="space-y-12">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative break-inside-avoid">
                <div className="absolute -left-[53px] top-2 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <div className="h-[1px] w-8 bg-slate-100"></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-x-4">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                    {exp.title}
                  </h4>
                  <span className="text-xs font-black text-slate-300 italic shrink-0 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                  {exp.company}
                </p>
                <p className="text-base text-slate-600 leading-relaxed font-serif whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

// --- MAIN WRAPPER ---

export const ResumePreview = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { data, theme, color } = useResumeStore();
  const accentColor = getColorHex(color);
  const themeFont = getThemeFont(theme);

  const renderTemplate = () => {
    switch (theme) {
      case "modern":
        return <ModernSidebarTemplate data={data} accentColor={accentColor} />;
      case "it":
        return <ITTechTemplate data={data} accentColor={accentColor} />;
      case "creative":
        return <CreativeBoldTemplate data={data} accentColor={accentColor} />;
      case "academic":
        return <AcademicTemplate data={data} accentColor={accentColor} />;
      case "minimalist":
        return <MinimalistTemplate data={data} accentColor={accentColor} />;
      case "editorial":
        return <EditorialTemplate data={data} accentColor={accentColor} />;
      case "startup":
        return <StartupTemplate data={data} accentColor={accentColor} />;
      case "industrial":
        return <IndustrialTemplate data={data} accentColor={accentColor} />;
      case "luxury":
        return <LuxuryTemplate data={data} accentColor={accentColor} />;
      case "clean":
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      ref={ref}
      id="resume-preview-document"
      className={`w-full max-w-[800px] bg-white shadow-2xl shadow-slate-400/50 rounded-sm min-h-[1056px] mx-auto ${themeFont} print:shadow-none print:m-0 print:max-w-none print:w-screen overflow-hidden text-slate-800`}
    >
      {renderTemplate()}
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
