import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

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

const variants = {
  hidden: {
    opacity: 0,
    y: 30,         // Reduced from 100px to prevent massive layout recalculations
    scale: 0.99,   // Subtle scale gives an elegant "pop" without killing performance
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,          // Snappier duration makes the site feel lightning fast
      ease: [0.16, 1, 0.3, 1], // Custom hardware-accelerated cubic-bezier ease
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

class AnimatedSection extends Component {
  state = {
    visible: false,
  };

  observer = null;

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.setState({
          visible: entry.isIntersecting,
        });
      },
      {
        threshold: 0.18,
        rootMargin: '-100px 0px -100px 0px',
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
        style={{
          minHeight: '100vh',
        }}
      >
        <AnimatePresence mode="wait">
          {this.state.visible && (
            <motion.div
              key={id}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                willChange: 'transform, opacity, filter',
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="dust-scene" aria-hidden="true" />

        <SectionRail />
        <MobileSectionRail />

        <div className="relative z-10">

          <Navbar />

          <section id="hero">
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