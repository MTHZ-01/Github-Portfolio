import { useSelector } from 'react-redux';
import translations from '../i18n';

const Contact = () => {
  const { language } = useSelector((state) => state.theme);

  return (
    <section id="contact" className="py-20 sm:py-24 bg-space-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">{language === 'fa' ? 'بیایید با هم بسازیم' : "Let's Build Together"}</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          {language === 'fa' ? 'یک پروژه در ذهن دارید؟ می‌خواهید همکاری کنید؟ یا فقط سلام دهید؟' : 'Have a project in mind? Want to collaborate? Or just say hi?'}
        </p>

        <div className="bg-gray-700/4 p-10 rounded-3xl max-w-xl mx-auto border border-gray-600/15 shadow-[inset_0_2px_4px_rgba(150,150,150,0.03),0_12px_30px_rgba(100,100,100,0.01)]">
          <a 
            href="mailto:your.email@example.com"
            className="block text-3xl font-semibold bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent hover:from-gray-100 hover:to-gray-500 transition mb-8"
          >
            mthz.ira@gmail.com
          </a>

          <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest">
            <a href="https://github.com/yourusername" target="_blank" className="text-gray-400 hover:text-gray-300 transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="text-gray-400 hover:text-gray-300 transition">
              LinkedIn
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" className="text-gray-400 hover:text-gray-300 transition">
              Twitter / X
            </a>
          </div>
        </div>

        <p className="mt-12 text-gray-400 text-sm">
          {language === 'fa' ? 'یا فقط یک پیام برای من بفرستید ↓' : 'Or just shoot me a message below ↓'}
        </p>
      </div>
    </section>
  );
};

export default Contact;