import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/themeSlice';
import translations from '../i18n';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.theme);
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-700/8 to-gray-700/3 backdrop-blur-sm border-b border-gray-600/15 shadow-[inset_0_1px_0_rgba(150,150,150,0.04)]">
      <div className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ${language === 'fa' ? 'md:flex-row-reverse' : ''}`}>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-black text-sm font-bold">◆</span>
          </div>
          <div className="text-lg font-semibold tracking-tight bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent">{language === 'fa' ? 'محمد تقی‌زاده' : 'Mohammad Taghizadeh'}</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          <button onClick={() => scrollTo('about')} className="text-gray-400 hover:text-gray-300 transition">{translations[language].about}</button>
          <button onClick={() => scrollTo('projects')} className="text-gray-400 hover:text-gray-300 transition">{translations[language].projects}</button>
          <button onClick={() => scrollTo('contact')} className="text-gray-400 hover:text-gray-300 transition">{translations[language].contact}</button>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <button onClick={() => dispatch(setLanguage('fa'))} className={`px-2 py-1 rounded ${language === 'fa' ? 'bg-gray-300 text-black' : 'text-gray-300 hover:text-gray-200'}`}>FA</button>
            <button onClick={() => dispatch(setLanguage('en'))} className={`px-2 py-1 rounded ${language === 'en' ? 'bg-gray-300 text-black' : 'text-gray-300 hover:text-gray-200'}`}>EN</button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded hover:bg-gray-700/5 transition" aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700/4 border-t border-gray-600/15 shadow-[inset_0_1px_0_rgba(150,150,150,0.04)]">
          <div className="flex flex-col py-4 px-4 space-y-4 text-lg">
            <button onClick={() => scrollTo('about')} className={`${language === 'fa' ? 'text-right' : 'text-left'} text-gray-400 hover:text-gray-300 transition`}>{translations[language].about}</button>
            <button onClick={() => scrollTo('projects')} className={`${language === 'fa' ? 'text-right' : 'text-left'} text-gray-400 hover:text-gray-300 transition`}>{translations[language].projects}</button>
            <button onClick={() => scrollTo('contact')} className={`${language === 'fa' ? 'text-right' : 'text-left'} text-gray-400 hover:text-gray-300 transition`}>{translations[language].contact}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;