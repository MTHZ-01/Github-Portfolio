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

class SectionRail extends Component {
    state = {
        active: 'hero',
        hoveredId: null,
    };

    observer = null;
    isScrollingClick = false; // Lock parameter to prioritize mouse click selection states
    lockTimeout = null;

    componentDidMount() {
        this.observer = new IntersectionObserver(
            (entries) => {
                // If the user manually forced a click update, let the click handler manage the active state
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
                threshold: 0.20,
                rootMargin: '-30% 0px -30% 0px', // Re-centered sweet spot for stable scroll recognition
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
        // 1. Force the active selection block to snap immediately on user click
        this.isScrollingClick = true;
        this.setState({ active: id });

        // 2. Smoothly direct the main window layout view to target element container bounds
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        // 3. Clear existing operational timeouts and release lock once the window transit settles
        if (this.lockTimeout) clearTimeout(this.lockTimeout);
        this.lockTimeout = setTimeout(() => {
            this.isScrollingClick = false;
        }, 800); // 800ms completely covers native browser smooth scroll durations
    };

    render() {
        const { language } = this.props;
        const isRtl = language === 'fa';
        const activeIndex = sections.findIndex(s => s.id === this.state.active);

        return (
            <div
                className={`hidden md:flex fixed top-1/2 -translate-y-1/2 z-[999] transform-gpu transition-all duration-300 ${isRtl ? 'left-8' : 'right-8'
                    }`}
            >
                <div
                    className="
            relative
            px-3 py-5
            rounded-full
            bg-black/40
            backdrop-blur-xl
            border border-white/5
            shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)]
          "
                >
                    {/* Grok Solid Fluid Active Indicator Capsule */}
                    <motion.div
                        className="absolute left-3 right-3 bg-white rounded-full z-0 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        animate={{
                            top: `${(activeIndex * 36) + 20}px`,
                            height: '16px',
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 450,
                            damping: 26,
                        }}
                        style={{ willChange: 'top, height' }}
                    />

                    <div className="relative flex flex-col gap-[20px] z-10">
                        {sections.map((section) => {
                            const active = this.state.active === section.id;
                            const isHovered = this.state.hoveredId === section.id;

                            // Safe dictionary mapping with lowercase fallbacks to prevent mapping misses
                            const currentDict = translations[language] || {};
                            const labelText = currentDict[section.key] || currentDict[section.id] || section.id;

                            return (
                                <div
                                    key={section.id}
                                    onClick={() => this.goTo(section.id)}
                                    onMouseEnter={() => this.setState({ hoveredId: section.id })}
                                    onMouseLeave={() => this.setState({ hoveredId: null })}
                                    className="cursor-pointer flex justify-center items-center w-4 h-4 relative"
                                >
                                    {/* Background dot node */}
                                    <motion.div
                                        animate={{
                                            scale: active ? 0 : 1,
                                            opacity: active ? 0 : isHovered ? 0.7 : 0.3,
                                        }}
                                        transition={{ duration: 0.15 }}
                                        className="w-1.5 h-1.5 rounded-full bg-white"
                                    />

                                    {/* SpaceX Telemetry crosshair pointer line */}
                                    {active && (
                                        <motion.div
                                            layoutId="desktopCrosshair"
                                            className={`absolute top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/80 ${isRtl ? '-left-4' : '-right-4'
                                                }`}
                                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                        />
                                    )}

                                    {/* Micro Futuristic Hover Titles */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: isRtl ? 15 : -15,
                                                    scale: 0.92
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: isRtl ? 28 : -28,
                                                    scale: 1
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: isRtl ? 10 : -10,
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
                          absolute pointer-events-none whitespace-nowrap text-[11px] font-bold tracking-wider uppercase
                          bg-black/85 px-2.5 py-1 rounded border border-white/10 shadow-xl backdrop-blur-md text-white/90
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

export default connect(mapStateToProps)(SectionRail);