import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const { language } = useSelector((state) => state.theme);

  return (
    <div dir={language === 'fa' ? 'rtl' : 'ltr'} className={`min-h-screen bg-space-black text-gray-100 overflow-x-hidden ${language === 'fa' ? 'lang-fa' : ''}`}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;