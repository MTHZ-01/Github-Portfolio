import beatifulPic from '../assets/Photos/beatifulPic.jpg';
import { useSelector } from 'react-redux';
import translations from '../i18n';

const Hero = () => {
  const { language } = useSelector((state) => state.theme);

  return (
    <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center pt-32 sm:pt-36 md:pt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#00f5ff10_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`${language === 'fa' ? 'md:order-2 text-right' : 'md:order-1 text-left'}`}>
            <h1 className={`relative ${language === 'fa' ? 'text-7xl sm:text-8xl md:text-[6.5rem] font-black tracking-tight leading-[0.95]' : 'text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-tight'} mb-4 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent`}>
              {language === 'fa' ? 'ساخت' : 'BUILDING'}
              <br />
              {language === 'fa' ? 'آینده' : 'THE FUTURE'}
            </h1>

            <p className="text-base sm:text-lg md:text-xl bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent mb-8 max-w-xl">
              {translations[language].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 py-4 bg-gray-600/8 text-gray-300 font-semibold rounded-full hover:bg-gray-500/10 transition text-base"
              >
                {translations[language].viewProjects}
              </button>

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 text-gray-400 font-semibold rounded-full border border-gray-600/20 hover:border-gray-500/30 hover:bg-gray-700/6 transition text-base text-center shadow-[inset_0_1px_1px_rgba(100,100,100,0.05)]"
              >
                {translations[language].github}
              </a>
            </div>
          </div>

          <div className={`${language === 'fa' ? 'md:order-1 md:justify-start' : 'md:order-2 md:justify-end'} flex justify-center`}>
            <div className="w-full max-w-md sm:max-w-lg rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(150,150,150,0.08)] border border-gray-600/15">
              <img src={beatifulPic} alt="Hero" className="w-full h-72 sm:h-96 object-cover block" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
        ↓
      </div>
    </section>
  );
};

export default Hero;