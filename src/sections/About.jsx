import { useSelector } from 'react-redux';
import translations from '../i18n';

const About = () => {
  const { language } = useSelector((state) => state.theme);

  return (
    <section id="about" className="py-20 sm:py-24 bg-space-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
          {translations[language].aboutTitle}
        </h2>

        <div
          className={`grid gap-10 md:grid-cols-2 items-center ${
            language === 'fa' ? 'text-right' : 'text-left'
          }`}
        >
          {/* Left Side */}
          <div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {translations[language].aboutParagraph1}
            </p>

            <p className="text-base sm:text-lg text-gray-300 mt-6 leading-relaxed">
              {translations[language].aboutParagraph2}
            </p>
          </div>

          {/* Right Side */}
          <div
            className={`space-y-5 text-sm sm:text-base ${
              language === 'fa' ? 'text-right' : 'text-left'
            }`}
          >
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              🏆 {translations[language].achievement1}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              🏅 {translations[language].achievement2}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              🚀 {translations[language].achievement3}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              💡 {translations[language].achievement4}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;