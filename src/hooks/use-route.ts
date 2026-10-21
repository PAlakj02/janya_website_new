import { useCallback, useEffect, useState } from "react";

/** Minimal client-side router: real URLs, no page reloads, browser back/forward supported. */
export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState(null, "", to);
      setPath(to);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Safari reuses whatever icon it remembers for each URL on pushState navigation,
  // so point the favicon links at a per-route URL to force a fresh load every time.
  useEffect(() => {
    document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set("p", path);
      const fresh = link.cloneNode() as HTMLLinkElement;
      fresh.href = url.toString();
      link.replaceWith(fresh);
    });
  }, [path]);

  const segments = path.split("/").filter(Boolean);
  return { path, segments, navigate };
}
