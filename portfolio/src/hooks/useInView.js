import { useEffect } from "react";

export function useInView(ref, { onEnter, onExit, options }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onEnter?.(entry);
        else onExit?.(entry);
      });
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, onEnter, onExit, options]);
}
