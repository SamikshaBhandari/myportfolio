import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data/portfolioData';
import * as LucideIcons from 'lucide-react';

function App() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('portfolio_profile_data');
    return savedProfile ? JSON.parse(savedProfile) : portfolioData.profile;
  });

  const { skills, projects } = portfolioData;
  const [activeTab, setActiveTab] = useState('skills');
  const [isEditing, setIsEditing] = useState(false);

  // Crop Engine States
  const [rawImage, setRawImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const previewRef = useRef(null);
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    localStorage.setItem('portfolio_profile_data', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  //Handle Image Selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImage(reader.result);
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCropSave = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Create a clean square area for target avatar profile
      canvas.width = 400;
      canvas.height = 400;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate aspect ratio rendering sizes
      const size = Math.min(img.width, img.height);
      const renderWidth = (img.width / size) * canvas.width * zoom;
      const renderHeight = (img.height / size) * canvas.height * zoom;

      // Position tracking center matrix
      const xPos = (canvas.width - renderWidth) / 2 + offset.x;
      const yPos = (canvas.height - renderHeight) / 2 + offset.y;

      ctx.drawImage(img, xPos, yPos, renderWidth, renderHeight);

      const finalBase64 = canvas.toDataURL('image/jpeg', 0.9);
      setProfile(prev => ({ ...prev, avatarUrl: finalBase64 }));
      setRawImage(null);
    };
    img.src = rawImage;
  };

  const handleAvatarDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete/reset this profile picture?")) {
      setProfile(prev => ({ ...prev, avatarUrl: portfolioData.profile.avatarUrl }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditing(false);
  };

  const handleResetAllDefaults = () => {
    if (window.confirm("Reset all profile data to original code configuration?")) {
      setProfile(portfolioData.profile);
      localStorage.removeItem('portfolio_profile_data');
      setIsEditing(false);
    }
  };

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

      {rawImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {renderIcon("Crop", 18, "text-indigo-400")} Adjust & Crop Photo
              </h3>
              <p className="text-xs text-slate-400">Drag to center the photo or use the zoom slider below.</p>
            </div>

            {/* View Box Container */}
            <div
              className="w-64 h-64 mx-auto rounded-full border-2 border-dashed border-indigo-500/50 bg-slate-950 relative overflow-hidden cursor-move select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              ref={previewRef}
            >
              <img
                src={rawImage}
                alt="Raw Preview"
                draggable="false"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                className="w-full h-full object-contain pointer-events-none origin-center"
              />
            </div>

            {/* Slider Scale Metrics */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Zoom Level</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setRawImage(null)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropSave}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-500/20"
              >
                Crop & Save Image
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/*Nav */}
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

          <div className="w-px h-5 bg-slate-800 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${isEditing ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-indigo-400 hover:bg-slate-750'}`}
          >
            {renderIcon(isEditing ? "X" : "Sliders", 12)}
            {isEditing ? "Close Panel" : "Manage Profile"}
          </button>
        </div>
      </nav>

      {/* Main layout frame*/}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 space-y-16 relative z-10">

        {/*Edit panel */}
        {isEditing && (
          <section className="bg-slate-900/90 rounded-3xl border-2 border-amber-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">{renderIcon("UserCheck", 18)}</div>
                <div>
                  <h3 className="text-base font-bold text-white">Live Profile Customizer</h3>
                  <p className="text-xs text-slate-400">Update photo with cropper engine, title, or bio text entries.</p>
                </div>
              </div>
              <button onClick={handleResetAllDefaults} className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-semibold border border-rose-500/20 transition-all">Reset System Defaults</button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/40 p-4 border border-slate-800/80 rounded-2xl mb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-700 bg-slate-900 shadow-inner">
                <img src={profile.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                  {renderIcon("Crop", 14)} Choose & Crop Photo
                  <input type="file" accept="image/*" className="hidden" onClick={(e) => { e.target.value = null }} onChange={handleAvatarChange} />
                </label>
                {profile.avatarUrl !== portfolioData.profile.avatarUrl && (
                  <button type="button" onClick={handleAvatarDelete} className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5">
                    {renderIcon("Trash2", 14)} Delete Current Photo
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Location Base</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Leadership Affiliation Role</label>
                  <input type="text" name="leadership" value={formData.leadership} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Biography / Core Executive Summary</label>
                <textarea rows="3" name="bio" value={formData.bio} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 transition-colors resize-none leading-relaxed"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-bold tracking-wide transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5">Save Profile Modifications</button>
              </div>
            </form>
          </section>
        )}

        {/*Home section */}
        <section id="home" className="scroll-mt-24 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 sm:p-12 backdrop-blur-md shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">

            <div className="relative shrink-0 flex flex-col items-center group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-40 blur-sm group-hover:opacity-70 transition-opacity duration-500"></div>

              <label className="relative w-40 h-40 sm:w-48 sm:h-48 bg-slate-950 rounded-full shadow-2xl block cursor-pointer overflow-hidden border border-slate-800 transition-all duration-500 ring-4 ring-slate-900 group-hover:ring-indigo-500/30">
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110 group-hover:brightness-40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-950/60 backdrop-blur-xs rounded-full">
                  <div className="p-2.5 bg-white/10 rounded-full border border-white/20 mb-1">{renderIcon("Crop", 20, "text-indigo-200")}</div>
                  <span className="text-[11px] font-bold tracking-wide text-white">Upload & Crop</span>
                </div>

                <input type="file" accept="image/*" className="hidden" onClick={(e) => { e.target.value = null }} onChange={handleAvatarChange} />
              </label>

              {profile.avatarUrl !== portfolioData.profile.avatarUrl && (
                <button onClick={handleAvatarDelete} className="absolute bottom-1 right-2 bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full shadow-xl transition-all hover:scale-110 border border-rose-400/20 z-20 cursor-pointer">
                  {renderIcon("Trash2", 12)}
                </button>
              )}
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

        {/*skills section*/}
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
                    {renderIcon("Layers", 14, "text-purple-400")} Frameworks & Libraries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map(s => <span key={s} className="bg-indigo-950/40 border border-indigo-900/50 text-indigo-300 px-3 py-1.5 text-xs font-medium rounded-lg">{s}</span>)}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/40 p-5 border border-slate-800/60 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-2">
                    {renderIcon("Shield", 14, "text-pink-400")} Platforms & Tools
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
                  <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Community Affiliation</span>
                  <h4 className="text-lg font-bold text-white tracking-tight">{profile.leadership}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 text-justify font-normal">
                    Orchestrated and managed operational fund balances, spearheaded regional digital tech transformation metrics, and successfully organized technical exhibitions within the Koshi Province network.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/*project section */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex justify-between items-end border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              {renderIcon("FolderOpen", 16, "text-indigo-400")} Featured Projects
            </h2>
            <span className="text-xs text-slate-500">Total Projects: {projects.length}</span>
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
                    {renderIcon("Github", 14)} View Source Code {renderIcon("ArrowUpRight", 13, "opacity-70")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*contact section */}
        <section id="contact" className="scroll-mt-24 bg-gradient-to-r from-slate-900 via-[#131c31] to-slate-900 rounded-3xl border border-slate-800/80 p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">Get In Touch</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">Let's build something amazing together!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">{renderIcon("MapPin", 20)}</div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Location</span>
                <p className="text-sm font-medium text-slate-200">{profile.location}</p>
              </div>

              <a href="mailto:samikshyabhandari522@gmail.com" className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center text-center space-y-2 group hover:border-purple-500/40 transition-colors">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">{renderIcon("Mail", 20)}</div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Email Me</span>
                <p className="text-sm font-medium text-slate-200 break-all">samikshyabhandari522@gmail.com</p>
              </a>

              <a href="tel:9742869769" className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center text-center space-y-2 group hover:border-emerald-500/40 transition-colors">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">{renderIcon("Phone", 20)}</div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Call / Message</span>
                <p className="text-sm font-medium text-slate-200">9742869769</p>
              </a>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg text-[11px] font-medium border border-slate-800 text-slate-400">
            {renderIcon("CheckCircle2", 12, "text-emerald-500")} Portfolio Cropper Engine
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;