type PageLoaderProps = {
  isVisible: boolean;
};

const PageLoader = ({ isVisible }: PageLoaderProps) => {
  return (
    <div
      className={`page-loader fixed inset-0 z-[200] grid place-items-center bg-[#050505] transition-opacity duration-300 ${
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="loader-ring absolute inset-0 rounded-full border border-white/10" />
        <div className="loader-orbit absolute inset-4 rounded-full border border-white/15" />
        <div className="loader-core h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    </div>
  );
};

export default PageLoader;
