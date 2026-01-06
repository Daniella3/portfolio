import { useEffect, useState } from "react";

export function useScrollFade(sectionRef, { multiplier = 2 } = {}) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const update = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY + window.innerHeight / 2;

      const progress = (scrollY - sectionTop) / sectionHeight;
      const fade = Math.min(Math.max(1 - progress * multiplier, 0), 1);

      setOpacity(fade);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRef, multiplier]);

  return opacity;
}
