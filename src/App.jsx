import React from 'react';
import { portfolioData } from './data/portfolioData';
import * as LucideIcons from 'lucide-react';

function App() {
  const { profile, skills, projects } = portfolioData;

  // Safe fallback renderer utility mapping block to prevent layout build breakage
  const renderIcon = (iconName, size = 16, className = "") => {
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <LucideIcons.HelpCircle size={size} className={className} />;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1c1c1a] antialiased selection:bg-[#e6dfcf]">

      {/* ARCHITECTURAL STRUCTURAL GRID OVERLAY ACCENTS */}
      <div className="fixed inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03] z-50">
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div></div>
      </div>

      {/*Reduced wrapper padding from p-16 to p-8/sm:p-12 for a compact layout */}
      <div className="max-w-6xl mx-auto p-4 sm:p-12 md:p-8 relative z-10">

        {/* TOP META DESK HEADER */}
        <div className="flex justify-between items-center pb-4 mb-8 border-b border-black/10 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            <span className="text-neutral-600 font-bold flex items-center gap-1.5">
              {renderIcon("Terminal", 12)} DEPLOYMENT_STABLE_2026
            </span>
          </div>
          <div className="flex items-center gap-1">
            {renderIcon("MapPin", 12, "text-neutral-400")}
            {profile.location}
          </div>
        </div>

        {/* PROFILE PLATFORM BRANDING PROFILE LOGS*/}
        <header className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-mono bg-neutral-900 text-white px-2.5 py-1 font-bold">
              {renderIcon("Sparkles", 10, "text-amber-400")} CORE CORE LAYER // VERIFIED
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 font-sans uppercase leading-none">
              {profile.name}
            </h1>
            <p className="text-lg font-bold tracking-tight text-neutral-600 font-mono">
              &gt; {profile.title}
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl text-justify font-sans pt-1">
              {profile.bio}
            </p>
          </div>

          {/* RIGHT AFFILIATION EXECUTIVE INFOPACK */}
          <div className="lg:col-span-1 border-t-2 lg:border-t-0 lg:border-l border-black/10 pt-4 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-1">Affiliation Title</span>
              <p className="text-xs font-bold text-neutral-800 leading-snug">{profile.leadership}</p>
            </div>

            {/* CONNECTION HUB NAVIGATION CTAs */}
            <div className="space-y-2 pt-2">
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full px-4 py-2.5 bg-white border border-neutral-900 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:bg-neutral-900 hover:text-white">
                <span className="flex items-center gap-2">
                  {renderIcon("Linkedin", 14)} Linked_In Profile
                </span>
                {renderIcon("ExternalLink", 14, "opacity-60 group-hover:opacity-100 transition-opacity")}
              </a>

              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full px-4 py-2.5 bg-neutral-100 border border-neutral-200 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:border-neutral-900 hover:bg-white">
                <span className="flex items-center gap-2">
                  {renderIcon("Github", 14)} Source Git Repos
                </span>
                {renderIcon("ExternalLink", 14, "opacity-60")}
              </a>
            </div>
          </div>
        </header>

        {/* TECHNICAL STACK SPECIFICATION SEGMENTS*/}
        <section className="mb-12">
          <div className="border-b border-black/10 pb-2 mb-6">
            <h2 className="text-xs font-mono font-black tracking-widest text-neutral-400 uppercase">01 // MATRIX_ARCHITECTURES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 border border-black/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-neutral-900 transition-colors rounded-sm">
              <span className="absolute right-3 top-3 opacity-10 group-hover:opacity-100 transition-opacity">
                {renderIcon("Code2", 16, "text-neutral-600")}
              </span>
              <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-3">LANGUAGES</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.languages.map(s => <span key={s} className="bg-neutral-50 border border-neutral-200 text-neutral-800 px-2 py-0.5 text-xs font-mono font-bold">{s}</span>)}
              </div>
            </div>

            <div className="bg-white p-5 border border-black/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-neutral-900 transition-colors rounded-sm">
              <span className="absolute right-3 top-3 opacity-10 group-hover:opacity-100 transition-opacity">
                {renderIcon("Layers", 16, "text-emerald-600")}
              </span>
              <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-3">FRAMEWORKS</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.frameworks.map(s => <span key={s} className="bg-[#eaf5ec] border border-[#cbe6d0] text-emerald-900 px-2 py-0.5 text-xs font-mono font-bold">{s}</span>)}
              </div>
            </div>

            <div className="bg-white p-5 border border-black/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-neutral-900 transition-colors rounded-sm">
              <span className="absolute right-3 top-3 opacity-10 group-hover:opacity-100 transition-opacity">
                {renderIcon("Cpu", 16, "text-blue-600")}
              </span>
              <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-3">INFRASTRUCTURE</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.tools.map(s => <span key={s} className="bg-[#eef4fa] border border-[#d2e2f3] text-blue-900 px-2 py-0.5 text-xs font-mono font-bold">{s}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* VERIFIED OBJECT DEPLOYMENTS DECK LIST*/}
        <section className="mb-12">
          <div className="border-b border-black/10 pb-2 mb-6">
            <h2 className="text-xs font-mono font-black tracking-widest text-neutral-400 uppercase">02 // VERIFIED_DEPLOYMENTS</h2>
          </div>

          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id} className="group bg-white border border-black/[0.06] p-5 md:p-6 hover:border-neutral-900 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-sm">

                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-neutral-300">0{idx + 1}</span>
                    <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight group-hover:text-black">{proj.title}</h3>
                    <span className="text-[9px] font-mono tracking-widest font-bold bg-neutral-100 text-neutral-500 border border-neutral-200 px-2 py-0.5 uppercase rounded-xs">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans text-justify sm:pl-5">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:pl-5 pt-0.5">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[9px] font-mono text-neutral-400 bg-neutral-50 px-1.5 py-0.5 border border-neutral-200/50 rounded-xs">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100 flex md:justify-end sm:pl-5 md:pl-0">
                  <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase border-b-2 border-neutral-900 pb-0.5 tracking-wider hover:opacity-70 transition-opacity whitespace-nowrap">
                    View Build {renderIcon("ExternalLink", 12)}
                  </a>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SYSTEM STATUS LABELS CONTROL TERMINATION FOOTER */}
        <footer className="pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] text-neutral-400 tracking-wider">
          <p className="flex items-center gap-1.5">
            {renderIcon("Copyright", 12)} 2026 {profile.name} // WORKSPACE MATRIX RECONFIGURED
          </p>
          <p className="text-neutral-500 font-bold">VITE CACHE RE-INDEXED + TAILWIND V4 + DYNAMIC LUCIDE MAP</p>
          <p>SUNSARI, NP</p>
        </footer>

      </div>
    </div>
  );
}

export default App;