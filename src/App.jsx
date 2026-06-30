import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import * as LucideIcons from 'lucide-react';

function App() {
  const { profile, skills, projects } = portfolioData;
  const [skillsSubTab, setSkillsSubTab] = useState('skills');

  const renderIcon = (iconName, size = 16, className = "") => {
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <LucideIcons.HelpCircle size={size} className={className} />;
    return <IconComponent size={size} className={className} />;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 antialiased font-sans pb-12 relative selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-slate-900 bg-[#090d16]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 overflow-hidden shrink-0 shadow-md ring-2 ring-indigo-500/20">
            <img src={profile.avatarUrl} alt="Mini Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-semibold tracking-wide text-slate-200 group-hover:text-white transition-colors">{profile.name}</span>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/60 shadow-inner">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="px-3.5 py-1 text-[11px] font-semibold tracking-wide rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 transition-all duration-200"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-10 relative z-10">

        <section id="home" className="scroll-mt-20 bg-slate-900/10 rounded-2xl border border-slate-900 p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

            <div className="relative shrink-0 flex flex-col items-center group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-25 blur-sm"></div>
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-slate-950 rounded-full shadow-xl overflow-hidden border border-slate-800 ring-4 ring-slate-900">
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-3.5 text-center lg:text-left flex-1">
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">{profile.name}</h1>
                <p className="text-xs font-bold tracking-wide text-indigo-400 bg-indigo-950/40 border border-indigo-900/20 px-2.5 py-0.5 rounded-md inline-block">{profile.title}</p>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl text-justify lg:text-left font-normal">{profile.bio}</p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <a href={profile.linkedinUrl || "https://linkedin.com"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-blue-600/10 border border-blue-500/20">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold tracking-wide transition-all">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[310px] bg-[#070b14] border border-slate-800/80 rounded-xl p-4 shadow-xl shrink-0 border-t-2 border-t-indigo-500 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {renderIcon("Terminal", 13)}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-200 tracking-wide uppercase">Core Terminal</h4>
                    <p className="text-[8px] text-slate-500 font-mono tracking-wider">node_subsystem.v2</p>
                  </div>
                </div>
                <span className="text-[8px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-900/30 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
                </span>
              </div>

              <div className="space-y-2 pt-3">
                {[
                  { label: "EXPERIENCE MAP", val: profile.metrics.experience, icon: "Clock", color: "text-amber-400" },
                  { label: "VERSION INTEGRITY", val: profile.metrics.commits, icon: "GitBranch", color: "text-indigo-400" },
                  { label: "ARCHITECTURE TYPE", val: "MERN & Full-Stack", icon: "Cpu", color: "text-purple-400" },
                  { label: "STORAGE REPOSITORY", val: profile.metrics.databases, icon: "Database", color: "text-emerald-400" }
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-900/60 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className={`${m.color} opacity-80`}>{renderIcon(m.icon, 12)}</span>
                      <span className="font-mono font-bold text-slate-500 tracking-wider uppercase text-[8px]">{m.label}</span>
                    </div>
                    <span className="font-bold text-slate-200 font-mono text-right">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-slate-900/10 rounded-2xl border border-slate-900 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            {renderIcon("User", 15, "text-indigo-400")} Profile & Vision
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify font-normal">
                I am an ambitious Bachelor of Computer Applications (BCA) student based in Nepal, crafting secure and highly usable application frameworks. I bridge modern client experiences with secure entity-relationship data backends to keep software interfaces optimized and fully structured.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-indigo-950 space-y-1 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-indigo-500">
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block">Academic Framework</span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  Deeply engaged in <span className="text-indigo-400 font-semibold">Full-Stack System Design</span>, Web Compilers, and <span className="text-purple-400 font-semibold">Relational Database Integration</span>.
                </p>
              </div>
            </div>

            <div className="bg-[#070b14] border border-slate-800/80 p-4 rounded-xl space-y-2.5 text-[11px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-1">Infrastructure Metadata</span>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span className="text-slate-500">Location:</span><span className="text-slate-300 font-medium">{profile.location}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Role Track:</span><span className="text-slate-300 font-medium">Full-Stack Architecture</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Host Environment:</span><span className="text-indigo-400 font-medium font-mono">Windows OS</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-20 bg-slate-900/10 rounded-2xl border border-slate-900 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex border-b border-slate-800 bg-slate-950/40 rounded-xl p-1 max-w-xs">
            <button onClick={() => setSkillsSubTab('skills')} className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${skillsSubTab === 'skills' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>
              {renderIcon("Cpu", 12)} Tech Stack
            </button>
            <button onClick={() => setSkillsSubTab('leadership')} className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${skillsSubTab === 'leadership' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>
              {renderIcon("Award", 12)} Leadership
            </button>
          </div>

          <div>
            {skillsSubTab === 'skills' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 bg-slate-950/50 p-4 border border-slate-800/60 rounded-xl">
                  <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
                    {renderIcon("Code2", 12, "text-indigo-400")} Core Languages
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.languages.map(s => <span key={s} className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 text-[11px] font-medium rounded-md">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-2 bg-slate-950/50 p-4 border border-slate-800/60 rounded-xl">
                  <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
                    {renderIcon("Layers", 12, "text-purple-400")} Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.frameworks.map(s => <span key={s} className="bg-indigo-950/30 border border-indigo-900/40 text-indigo-300 px-2 py-1 text-[11px] font-medium rounded-md">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-2 bg-slate-950/50 p-4 border border-slate-800/60 rounded-xl">
                  <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
                    {renderIcon("Shield", 12, "text-pink-400")} Operations & Tools
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.tools.map(s => <span key={s} className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 text-[11px] font-medium rounded-md">{s}</span>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 max-w-xl">
                <div className="p-2 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shrink-0 shadow">
                  {renderIcon("Users", 15)}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase text-indigo-400 tracking-wider">Operational Integrity</span>
                  <h4 className="text-sm font-bold text-white tracking-tight">{profile.leadership}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-0.5 text-justify font-normal">
                    Orchestrated resource management pipelines, handled localized technology models, and streamlined presentation systems for academic exhibitions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="scroll-mt-20 space-y-4">
          <div className="flex justify-between items-end border-b border-slate-800 pb-2">
            <h2 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              {renderIcon("FolderOpen", 14, "text-indigo-400")} Production Systems
            </h2>
            <span className="text-[11px] text-slate-500">Total: {projects.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:border-slate-700 transition-all duration-300 relative overflow-hidden group/card">

                <div className="w-full h-36 bg-slate-950 border border-slate-800/60 rounded-xl mb-4 flex flex-col items-center justify-center text-slate-600 relative overflow-hidden shadow-inner">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover/card:scale-[1.01] transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.1]"></div>
                      <div className="relative z-10 flex flex-col items-center gap-1.5">
                        <div className="p-1.5 bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg shadow">
                          {renderIcon("Layout", 13)}
                        </div>
                        <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">{proj.id}.mockup</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-semibold tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-900/50 px-2 py-0.5 uppercase rounded-md inline-block">
                    {proj.category}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">{proj.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify font-normal">{proj.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    {proj.tech.map(t => <span key={t} className="text-[9px] font-medium text-slate-400 bg-slate-950 border border-slate-800/60 px-2 py-0.5 rounded-md">{t}</span>)}
                  </div>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-slate-950 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 text-slate-300 hover:text-white rounded-xl text-xs font-medium tracking-wide transition-all border border-slate-800 hover:border-transparent">
                    {renderIcon("Github", 13)} Source Code {renderIcon("ArrowUpRight", 11, "opacity-70")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-gradient-to-r from-slate-900 via-[#121929] to-slate-900 rounded-2xl border border-slate-800/80 p-6 sm:p-8 shadow-xl">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Connect with Endpoints</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">Direct structural pipeline open for continuous communication.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col items-center text-center space-y-1">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">{renderIcon("MapPin", 16)}</div>
                <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Node Zone</span>
                <p className="text-xs font-medium text-slate-200">{profile.location}</p>
              </div>

              <a href="mailto:samikshyabhandari522@gmail.com" className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col items-center text-center space-y-1 group hover:border-purple-500/40 transition-colors">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:scale-105 transition-transform">{renderIcon("Mail", 16)}</div>
                <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Mail Endpoint</span>
                <p className="text-[11px] font-medium text-slate-200 break-all">samikshyabhandari522@gmail.com</p>
              </a>

              <a href="tel:9742869769" className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col items-center text-center space-y-1 group hover:border-emerald-500/40 transition-colors">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-105 transition-transform">{renderIcon("Phone", 16)}</div>
                <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Direct Call</span>
                <p className="text-xs font-medium text-slate-200">9742869769</p>
              </a>
            </div>
          </div>
        </section>

        <footer className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-500">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => scrollToSection('home')} className="hover:text-slate-300">Home</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-slate-300">Projects</button>
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;