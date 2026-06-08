const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center text-center md:text-left">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} YOURNAME. Built with React + Vite + Redux.
          </div>

          <div className="flex gap-8 text-sm uppercase tracking-widest text-gray-400">
            <a href="#about" className="text-gray-400 hover:text-gray-300 transition">About</a>
            <a href="#projects" className="text-gray-400 hover:text-gray-300 transition">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-gray-300 transition">Contact</a>
          </div>

          <div className="text-xs text-gray-600">
            Inspired by <span className="text-gray-200">SpaceX</span> &amp; <span className="text-gray-200">Grok</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;