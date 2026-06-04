import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import * as LucideIcons from 'lucide-react';

function App() {

  const { profile, skills, projects } = portfolioData;
  const [activeTab, setActiveTab] = useState('skills');

  const renderIcon = (iconName, size = 16, className = "") => {
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <LucideIcons.HelpCircle size={size} className={className} />;
    return <IconComponent size={size} className={className} />;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 antialiased font-sans pb-20 selection:bg-indigo-500/30 selection:text-white">

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* nav */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-700/60 overflow-hidden shrink-0 shadow-md transition-transform group-hover:scale-105 ring-2 ring-indigo-500/20">
            <img src={profile.avatarUrl} alt="Mini Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-200 hover:text-white transition-colors">{profile.name}</span>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button onClick={() => scrollToSection('home')} className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-all">Home</button>
          <button onClick={() => scrollToSection('about')} className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-all">About</button>
          <button onClick={() => scrollToSection('skills')} className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-all">Skills</button>
          <button onClick={() => scrollToSection('projects')} className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-all">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-all">Contact</button>
        </div>
      </nav>

      {/*main container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 space-y-16 relative z-10">

        {/*home */}
        <section id="home" className="scroll-mt-24 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 sm:p-12 backdrop-blur-md shadow-xl relative">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">

            <div className="relative shrink-0 flex flex-col items-center group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-40 blur-sm transition-opacity duration-500"></div>

              <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-slate-950 rounded-full shadow-2xl block overflow-hidden border border-slate-800 ring-4 ring-slate-900">
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div id="about" className="scroll-mt-28 space-y-4 text-center md:text-left flex-1">
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">{profile.name}</h1>
                <p className="text-lg font-semibold tracking-wide text-indigo-400">{profile.title}</p>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-400 pt-0.5">
                  {renderIcon("MapPin", 13, "text-slate-500")} {profile.location}
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl text-justify sm:text-left font-normal">{profile.bio}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-indigo-500/10">
                  {renderIcon("Linkedin", 14)} Connect on LinkedIn
                </a>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold tracking-wide transition-all">
                  {renderIcon("Github", 14)} GitHub Profile
                </a>
              </div>
            </div>

          </div>
        </section>

        {/*skills */}
        <section id="skills" className="scroll-mt-24 bg-slate-900/40 rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg">
          <div className="flex border-b border-slate-800/80 bg-slate-950/40">
            <button onClick={() => setActiveTab('skills')} className={`flex-1 sm:flex-none px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${activeTab === 'skills' ? 'border-indigo-500 text-indigo-400 bg-slate-900/50' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
              {renderIcon("Cpu", 14)} Technical Skills
            </button>
            <button onClick={() => setActiveTab('leadership')} className={`flex-1 sm:flex-none px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-2 ${activeTab === 'leadership' ? 'border-indigo-500 text-indigo-400 bg-slate-900/50' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
              {renderIcon("Award", 14)} Leadership & Roles
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 bg-slate-950/40 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Code2", 14, "text-indigo-400")} Core Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map(s => <span key={s} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/40 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Layers", 14, "text-purple-400")} Frameworks & Architecture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map(s => <span key={s} className="bg-indigo-950/40 border border-indigo-900/50 text-indigo-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/40 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Shield", 14, "text-pink-400")} Operations & Terminals
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map(s => <span key={s} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leadership' && (
              <div className="flex items-start gap-5 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 max-w-3xl">
                <div className="p-3 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shrink-0 shadow-md">
                  {renderIcon("Users", 18)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Community Leadership Role</span>
                  <h4 className="text-lg font-bold text-white tracking-tight">Treasurer - Code for Change - Koshi (2025-2026)</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 text-justify font-normal">
                    Orchestrated operational budgets, handled ledger data pipelines, and assisted in building local tech exhibition networks.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/*project */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex justify-between items-end border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              {renderIcon("FolderOpen", 16, "text-indigo-400")} Featured Projects
            </h2>
            <span className="text-xs text-slate-500">Total Builds: {projects.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                <div className="space-y-3.5">
                  <span className="text-[10px] font-semibold tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-900/50 px-2.5 py-0.5 uppercase rounded-md inline-block">
                    {proj.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-justify font-normal">{proj.description}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/60 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map(t => <span key={t} className="text-[10px] font-medium text-slate-400 bg-slate-950 border border-slate-800/60 px-2.5 py-0.5 rounded-md">{t}</span>)}
                  </div>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-950 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 text-slate-300 hover:text-white rounded-xl text-xs font-medium tracking-wide transition-all border border-slate-800 hover:border-transparent">
                    {renderIcon("Github", 14)} Source Code {renderIcon("ArrowUpRight", 13, "opacity-70")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* contact*/}
        <section id="contact" className="scroll-mt-24 bg-gradient-to-r from-slate-900 via-[#131c31] to-slate-900 rounded-3xl border border-slate-800/80 p-8 sm:p-12 shadow-xl relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">Get In Touch</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">Ping the network endpoints below for direct collaboration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">{renderIcon("MapPin", 20)}</div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Node Zone</span>
                <p className="text-sm font-medium text-slate-200">{profile.location}</p>
              </div>

              <a href="mailto:samikshyabhandari522@gmail.com" className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center text-center space-y-2 group hover:border-purple-500/40 transition-colors">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">{renderIcon("Mail", 20)}</div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Mail Endpoint</span>
                <p className="text-sm font-medium text-slate-200 break-all">samikshyabhandari522@gmail.com</p>
              </a>

              <a href="tel:9742869769" className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center text-center space-y-2 group hover:border-emerald-500/40 transition-colors">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">{renderIcon("Phone", 20)}</div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Direct Call</span>
                <p className="text-sm font-medium text-slate-200">9742869769</p>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 footer-safe-area">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}

export default App;