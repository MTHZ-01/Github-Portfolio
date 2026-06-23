import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Research from './sections/Research';
import Honors from './sections/Honors';
import Contact from './sections/Contact';

import SectionRail from './components/SectionRail';
import MobileSectionRail from './components/MobileSectionRail';

// 1. Import your new background image asset
import bgImage from './assets/Photos/ChatGPT Image Jun 23, 2026, 01_39_02 PM.png';

// A fast, layout-safe helper to detect screens smaller than a standard desktop breakpoint (768px)
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const variants = {
  hidden: () => ({
    opacity: 0,
    y: isMobile() ? 0 : 100,
    scale: isMobile() ? 1 : 0.96,
    filter: isMobile() ? 'none' : 'blur(14px)',
  }),
  visible: () => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: isMobile() ? 'none' : 'blur(0px)',
    transition: {
      duration: isMobile() ? 0.01 : 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

class AnimatedSection extends Component {
  state = {
    visible: false,
  };

  observer = null;

  componentDidMount() {
    if (isMobile()) {
      this.setState({ visible: true });
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.setState({
          visible: entry.isIntersecting,
        });
      },
      {
        threshold: 0.12,
        rootMargin: '-50px 0px -50px 0px',
      }
    );

    if (this.container) {
      this.observer.observe(this.container);
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { children, id } = this.props;

    return (
      <section
        id={id}
        ref={(el) => (this.container = el)}
        className="transform-gpu"
        style={{
          minHeight: isMobile() ? 'auto' : '100vh',
        }}
      >
        <motion.div
          variants={variants}
          custom={this.state.visible}
          initial="hidden"
          animate={this.state.visible ? "visible" : "hidden"}
          style={{
            willChange: isMobile() ? 'auto' : 'transform, opacity, filter',
          }}
        >
          {children}
        </motion.div>
      </section>
    );
  }
}

class App extends Component {
  render() {
    const { language } = this.props;

    return (
      <div
        dir={language === 'fa' ? 'rtl' : 'ltr'}
        className={`min-h-screen bg-space-black text-gray-100 overflow-x-hidden relative ${
          language === 'fa' ? 'lang-fa' : ''
        }`}
      >
        {/* 2. Updated Background Element */}
        <div 
          className="fixed inset-0 transform-gpu bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            zIndex: 0 
          }} 
          aria-hidden="true" 
        />

        <SectionRail />
        <MobileSectionRail />

        <div className="relative z-10">
          <Navbar />

          <section id="hero" className="transform-gpu">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Hero />
            </motion.div>
          </section>

          <AnimatedSection id="about">
            <About />
          </AnimatedSection>

          <AnimatedSection id="projects">
            <Projects />
          </AnimatedSection>

          <AnimatedSection id="research">
            <Research />
          </AnimatedSection>

          <AnimatedSection id="honors">
            <Honors />
          </AnimatedSection>

          <AnimatedSection id="contact">
            <Contact />
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
            }}
          >
            <Footer />
          </motion.div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.theme.language,
});

export default connect(mapStateToProps)(App);