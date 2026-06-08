import { useSelector } from 'react-redux';
import translations from '../i18n';

const TelegramIcon = () => (
  <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3.5 12.6l3.7 1.5 1.3 4.2c.2.6.9.8 1.4.5l2.1-1.5 3.4 2c.6.4 1.4.1 1.6-.6l3.1-13.6c.2-.7-.4-1.3-1.1-1.1L3.5 8.1c-.6.2-.9.8-.5 1.4zM9.5 14.2l-.6-2.2 8.6-5-6 6.1.3 1.9c0 .3-.2.5-.5.5-.2 0-.4-.1-.5-.3z" fill="currentColor"/>
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M23 3.2a1.3 1.3 0 0 0-1.8-.4L12 8.8 2.8 2.8A1.3 1.3 0 0 0 1 4.6l7.5 6.6L1 18.8a1.3 1.3 0 0 0 .4 1.8 1.3 1.3 0 0 0 .8.3c.4 0 .8-.2 1.1-.5L12 13.6l8.7 7a1.3 1.3 0 0 0 1.8-.4 1.3 1.3 0 0 0-.4-1.8L15.3 11.2 23 4.6c.5-.3.7-1 .4-1.4z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.5h2v10H3v-10zm4.5 0h2v1.4c.4-.7 1.3-1.3 2.5-1.3 2.7 0 3.2 1.8 3.2 4.1V19.5h-2v-4c0-1-.1-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V19.5h-2v-10z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.2.7-1.5-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.6 4 18.6 4.3 18.6 4.3c.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.4-2.8 5.4-5.5 5.7.4.3.7 1 .7 2v3c0 .3.2.6.8.5A12 12 0 0 0 12 .5z"/>
  </svg>
);

const Footer = () => {
  const language = useSelector((state) => state.theme.language);

  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between text-center md:text-left">
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} YOURNAME. {translations[language].footerCopy}
          </div>

          <div className="flex flex-col items-start gap-4 text-left">
            <p className={language === 'fa' ? 'text-2xl md:text-3xl font-bold text-white' : 'text-xl md:text-2xl font-bold text-white'}>{translations[language].footerConnect}</p>
            <div className="space-y-3">
              <a href="https://t.me/mhthzstrong" className="flex items-center gap-3 text-lg font-bold text-white hover:text-cyan-300 transition" target="_blank" rel="noreferrer noopener">
                <TelegramIcon /> {translations[language].telegram}
              </a>
              <a href="https://x.com/MohammdThzi" className="flex items-center gap-3 text-lg font-bold text-white hover:text-sky-400 transition" target="_blank" rel="noreferrer noopener">
                <XIcon /> {translations[language].x}
              </a>
              <a href="https://github.com/mhthzstrong" className="flex items-center gap-3 text-lg font-bold text-white hover:text-gray-300 transition" target="_blank" rel="noreferrer noopener">
                <GitHubIcon /> {translations[language].github}
              </a>
              <a href="https://linkedin.com" className="flex items-center gap-3 text-lg font-bold text-white hover:text-blue-400 transition" target="_blank" rel="noreferrer noopener">
                <LinkedInIcon /> {translations[language].linkedin}
              </a>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            {translations[language].footerInspired}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;