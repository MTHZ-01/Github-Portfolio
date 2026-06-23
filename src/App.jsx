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

const variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.96,
    filter: 'blur(14px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
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
        threshold: 0.12, // Lowered slightly to capture incoming sections smoother
        rootMargin: '-50px 0px -50px 0px', // Wider viewport sweet-spot
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
        className="transform-gpu" // Forces a unique composite rendering layer
        style={{
          minHeight: '100vh',
        }}
      >
        {/* REMOVED AnimatePresence: Components now stay mounted in the DOM.
          Visibility states toggle seamlessly via the animate property, preventing 
          layout shifts, scroll rail calculation drops, and component rebuilds.
        */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate={this.state.visible ? "visible" : "hidden"}
          style={{
            willChange: 'transform, opacity, filter',
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
        {/* Fixed ambient backgrounds isolated via transform-gpu */}
        <div className="dust-scene transform-gpu" aria-hidden="true" />

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
            viewport={{ once: true }} // Prevents refiring footer animations on tiny adjustments
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