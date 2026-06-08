import { useSelector } from 'react-redux';
import translations from '../i18n';

const About = () => {
  const { language } = useSelector((state) => state.theme);

  return (
    <section id="about" className="py-24 bg-space-dark">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">{translations[language].aboutTitle}</h2>

        <div className={`grid md:grid-cols-2 gap-12 items-center ${language === 'fa' ? 'text-right' : 'text-left'}`}>
          <div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {translations[language].aboutParagraph1}
            </p>
            <p className="text-lg text-gray-300 mt-6 leading-relaxed">
              {translations[language].aboutParagraph2}
            </p>
          </div>

          <div className="space-y-6 text-sm uppercase tracking-widest">
            <div>{language === 'fa' ? 'محل: زمین' : 'Based in • Earth'}</div>
            <div>{language === 'fa' ? 'در حال یادگیری: Next.js + AI' : 'Currently Learning • Next.js + AI'}</div>
            <div>{language === 'fa' ? 'پشته مورد علاقه: React + Tailwind + Node' : 'Favorite Stack • React + Tailwind + Node'}</div>
            <div>{language === 'fa' ? 'الهام‌گرفته از: SpaceX, xAI, Grok' : 'Inspired by • SpaceX, xAI, Grok'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;