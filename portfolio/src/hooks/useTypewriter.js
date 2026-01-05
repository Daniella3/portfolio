import { useEffect, useRef, useState } from "react";

export function useTypewriter({ roles, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1200 }) {
  const [text, setText] = useState("");
  const state = useRef({ role: 0, char: 0, deleting: false});
  const timeoutRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const s = state.current;
      const roleText = roles[s.role];

      if (!s.deleting) {
        s.char += 1;
        setText(roleText.substring(0, s.char));

        if (s.char === roleText.length) {
          s.deleting = true;
          timeoutRef.current = setTimeout(tick, pauseTime);
          return;
        }
      } else {
        s.char -= 1;
        setText(roleText.substring(0, s.char));

        if (s.char === 0) {
          s.deleting = false;
          s.role = (s.role + 1) % roles.length;
        }
      }

      timeoutRef.current = setTimeout(tick, s.deleting ? deletingSpeed : typingSpeed);
    };

    tick();
    return () => clearTimeout(timeoutRef.current);
  }, [roles, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
