import beatifulPic from '../assets/Photos/beatifulPic.jpg';
import { useSelector } from 'react-redux';
import translations from '../i18n';

const Hero = () => {
  const { language } = useSelector((state) => state.theme);

  return (
    <section className="min-h-screen flex items-center justify-center pt-28 sm:pt-32 md:pt-20 pb-14 relative overflow-hidden">

      {/* background ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,245,255,0.06),transparent_40%)]" />

      <div className="max-w-6xl mx-auto px-6 z-10 w-full">

        {/* switched from grid → flex for tighter composition */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">

          {/* TEXT SIDE */}
          <div
            className={`
              ${
                language === 'fa'
                  ? 'md:order-2 text-right'
                  : 'md:order-1 text-left'
              }
              md:w-[58%]
              relative
              z-20
            `}
          >

            <div className="mb-4 inline-block px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl text-gray-400 text-sm tracking-wide">
              SOFTWARE • AI • AUTOMATION
            </div>

            <h1
              className={`
                ${
                  language === 'fa'
                    ? 'text-6xl sm:text-7xl md:text-[6rem] font-black leading-[0.95]'
                    : 'text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95]'
                }
                tracking-tight
                mb-6
                bg-gradient-to-b
                from-white
                via-gray-200
                to-gray-500
                bg-clip-text
                text-transparent
              `}
            >
              {language === 'fa' ? 'ساخت' : 'BUILDING'}
              <br />
              {language === 'fa' ? 'آینده' : 'THE FUTURE'}
            </h1>

            <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              {translations[language].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="
                  px-7 py-4
                  rounded-2xl
                  bg-white
                  text-black
                  font-semibold
                  transition
                  hover:scale-[1.02]
                "
              >
                {translations[language].viewProjects}
              </button>

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="
                  px-7 py-4
                  rounded-2xl
                  bg-white/[0.03]
                  border border-white/[0.06]
                  backdrop-blur-xl
                  text-gray-300
                  transition
                  hover:bg-white/[0.05]
                "
              >
                {translations[language].github}
              </a>

            </div>
          </div>

          {/* IMAGE SIDE — Apple overlap style */}
          <div
            className={`
              ${
                language === 'fa'
                  ? 'md:order-1 md:mr-[-9rem]'
                  : 'md:order-2 md:-ml-36'
              }
              flex justify-center
              md:w-[42%]
              relative
              z-10
            `}
          >
            <div className="relative mt-6 md:mt-8 mb-8 md:mb-12">

              {/* subtle glow */}
              <div className="absolute inset-0 scale-110 bg-white/[0.03] blur-3xl" />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                  border border-white/[0.04]
                  transition duration-700
                  hover:scale-[1.015]
                "
              >
                <img
                  src={beatifulPic}
                  alt="Hero"
                  loading="eager"
                  decoding="sync"
                  draggable="false"
                  className="
                    block
                    w-full
                    h-auto
                    object-contain
                    max-w-[230px]
                    sm:max-w-[310px]
                    md:max-w-[300px]
                    select-none
                  "
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* bottom arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce text-xl">
        ↓
      </div>

    </section>
  );
};

export default Hero;