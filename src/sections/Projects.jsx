import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import translations from '../i18n';
import softwareImg from '../assets/Photos/software.png';
import certImg from '../assets/Photos/Certificate.png';

// Global memory cache space to survive component lifecycle switches
let cachedRepos = null;

const Projects = () => {
  const [repos, setRepos] = useState(cachedRepos || []);
  const [loading, setLoading] = useState(!cachedRepos); // Skip loading UI if cache hits
  const [error, setError] = useState(null);
  const { language } = useSelector((state) => state.theme);

  useEffect(() => {
    // If we already have the repositories cached, don't ping GitHub's API
    if (cachedRepos) {
      return;
    }

    const username = "MTHZ-01";
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const validatedData = Array.isArray(data) ? data : [];
        cachedRepos = validatedData; // Set the global cache reference
        setRepos(validatedData);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return; // Gracefully handle cleanup cancellation
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

    // Aborts the network pipeline if component unmounts mid-transit
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
          {translations[language].projects}
        </h2>

        {loading && (
          <p className="text-center text-xl text-gray-400">Loading projects from GitHub...</p>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load GitHub repositories</p>
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.length > 0 ? (
              repos.map(repo => (
                <a 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/5 p-5 sm:p-6 rounded-3xl border border-gray-600/15 hover:border-gray-500/25 shadow-[inset_0_1px_1px_rgba(150,150,150,0.04)] hover:shadow-[inset_0_1px_1px_rgba(150,150,150,0.08),0_10px_20px_rgba(100,100,100,0.05)] transition group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-100 transition">
                    {repo.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 min-h-[60px] overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{repo.language || "N/A"}</span>
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-3">{translations[language].noRepos}</p>
            )}
          </div>
        )}

        {/* Featured product / certificate section */}
        <div className="mt-12 bg-gray-800/70 p-6 rounded-3xl border border-gray-600/20 shadow-[inset_0_1px_2px_rgba(150,150,150,0.06),0_16px_40px_rgba(0,0,0,0.12)]">
          <h3 className="text-2xl font-semibold mb-4">{translations[language].featuredProduct}</h3>
          <div className="flex flex-col gap-6 md:flex-row items-start">
            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden border border-gray-600/15 shadow-[inset_0_1px_1px_rgba(150,150,150,0.04)]">
              <img 
                src={softwareImg} 
                alt="Developed software" 
                loading="lazy"
                decoding="async" // Offloads image assembly calculation from UI thread
                className="w-full h-56 sm:h-64 object-cover block" 
              />
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-gray-200 mb-4 text-base sm:text-lg">This is the software I developed — click to view repository or details above.</p>
              <a href={softwareImg} target="_blank" rel="noreferrer" className="inline-block mb-4 text-gray-400 font-semibold hover:text-gray-300 transition">Open image</a>

              <div className="mt-4">
                <h4 className="text-lg font-medium mb-2">Certificate</h4>
                <a href={certImg} target="_blank" rel="noreferrer" className="inline-block rounded-lg overflow-hidden border border-gray-600/15 shadow-[inset_0_1px_1px_rgba(150,150,150,0.04)]">
                  <img 
                    src={certImg} 
                    alt="Certificate" 
                    loading="lazy"
                    decoding="async" // Prevents network paint ticks from hitching scrolls
                    className="w-48 h-auto block object-cover" 
                  />
                </a>
                <p className="text-gray-300 mt-2">{translations[language].certificateApproved}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;