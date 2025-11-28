
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, BookOpen, GraduationCap, Award, Clapperboard, Search, Mail, User, Briefcase, Globe } from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

const Lecturers: React.FC = () => {
  const { lecturers } = useAcademic();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic
  const filteredLecturers = lecturers.filter(lecturer => {
    const term = searchTerm.toLowerCase();
    return (
      lecturer.name.toLowerCase().includes(term) ||
      (lecturer.nik && lecturer.nik.toLowerCase().includes(term)) ||
      lecturer.specialization.toLowerCase().includes(term) ||
      lecturer.title.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Header with Search */}
      <div className="bg-sea-900 dark:bg-slate-900 text-white pt-16 pb-24 relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute left-0 bottom-0 w-48 h-48 bg-amber-500 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-4">
            Struktural & Dosen
          </h1>
          <p className="text-sea-100 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Profil lengkap tenaga pengajar dan pengelola jurusan Teknologi Rekayasa Pembangkit Energi.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-sea-300" size={20} />
            </div>
            <input
              type="text"
              placeholder="Cari nama, NIK, atau keahlian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-sea-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/20 transition shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        {filteredLecturers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLecturers.map((lecturer) => (
                <div key={lecturer.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col">
                    
                    {/* Full Width Image Section */}
                    <div className="relative h-72 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img 
                            src={lecturer.image_url} 
                            alt={lecturer.name} 
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-90"></div>
                        
                        {/* Title Badge Floating */}
                        <div className="absolute top-4 right-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wide shadow-sm">
                                {lecturer.title}
                            </span>
                        </div>

                        {/* Name Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <h3 className="text-2xl font-bold text-white leading-tight mb-2 text-shadow-sm">
                                {lecturer.name}
                            </h3>
                            {lecturer.nik && (
                                <div className="flex items-center text-slate-300 text-xs font-mono">
                                    <span className="opacity-70 mr-2">NIK/NIDN</span>
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white">{lecturer.nik}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                        
                        {/* Specialization Section */}
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <Briefcase size={16} className="text-amber-500 mr-2" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bidang Spesialis</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {lecturer.specialization.split(',').map((spec, idx) => (
                                    <span key={idx} className="px-2.5 py-1 rounded-md bg-sea-50 dark:bg-slate-800 text-sea-700 dark:text-sea-300 text-xs font-semibold border border-sea-100 dark:border-slate-700">
                                        {spec.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Education History */}
                        {lecturer.education_history && lecturer.education_history.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <GraduationCap size={16} className="text-sea-600 mr-2" />
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Riwayat Pendidikan</span>
                                </div>
                                <div className="space-y-3 relative before:absolute before:left-[5px] before:top-1 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-slate-700">
                                    {lecturer.education_history.map((edu, idx) => (
                                        <div key={idx} className="relative pl-4 flex flex-col">
                                            {/* Dot indicator */}
                                            <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-sea-400 dark:border-sea-500 z-10"></div>
                                            <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                                                {edu}
                                            </span>
                                            {/* Optional: Parsing logic could be added here if formatted string provided */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div className="mt-auto mb-6 space-y-2">
                            <a 
                                href={`mailto:${lecturer.email}`}
                                className="flex items-center w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-sea-300 transition group/email"
                            >
                                <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-400 group-hover/email:text-sea-500 transition-colors mr-3 shadow-sm">
                                    <Mail size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-400">Email Utama</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate group-hover/email:text-sea-600 transition-colors">
                                        {lecturer.email}
                                    </p>
                                </div>
                            </a>
                            
                            {lecturer.email_secondary && (
                                <a 
                                    href={`mailto:${lecturer.email_secondary}`}
                                    className="flex items-center w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-sea-300 transition group/email-sec"
                                >
                                    <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-400 group-hover/email-sec:text-amber-500 transition-colors mr-3 shadow-sm">
                                        <Mail size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400">Email Alternatif</p>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate group-hover/email-sec:text-amber-600 transition-colors">
                                            {lecturer.email_secondary}
                                        </p>
                                    </div>
                                </a>
                            )}
                        </div>

                        {/* Social & Academic Links (Monochrome Style) */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tautan Profil</span>
                                <div className="flex gap-2">
                                     {/* Academic Links */}
                                    {lecturer.social_links?.sinta && (
                                        <a href={lecturer.social_links.sinta} target="_blank" rel="noreferrer" title="SINTA" 
                                           className="text-slate-400 hover:text-yellow-600 border border-slate-200 dark:border-slate-700 hover:border-yellow-400 bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <Award size={16} />
                                        </a>
                                    )}
                                    {lecturer.social_links?.scopus && (
                                        <a href={lecturer.social_links.scopus} target="_blank" rel="noreferrer" title="Scopus" 
                                           className="text-slate-400 hover:text-orange-600 border border-slate-200 dark:border-slate-700 hover:border-orange-400 bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <BookOpen size={16} />
                                        </a>
                                    )}
                                    {lecturer.social_links?.google_scholar && (
                                        <a href={lecturer.social_links.google_scholar} target="_blank" rel="noreferrer" title="Google Scholar" 
                                           className="text-slate-400 hover:text-blue-600 border border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <GraduationCap size={16} />
                                        </a>
                                    )}
                                    
                                    {/* Social Links */}
                                    {lecturer.social_links?.linkedin && (
                                        <a href={lecturer.social_links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" 
                                           className="text-slate-400 hover:text-[#0077b5] border border-slate-200 dark:border-slate-700 hover:border-[#0077b5] bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <Linkedin size={16} />
                                        </a>
                                    )}
                                    {lecturer.social_links?.instagram && (
                                        <a href={lecturer.social_links.instagram} target="_blank" rel="noreferrer" title="Instagram" 
                                           className="text-slate-400 hover:text-[#E4405F] border border-slate-200 dark:border-slate-700 hover:border-[#E4405F] bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <Instagram size={16} />
                                        </a>
                                    )}
                                     {lecturer.social_links?.twitter && (
                                        <a href={lecturer.social_links.twitter} target="_blank" rel="noreferrer" title="Twitter" 
                                           className="text-slate-400 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-400 bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <Twitter size={16} />
                                        </a>
                                    )}
                                     {lecturer.social_links?.tiktok && (
                                        <a href={lecturer.social_links.tiktok} target="_blank" rel="noreferrer" title="TikTok" 
                                           className="text-slate-400 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-400 bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <Clapperboard size={16} />
                                        </a>
                                    )}
                                    
                                    {/* Others */}
                                    {lecturer.social_links?.others?.map((link, i) => (
                                         <a key={i} href={link.url} target="_blank" rel="noreferrer" title={link.label} 
                                           className="text-slate-400 hover:text-sea-600 border border-slate-200 dark:border-slate-700 hover:border-sea-400 bg-transparent p-1.5 rounded-lg transition-all transform hover:-translate-y-0.5">
                                            <Globe size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
             <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                 <User size={48} className="text-slate-300 dark:text-slate-600" />
             </div>
             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Dosen Tidak Ditemukan</h3>
             <p className="text-slate-500 dark:text-slate-400">
                Tidak ada hasil untuk pencarian "{searchTerm}". <br/>
                Coba gunakan kata kunci nama atau bidang keahlian lain.
             </p>
             <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-2 bg-sea-600 text-white rounded-full hover:bg-sea-700 transition"
             >
                Reset Pencarian
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lecturers;
