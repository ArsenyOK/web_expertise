const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="text-sm font-semibold tracking-wide">
          Arsenii Pylypenko
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#expertise" className="hover:text-white">
            Expertise
          </a>
          <a href="#work" className="hover:text-white">
            Work
          </a>
          <a href="#clients" className="hover:text-white">
            Clients
          </a>
          <a href="#blog" className="hover:text-white">
            Insights
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Start a project
        </a>
      </div>
    </header>
  );
};

export default Header;
