import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import translations from '../i18n'; 

const sections = [
  { id: 'hero', key: 'hero' },
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'research', key: 'research' },
  { id: 'honors', key: 'honors' },
  { id: 'contact', key: 'contact' },
];

class MobileSectionRail extends Component {
  state = {
    active: 'hero',
    hoveredId: null, // Keeps hover/touch title triggers responsive
  };

  observer = null;
  isScrollingClick = false; // Lock flag to prioritize taps over observer fights
  lockTimeout = null;

  componentDidMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        // If the scroll was triggered by a physical tap, let goTo handle the active state
        if (this.isScrollingClick) return;

        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const newActiveId = visibleEntry.target.id;
          if (this.state.active !== newActiveId) {
            this.setState({ active: newActiveId });
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-30% 0px -35% 0px',
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) this.observer.observe(el);
    });
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
    if (this.lockTimeout) clearTimeout(this.lockTimeout);
  }

  goTo = (id) => {
    // 1. Force state selection to snap immediately
    this.isScrollingClick = true;
    this.setState({ active: id });

    // 2. Smoothly scroll container view to target section bounds
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // 3. Set a fallback release lock once smooth animation completes
    if (this.lockTimeout) clearTimeout(this.lockTimeout);
    this.lockTimeout = setTimeout(() => {
      this.isScrollingClick = false;
    }, 800);
  };

  render() {
    const { language } = this.props;
    const isRtl = language === 'fa';
    const activeIndex = sections.findIndex(s => s.id === this.state.active);

    return (
      <div 
        className={`md:hidden fixed bottom-8 z-[999] transform-gpu transition-all duration-300 ${
          isRtl ? 'left-6' : 'right-6'
        }`}
      >
        {/* Monolithic Outer Dock Shell with Deep Frosted Glass */}
        <div
          className="
            relative
            px-2.5 py-4
            rounded-full
            bg-black/40
            backdrop-blur-xl
            border border-white/5
            shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)]
          "
        >
          {/* Grok Solid Kinetic Fluid Block */}
          <motion.div
            className="absolute left-2.5 right-2.5 bg-white rounded-full z-0 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            animate={{
              top: `${(activeIndex * 32) + 16}px`, 
              height: '14px',
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 28,
            }}
            style={{ willChange: 'top, height' }}
          />

          {/* Interactive Track Matrix */}
          <div className="relative flex flex-col gap-[18px] z-10">
            {sections.map((section) => {
              const active = this.state.active === section.id;
              const isHovered = this.state.hoveredId === section.id;
              
              // Safe localized translations lookup
              const currentDict = translations[language] || {};
              const labelText = currentDict[section.key] || currentDict[section.id] || section.id;

              return (
                <div
                  key={section.id}
                  onClick={() => this.goTo(section.id)}
                  onTouchStart={() => this.setState({ hoveredId: section.id })}
                  onTouchEnd={() => setTimeout(() => this.setState({ hoveredId: null }), 1000)} // Tooltip auto-fades after 1s on mobile touch
                  onMouseEnter={() => this.setState({ hoveredId: section.id })}
                  onMouseLeave={() => this.setState({ hoveredId: null })}
                  className="relative flex justify-center items-center w-3.5 h-3.5 cursor-pointer"
                >
                  {/* Background node dot */}
                  <motion.div
                    animate={{
                      scale: active ? 0 : 1,
                      opacity: active ? 0 : isHovered ? 0.7 : 0.3,
                    }}
                    transition={{ duration: 0.15 }}
                    className="w-1 h-1 rounded-full bg-white"
                  />

                  {/* SpaceX Hardware Target Lock Line (Inverted to the outside edge) */}
                  {active && (
                    <motion.div 
                      layoutId="spacexCrosshair"
                      className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-white/80 ${
                        isRtl ? '-left-3.5' : '-right-3.5'
                      }`}
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 30
                      }}
                    />
                  )}

                  {/* Micro Futuristic Floating Mobile Titles */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ 
                          opacity: 0, 
                          x: isRtl ? 10 : -10,
                          scale: 0.92 
                        }}
                        animate={{ 
                          opacity: 1, 
                          x: isRtl ? 22 : -22,
                          scale: 1 
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: isRtl ? 8 : -8,
                          scale: 0.95,
                          transition: { duration: 0.1 }
                        }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 500, 
                          damping: 24 
                        }}
                        style={{
                          transformOrigin: isRtl ? 'left center' : 'right center',
                          fontFamily: isRtl ? 'Vazirmatn, system-ui, sans-serif' : 'ui-monospace, SFMono-Regular, monospace'
                        }}
                        className={`
                          absolute pointer-events-none whitespace-nowrap text-[9px] font-bold tracking-wider uppercase
                          bg-black/90 px-2 py-0.5 rounded border border-white/10 shadow-xl backdrop-blur-md text-white/90
                          ${isRtl ? 'left-full text-right' : 'right-full text-right'}
                        `}
                      >
                        {labelText}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.theme.language,
});

export default connect(mapStateToProps)(MobileSectionRail);