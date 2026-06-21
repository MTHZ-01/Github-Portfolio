import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Certificate Images
import paper1Cert from '../assets/Photos/firstCert.png';
import paper2Cert from '../assets/Photos/secondCert.png';

// Import PDF Files directly from your src folder
import paper1Pdf from '../assets/Papers/4_5983480628396431495.pdf';
import paper2Pdf from '../assets/Papers/4_5987559722046199613.pdf';

class Research extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCert: null 
    };
  }

  openModal = (e, certImage) => {
    e.preventDefault();
    this.setState({ activeCert: certImage });
  };

  closeModal = () => {
    this.setState({ activeCert: null });
  };

  render() {
    const { language } = this.props;
    const { activeCert } = this.state;

    const papers = [
      {
        title:
          language === 'fa'
            ? 'بهبود عملکرد الگوریتم ژنتیک با استفاده از تکنیک‌های تطبیقی و نخبه‌گرایی'
            : 'Genetic Algorithm Performance Enhancement through Adaptive Techniques and Elitism',
        description:
          language === 'fa'
            ? 'پژوهشی در زمینه بهینه‌سازی الگوریتم ژنتیک با تنظیم پویای نرخ جهش و تقاطع و پیاده‌سازی با جنگو و پایتون.'
            : 'An enhanced GA approach optimizing convergence using dynamic mutation/crossover rates, integrated with Django and Python.',
        certificate: paper1Cert,
        paperLink: paper1Pdf,
        fileName: 'Genetic_Algorithm_Performance_Enhancement.pdf'
      },
      {
        title:
          language === 'fa'
            ? 'تحلیل عملکرد الگوریتم PSO ترکیبی برای هماهنگی بهینه رله‌های جریان اضافی جهت‌دار در سیستم ۶ باس IEEE'
            : 'Analyzing the Performance of Hybrid PSO for Optimal Directional Overcurrent Relay Coordination with Different IEC Characteristics in the IEEE 6-Bus System',
        description:
          language === 'fa'
            ? 'بررسی مقایسه‌ای الگوریتم‌های PSO و Hybrid PSO (ترکیب با الگوریتم کلونی مورچگان/شبیه‌سازی تبرید) برای هماهنگی بهینه رله‌ها تحت مشخصات مختلف IEC.'
            : 'A comparative protection study applying standard and Hybrid PSO algorithms to minimize DOCR fault clearance times in an IEEE 6-bus grid.',
        certificate: paper2Cert,
        paperLink: paper2Pdf,
        fileName: 'Hybrid_PSO_Relay_Coordination.pdf'
      }
    ];

    return (
      <section id="research" className="py-24 bg-space-dark relative">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {language === 'fa' ? 'فعالیت‌های پژوهشی' : 'Research & Publications'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {papers.map((paper, index) => (
              <div
                key={index}
                className="bg-gray-700/5 p-6 rounded-3xl border border-gray-600/15 
                hover:border-gray-500/25
                shadow-[inset_0_1px_1px_rgba(150,150,150,0.04)]
                hover:shadow-[inset_0_1px_1px_rgba(150,150,150,0.08),0_10px_20px_rgba(100,100,100,0.05)]
                transition flex flex-col justify-between"
              >
                <div>
                  <h3 className={`text-xl font-semibold mb-3 tracking-wide text-gray-100 ${language === 'fa' ? 'leading-relaxed text-right' : 'leading-snug text-left'}`}>
                    {paper.title}
                  </h3>

                  <p className={`text-gray-400 text-sm mb-6 leading-relaxed min-h-[3rem] ${language === 'fa' ? 'text-right' : 'text-left'}`}>
                    {paper.description}
                  </p>

                  {/* Certificate Card Container */}
                  <div 
                    onClick={(e) => this.openModal(e, paper.certificate)}
                    className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden 
                    bg-gray-950/40 border border-gray-700/30 shadow-inner 
                    mb-6 flex items-center justify-center p-3 cursor-pointer"
                  >
                    <img
                      src={paper.certificate}
                      alt="Certificate Thumbnail"
                      className="max-w-full max-h-full object-contain rounded-lg 
                      shadow-md transition-all duration-300 ease-out
                      group-hover:scale-[1.02] group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                  </div>
                </div>

                <div className={`flex gap-3 flex-wrap pt-2 ${language === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Download PDF Link */}
                  <a
                    href={paper.paperLink}
                    download={paper.fileName}
                    className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-900
                    hover:bg-gray-200 transition text-xs font-semibold shadow-sm"
                  >
                    {language === 'fa' ? 'دانلود مقاله (PDF)' : 'Download Paper (PDF)'}
                  </a>

                  {/* Scaled View Trigger Button */}
                  <button
                    onClick={(e) => this.openModal(e, paper.certificate)}
                    className="px-5 py-2.5 rounded-full border border-gray-600/30 
                    text-gray-300 hover:text-white hover:border-gray-400/50 transition text-xs font-medium"
                  >
                    {language === 'fa' ? 'مشاهده گواهی' : 'View Certificate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scaled Certificate Modal Lightbox */}
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
                alt="Scaled Certificate" 
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

export default connect(mapStateToProps)(Research);
