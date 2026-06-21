import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// Keep critical structural layouts eager-loaded for immediate paint
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Footer from './components/Footer';

// Lazy load scrolling sections so they only bundle/parse when needed
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const Research = lazy(() => import('./sections/Research'));
const Honors = lazy(() => import('./sections/Honors')); // Added your new Honors component
const Contact = lazy(() => import('./sections/Contact'));

// Reusable Scroll Animation Wrapper Component
const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px 0px" }}
      transition={{ duration: 0.7, ease: [0.21, 1.02, 0.43, 1.01] }}
    >
      {children}
    </motion.div>
  );
};

// Simple Loading Fallback while lazy components mount
const SectionLoader = () => (
  <div className="h-48 w-full flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const { language } = useSelector((state) => state.theme);

  return (
    <div
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-space-black text-gray-100 overflow-x-hidden relative ${
        language === 'fa' ? 'lang-fa' : ''
      }`}
    >
      {/* Background Effect */}
      <div className="dust-scene" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero stays eager & outside ScrollReveal for immediate interaction above-the-fold */}
        <Hero />

        {/* Safe progressive streaming of lower components */}
        <Suspense fallback={<SectionLoader />}>
          
          <ScrollReveal>
            <About />
          </ScrollReveal>

          <ScrollReveal>
            <Projects />
          </ScrollReveal>

          <ScrollReveal>
            <Research />
          </ScrollReveal>

          {/* Integrated Honors Section */}
          <ScrollReveal>
            <Honors />
          </ScrollReveal>

          <ScrollReveal>
            <Contact />
          </ScrollReveal>

        </Suspense>

        <Footer />
      </div>
    </div>
  );
}

export default App;