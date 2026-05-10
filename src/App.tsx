import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Blog from "./components/sections/Blog";
import Clients from "./components/sections/Clients";
import Expertise from "./components/sections/Expertise";
import Hero from "./components/sections/Hero";
import Process from "./components/sections/Process";
import Projects from "./components/sections/Projects";
import CustomCursor from "./components/ui-tools/CustomCursor";
import SmoothScroll from "./components/ui-tools/SmoothScroll";
import ContactModal from "./components/ui-tools/ContactModal";
import PageLoader from "./components/ui-tools/PageLoader";
import { useMobile } from "./hooks/useMobile";

const States = lazy(() => import("./components/pages/States"));

const Home = ({
  onContactOpen,
  navigateTo,
  currentPath,
}: {
  onContactOpen: () => void;
  navigateTo: (path: string, hash?: string) => void;
  currentPath: string;
}) => {
  return (
    <>
      <Hero onContactOpen={onContactOpen} />
      <Expertise />
      <Projects />
      <Clients />
      <Process />
      <Blog onNavigate={navigateTo} currentPath={currentPath} />
    </>
  );
};

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const routeTimerRef = useRef<number | undefined>(undefined);
  const loaderTimerRef = useRef<number | undefined>(undefined);

  const scrollToHash = useCallback((hash?: string) => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const navigateTo = useCallback(
    (path: string, hash?: string) => {
      const nextPath = path === "/states" ? "/states" : "/";
      const nextUrl = `${nextPath}${hash ? `#${hash}` : ""}`;
      const currentUrl = `${location.pathname}${location.hash}`;

      window.clearTimeout(routeTimerRef.current);
      window.clearTimeout(loaderTimerRef.current);

      if (nextUrl === currentUrl) {
        setIsPageLoading(false);
        scrollToHash(hash);
        return;
      }

      setIsPageLoading(true);

      routeTimerRef.current = window.setTimeout(() => {
        navigate(nextUrl);

        loaderTimerRef.current = window.setTimeout(() => {
          setIsPageLoading(false);
        }, 420);
      }, 340);
    },
    [location.hash, location.pathname, navigate, scrollToHash],
  );

  useEffect(() => {
    scrollToHash(location.hash.replace("#", ""));
  }, [location.hash, location.pathname, scrollToHash]);

  useEffect(() => {
    return () => {
      window.clearTimeout(routeTimerRef.current);
      window.clearTimeout(loaderTimerRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {!isMobile && (
        <>
          <SmoothScroll />
          <CustomCursor />
        </>
      )}
      <Header
        currentPath={location.pathname}
        onContactOpen={() => setIsContactOpen(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentPath={location.pathname}
              navigateTo={navigateTo}
              onContactOpen={() => setIsContactOpen(true)}
            />
          }
        />
        <Route
          path="/states"
          element={
            <Suspense fallback={<PageLoader isVisible />}>
              <States />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Home
              currentPath={location.pathname}
              navigateTo={navigateTo}
              onContactOpen={() => setIsContactOpen(true)}
            />
          }
        />
      </Routes>
      <Footer />
      <PageLoader isVisible={isPageLoading} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
};

export default App;
