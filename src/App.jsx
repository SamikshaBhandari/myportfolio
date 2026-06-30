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
    <div className="min-h-screen bg-[#090d16] text-slate-100 antialiased font-sans pb-20 relative selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-900 bg-[#090d16]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800 overflow-hidden shrink-0 shadow-md ring-2 ring-indigo-500/20">
            <img src={profile.avatarUrl} alt="Mini Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-200 group-hover:text-white transition-colors">{profile.name}</span>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/60 shadow-inner">
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
              className="px-4 py-1.5 text-xs font-semibold tracking-wide rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 transition-all duration-200"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 space-y-16 relative z-10">

        <section id="home" className="scroll-mt-24 bg-slate-900/20 rounded-3xl border border-slate-900 p-8 sm:p-12 backdrop-blur-md shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            <div className="relative shrink-0 flex flex-col items-center group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-50"></div>
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-slate-950 rounded-full shadow-2xl overflow-hidden border border-slate-800 ring-4 ring-slate-900">
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left flex-1">
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">{profile.name}</h1>
                <p className="text-lg font-bold tracking-wide text-indigo-400 bg-indigo-950/30 border border-indigo-900/20 px-3 py-1 rounded-lg inline-block">{profile.title}</p>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl text-justify lg:text-left font-normal">{profile.bio}</p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a href={profile.linkedinUrl || "https://linkedin.com"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-blue-600/10 border border-blue-500/20">
                  {renderIcon("Linkedin", 14)} LinkedIn
                </a>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold tracking-wide transition-all">
                  {renderIcon("Github", 14)} GitHub
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[340px] bg-[#070b14] border border-slate-800/80 rounded-2xl p-5 shadow-2xl shrink-0 border-t-2 border-t-indigo-500 relative overflow-hidden group/box">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {renderIcon("Terminal", 14)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Core Terminal</h4>
                    <p className="text-[9px] text-slate-500 font-mono tracking-wider">node_subsystem.v2</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900/30 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
                </span>
              </div>

              <div className="space-y-3 pt-4">
                {[
                  { label: "EXPERIENCE MAP", val: profile.metrics.experience, icon: "Clock", color: "text-amber-400" },
                  { label: "VERSION INTEGRITY", val: profile.metrics.commits, icon: "GitBranch", color: "text-indigo-400" },
                  { label: "ARCHITECTURE TYPE", val: "MERN & Full-Stack", icon: "Cpu", color: "text-purple-400" },
                  { label: "STORAGE REPOSITORY", val: profile.metrics.databases, icon: "Database", color: "text-emerald-400" }
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-900/60 hover:border-slate-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={`${m.color} opacity-80`}>{renderIcon(m.icon, 13)}</span>
                      <span className="text-[9px] font-mono font-bold text-slate-500 tracking-wider uppercase">{m.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-200 font-mono text-right">{m.val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 text-center">
                <span className="text-[10px] font-mono text-slate-500 block">
                  root@samiksha_dev:~# <span className="text-indigo-400 animate-pulse">█</span>
                </span>
              </div>
            </div>

          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-slate-900/20 rounded-3xl border border-slate-900 p-8 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-300 space-y-6">
          <h2 className="text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            {renderIcon("User", 18, "text-indigo-400")} Profile & Vision
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify font-normal">
                I am an ambitious Bachelor of Computer Applications (BCA) student based in Nepal, crafting secure and highly usable application frameworks. I bridge modern client experiences with secure entity-relationship data backends to keep software interfaces optimized and fully structured.
              </p>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-indigo-950 space-y-2 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-indigo-500">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Academic Framework & Engineering Tracks</span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  Deeply engaged in <span className="text-indigo-400 font-semibold">Full-Stack System Design</span>, Web Compilers, and <span className="text-purple-400 font-semibold">Relational Database Integration</span>. Building optimized production environments using modern scripting runtimes.
                </p>
              </div>
            </div>

            <div className="bg-[#070b14] border border-slate-800/80 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-1.5">Infrastructure Metadata</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-500">Location:</span><span className="text-slate-300 font-medium">{profile.location}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Role Track:</span><span className="text-slate-300 font-medium">Full-Stack Architecture</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Host Environment:</span><span className="text-indigo-400 font-medium font-mono">Windows OS</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 bg-slate-900/20 rounded-3xl border border-slate-900 p-8 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-300 space-y-6">
          <div className="flex border-b border-slate-800 bg-slate-950/40 rounded-xl p-1 max-w-sm">
            <button onClick={() => setSkillsSubTab('skills')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${skillsSubTab === 'skills' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>
              {renderIcon("Cpu", 13)} Tech Stack
            </button>
            <button onClick={() => setSkillsSubTab('leadership')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${skillsSubTab === 'leadership' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>
              {renderIcon("Award", 13)} Leadership
            </button>
          </div>

          <div>
            {skillsSubTab === 'skills' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 bg-slate-950/50 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Code2", 14, "text-indigo-400")} Core Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map(s => <span key={s} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/50 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Layers", 14, "text-purple-400")} Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map(s => <span key={s} className="bg-indigo-950/30 border border-indigo-900/40 text-indigo-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/50 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Shield", 14, "text-pink-400")} Operations & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map(s => <span key={s} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-5 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 max-w-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shrink-0 shadow-md">
                  {renderIcon("Users", 18)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Operational Integrity</span>
                  <h4 className="text-base font-bold text-white tracking-tight">{profile.leadership}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 text-justify font-normal">
                    Orchestrated resource management pipelines, handled localized technology models, and streamlined presentation systems for academic exhibitions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 space-y-6 transition-all duration-300">
          <div className="flex justify-between items-end border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              {renderIcon("FolderOpen", 16, "text-indigo-400")} Production Systems
            </h2>
            <span className="text-xs text-slate-500">Total Systems: {projects.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-slate-700 transition-all duration-300 relative overflow-hidden group/card">

                <div className="w-full h-40 sm:h-44 bg-slate-950 border border-slate-800/60 rounded-xl mb-5 flex flex-col items-center justify-center text-slate-600 relative overflow-hidden transition-all duration-300 shadow-inner">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover/card:scale-[1.01] transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.15]"></div>
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="p-2 bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg shadow">
                          {renderIcon("Layout", 15)}
                        </div>
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{proj.id}.mockup</span>
                      </div>
                    </>
                  )}
                </div>

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

        <section id="contact" className="scroll-mt-24 bg-gradient-to-r from-slate-900 via-[#121929] to-slate-900 rounded-3xl border border-slate-800/80 p-8 sm:p-12 shadow-2xl transition-all duration-300">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">Connect with Endpoints</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">Direct structural pipeline open for continuous communication or project reviews.</p>
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

        <footer className="pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
          <div className="flex gap-4 text-[11px]">
            <button onClick={() => scrollToSection('home')} className="hover:text-slate-300">Home</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-slate-300">Projects</button>
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;