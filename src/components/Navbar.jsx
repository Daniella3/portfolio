import { useEffect, useState } from "react";
import ScrambleLogo from "./ScrambleLogo";

export default function Navbar({ logoEnabled }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/10 px-6 py-3 z-50">
      <div className={`opacity-100 transition-all duration-2000 ease-in-out ${logoEnabled ? "opacity-100" : "opacity-0"}`}>
        <ScrambleLogo enabled={logoEnabled} />
      </div>

      <div className="relative">
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-2 w-8 cursor-pointer relative z-30"
        >
          <div className={`rounded-2xl h-[3px] w-1/2 bg-black duration-500 origin-right ${open ? "rotate-[225deg] -translate-x-[12px] -translate-y-[1px]" : ""}`} />
          <div className={`rounded-2xl h-[3px] w-full bg-black duration-500 ${open ? "-rotate-45" : ""}`} />
          <div className={`rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end origin-left ${open ? "rotate-[225deg] translate-x-[12px] translate-y-[1px]" : ""}`} />
        </button>

        <div className={`fixed top-20 right-0 w-1/3 transform duration-500 ease-in-out z-20 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <ul className="flex flex-col items-center justify-center h-screen p-6 gap-24 sm:text-sm md:text-2xl lg:text-4xl font-mono font-thin text-black-200 bg-white">
            <li><a onClick={close} href="#about" className="hover:text-rose-300">About<span className="text-pink-400">¹</span></a></li>
            <li><a onClick={close} href="#experience" className="hover:text-rose-300">Experience<span className="text-pink-400">²</span></a></li>
            <li><a onClick={close} href="#project" className="hover:text-rose-300">Projects<span className="text-pink-400">³</span></a></li>
            <li><a onClick={close} href="#contact" className="hover:text-rose-300">Contact<span className="text-pink-400">⁴</span></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
