import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigateTo = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
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
      const nextPath = path || "/";
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

  return {
    navigateTo: navigateTo,
    pageLoading: isPageLoading,
  };
};
