const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/40 md:flex-row">
        <p>© 2026 Arsenii Pylypenko. All rights reserved.</p>

        <div className="flex gap-6">
          <a
            href="https://github.com/ArsenyOK"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/arsenii-pylypenko-071094176/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="mailto:arsen.pilipenko2014@gmail.com"
            className="hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
