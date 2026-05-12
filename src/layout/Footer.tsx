import Logo from "../assets/images";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center">
            <Logo className="h-10 w-10 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-wide text-white/90">
              Arsenii Pylypenko
            </span>

            <span className="text-xs text-white/55">
              © 2026 All rights reserved.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/40">
          <a
            href="https://github.com/ArsenyOK"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-300 text-white/55 hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/arsenii-pylypenko-071094176/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-300 text-white/55 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
