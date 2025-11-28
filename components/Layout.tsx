
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronDown, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Navigation Data Structure
  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { 
      name: t.nav.academic, 
      path: '/academic/curriculum', // Default fallback
      type: 'dropdown',
      subItems: [
        { name: t.nav.curriculum, path: '/academic/curriculum' },
        { name: t.nav.lecturers, path: '/academic/lecturers' }
      ]
    },
    { name: t.nav.facilities, path: '/facilities' },
    { name: t.nav.news, path: '/news' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-slate-900 shadow-lg py-2' : 'bg-sea-900/90 backdrop-blur-md py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-lg transition-all duration-300 ${scrolled ? 'bg-sea-50 dark:bg-slate-800' : 'bg-white/10 backdrop-blur-md'}`}>
              <Zap className={`h-6 w-6 transition-colors ${scrolled ? 'text-sea-600 dark:text-sea-400' : 'text-amber-400'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight ${scrolled ? 'text-sea-900 dark:text-white' : 'text-white'}`}>
                RPE
              </span>
              <span className={`text-xs ${scrolled ? 'text-sea-600 dark:text-sea-300' : 'text-sea-200'}`}>
                Teknologi Rekayasa Pembangkit Energi
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => {
              if (item.type === 'dropdown') {
                const isActive = location.pathname.startsWith('/academic');
                return (
                  <div key={item.name} className="relative group">
                    <button 
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-amber-400 ${
                        isActive 
                          ? 'text-amber-500 font-bold' 
                          : scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={14} className="ml-1 mt-0.5" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                      <div className="py-1">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={`block px-4 py-2 text-sm ${
                              location.pathname === sub.path 
                                ? 'bg-sea-50 dark:bg-slate-700 text-sea-600 dark:text-sea-300 font-medium' 
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-sea-600'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-amber-400 ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? 'text-amber-500 font-bold' 
                      : scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ml-2 font-mono text-xs font-bold ${
                    scrolled 
                    ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle Language"
            >
                <Globe size={14} />
                <span>{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ml-1 ${
                    scrolled 
                    ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center space-x-2">
             {/* Language Toggle Mobile */}
             <button
                onClick={toggleLanguage}
                className={`px-2 py-1 rounded flex items-center space-x-1 font-mono text-xs font-bold ${
                    scrolled 
                    ? 'text-slate-600 dark:text-slate-300' 
                    : 'text-white'
                }`}
            >
                <Globe size={14} />
                <span>{language.toUpperCase()}</span>
            </button>

             {/* Theme Toggle Mobile */}
             <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                    scrolled 
                    ? 'text-slate-600 dark:text-slate-300' 
                    : 'text-white'
                }`}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-slate-700 dark:text-white' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
               if (item.type === 'dropdown') {
                   return (
                       <div key={item.name} className="space-y-1">
                           <div className="px-3 py-2 text-base font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800 rounded-md">
                               {item.name}
                           </div>
                           <div className="pl-6 space-y-1 border-l-2 border-slate-100 dark:border-slate-700 ml-3">
                               {item.subItems?.map(sub => (
                                   <Link
                                    key={sub.name}
                                    to={sub.path}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                                        location.pathname === sub.path
                                          ? 'text-sea-600 dark:text-sea-400'
                                          : 'text-slate-500 dark:text-slate-400 hover:text-sea-600 dark:hover:text-sea-400'
                                      }`}
                                   >
                                       {sub.name}
                                   </Link>
                               ))}
                           </div>
                       </div>
                   )
               }
               return (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                        ? 'bg-sea-50 dark:bg-slate-800 text-sea-700 dark:text-sea-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sea-600'
                    }`}
                >
                    {item.name}
                </Link>
               )
            })}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                <Link
                    to="/admin/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800"
                >
                    {t.nav.admin}
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-sea-950 dark:bg-black text-white pt-16 pb-8 border-t border-sea-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-sea-800 dark:bg-slate-800 rounded-lg">
                <Zap className="h-6 w-6 text-amber-500" />
              </div>
              <span className="font-bold text-xl">RPE Polibatam</span>
            </div>
            <p className="text-sea-200 dark:text-slate-400 text-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t.footer.quick_links}</h3>
            <ul className="space-y-2 text-sea-200 dark:text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-amber-400 transition">{t.nav.about}</Link></li>
              <li><Link to="/academic/curriculum" className="hover:text-amber-400 transition">{t.nav.curriculum}</Link></li>
              <li><Link to="/academic/lecturers" className="hover:text-amber-400 transition">{t.nav.lecturers}</Link></li>
              <li><Link to="/facilities" className="hover:text-amber-400 transition">{t.nav.facilities}</Link></li>
              <li><Link to="/news" className="hover:text-amber-400 transition">{t.nav.news}</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition">{t.nav.contact}</Link></li>
              <li><Link to="/admin/login" className="hover:text-amber-400 transition text-sea-400 flex items-center"><Zap size={12} className="mr-1"/> {t.nav.admin}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t.footer.contact}</h3>
            <ul className="space-y-3 text-sea-200 dark:text-slate-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 text-amber-500 shrink-0" />
                <span>Jl. Ahmad Yani, Batam Kota, Kota Batam, Kepulauan Riau 29461</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-amber-500 shrink-0" />
                <span>+62 778 469856</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <span>info.rpe@polibatam.ac.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t.footer.follow}</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-sea-900 dark:bg-slate-800 rounded-full hover:bg-sea-800 dark:hover:bg-slate-700 transition text-sea-200 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-sea-900 dark:bg-slate-800 rounded-full hover:bg-sea-800 dark:hover:bg-slate-700 transition text-sea-200 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-sea-900 dark:bg-slate-800 rounded-full hover:bg-sea-800 dark:hover:bg-slate-700 transition text-sea-200 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
            <div className="mt-6 p-4 bg-sea-900/50 dark:bg-slate-900 rounded-lg border border-sea-800 dark:border-slate-800">
              <p className="text-xs text-sea-300 mb-2">Ingin tahu struktur database kami?</p>
              <a href="#" className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center">
                Lihat Schema SQL
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-sea-900 dark:border-slate-800 text-center text-sea-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Teknologi Rekayasa Pembangkit Energi. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
