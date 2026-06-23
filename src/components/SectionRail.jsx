import React, { Component } from 'react';
import { motion } from 'framer-motion';

const sections = [
    { id: 'hero' },
    { id: 'about' },
    { id: 'projects' },
    { id: 'research' },
    { id: 'honors' },
    { id: 'contact' },
];

class SectionRail extends Component {
    state = {
        active: 'hero',
    };

    observer = null;

    componentDidMount() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.setState({ active: entry.target.id });
                    }
                });
            },
            {
                threshold: 0.38,
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) this.observer.observe(el);
        });
    }

    componentWillUnmount() {
        if (this.observer) this.observer.disconnect();
    }

    goTo = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    render() {
        return (
            <div className="hidden md:flex fixed right-7 top-1/2 -translate-y-1/2 z-[999]">

                <div
                    className="
            px-3 py-5
            rounded-[28px]
            bg-white/[0.025]
            border border-white/[0.04]
            backdrop-blur-2xl
            shadow-[0_8px_40px_rgba(255,255,255,0.03)]
          "
                >
                    <div className="flex flex-col gap-5">

                        {sections.map((section) => {
                            const active = this.state.active === section.id;

                            return (
                                <div
                                    key={section.id}
                                    onClick={() => this.goTo(section.id)}
                                    className="cursor-pointer flex justify-center items-center h-4 relative"
                                >
                                    <motion.div
                                        animate={{
                                            scaleX: active ? 3.1 : 1, // Achieves the exact same stretching effect (34px / 11px)
                                            opacity: active ? 1 : 0.32,
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className={`
    h-[2px] w-[11px] origin-center rounded-full bg-white
    ${active ? 'shadow-[0_0_10px_rgba(255,255,255,0.22)]' : ''}
  `}
                                    />
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        );
    }
}

export default SectionRail;