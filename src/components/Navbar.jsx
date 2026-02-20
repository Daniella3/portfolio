import { useEffect, useState } from "react";
import ScrambleLogo from "./ScrambleLogo";

export default function Navbar({ logoEnabled }) {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);
  const handleToggle = (e) => {
    const enabled = e.target.checked;
    setIsDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 z-50 bg-white/80 backdrop-blur-md border-b border-black/10 dark:bg-black/80 dark:border-white/10 transition-colors duration-300">
      <div className={`opacity-100 transition-all duration-2000 ease-in-out ${logoEnabled ? "opacity-100" : "opacity-0"}`}>
        <ScrambleLogo enabled={logoEnabled} />
      </div>

      <div className="relative flex items-center gap-6">
        <label aria-label="Display mode toggle" className="relative inline-block cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isDark} onChange={handleToggle}/>
          <div className="relative w-[68px] h-[40px] rounded-full bg-rose-100 border-2 border-black transition-all duration-300 ease-in-out peer-checked:bg-black/10 peer-checked:border-rose-100 after:content-[''] after:absolute after:top-1 after:left-1 after:w-[28px] after:h-[28px] after:rounded-full after:bg-black after:transition-all after:duration-500 after:ease-in-out peer-checked:after:translate-x-[27px] peer-checked:after:bg-rose-100"/>
        </label>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-2 w-8 cursor-pointer relative z-50"
        >
          <div className={`rounded-2xl h-[3px] w-1/2 bg-black dark:bg-rose-200 duration-500 origin-right ${open ? "rotate-[225deg] -translate-x-[12px] -translate-y-[1px]" : ""}`} />
          <div className={`rounded-2xl h-[3px] w-full bg-black dark:bg-rose-200 duration-500 ${open ? "-rotate-45" : ""}`} />
          <div className={`rounded-2xl h-[3px] w-1/2 bg-black dark:bg-rose-200 duration-500 place-self-end origin-left ${open ? "rotate-[225deg] translate-x-[12px] translate-y-[1px]" : ""}`} />
        </button>

        <div className={`fixed top-0 right-0 w-1/3 transform duration-500 ease-in-out z-20 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <ul className="flex flex-col items-center justify-center h-screen p-6 gap-24 sm:text-md md:text-2xl lg:text-4xl font-mono font-thin text-black bg-white dark:text-white dark:bg-black">
            <li><a onClick={close} href="#about" className="hover:text-rose-300">About<span className="text-pink-400 dark:text-rose-500">¹</span></a></li>
            <li><a onClick={close} href="#experience" className="hover:text-rose-300">Experience<span className="text-pink-400 dark:text-rose-500">²</span></a></li>
            <li><a onClick={close} href="#project" className="hover:text-rose-300">Projects<span className="text-pink-400 dark:text-rose-500">³</span></a></li>
            <li><a onClick={close} href="#contact" className="hover:text-rose-300">Contact<span className="text-pink-400 dark:text-rose-500">⁴</span></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
