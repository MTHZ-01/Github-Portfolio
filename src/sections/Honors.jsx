import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import all certificate images from assets/Certs
import cert1 from '../assets/Certs/46f3dd464ca2424cbf8a75480cbb59a8.png';
import cert2 from '../assets/Certs/669f064ccda14a8dbecaacbe608478b9.png';
import cert3 from '../assets/Certs/bb5b5bde2cce48148ec6a40096b6924d.png';
import cert4 from '../assets/Certs/bf804121cc074482bac9bfb99ff6cd63.png';
import cert5 from '../assets/Certs/c9c15823f112421eab7b30fe54577755.png';
import cert6 from '../assets/Certs/e119391ededf48ebb6bd43aa9032cc81.png';
import cert7 from '../assets/Certs/eb7b76a5424648b48bd5ecef9638ee8f.png';

class Honors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCert: null
    };
  }

  openModal = (certImage) => {
    this.setState({ activeCert: certImage });
  };

  closeModal = () => {
    this.setState({ activeCert: null });
  };

  render() {
    const { language } = this.props;
    const { activeCert } = this.state;

    // Array holding all imported honors files
    const certificates = [cert1, cert2, cert3, cert4, cert5, cert6, cert7];

    return (
      <section id="honors" className="py-24 bg-space-dark relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {language === 'fa' ? 'افتخارات' : 'Honors & Achievements'}
          </h2>

          {/* Card Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => this.openModal(cert)}
                className="bg-gray-700/5 p-4 rounded-3xl border border-gray-600/15 
                hover:border-gray-500/25
                shadow-[inset_0_1px_1px_rgba(150,150,150,0.04)]
                hover:shadow-[inset_0_1px_1px_rgba(150,150,150,0.08),0_10px_20px_rgba(100,100,100,0.05)]
                transition-all duration-300 group cursor-pointer flex items-center justify-center"
              >
                {/* Image Wrapper maintaining crisp layout aspect bounds */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-950/40 border border-gray-700/30 flex items-center justify-center p-2">
                  <img
                    src={cert}
                    alt={`Honor Certificate ${index + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-sm
                    transition-all duration-300 ease-out
                    group-hover:scale-[1.03] group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scaled Certificate Lightbox Overlay */}
        {activeCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={this.closeModal}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
              <button 
                onClick={this.closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/40 hover:bg-black/60 w-9 h-9 rounded-full flex items-center justify-center text-sm transition"
              >
                ✕
              </button>
              <img 
                src={activeCert} 
                alt="Scaled Achievement Certificate" 
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.theme.language
});

export default connect(mapStateToProps)(Honors);