import { useTypewriter } from "../hooks/useTypewriter";
import { useMemo } from "react";
import pic from "../assets/pic.png";
import linkedin from "../assets/linkedin.png";
import handshake from "../assets/handshake.jpg";
import github from "../assets/github.png";
import gmail from "../assets/gmail.png";


export default function IntroHero() {
  const roles = useMemo(() => ["Software Engineer", "Full-Stack Developer", "Coding Enthusiast", "Problem Solver"], []);  
  const typed = useTypewriter({roles});  

  return (
    <section className="intro w-full h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-32 bg-pink-200 relative">
      <div className="flex flex-col items-center md:items-start space-y-8 md:space-y-12 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
          Daniella <br /> Ovbude
        </h1>
        <span className="mt-6 text-2xl md:text-4xl border-r-2 border-black pr-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold inline-block">
          {typed}
        </span>
      </div>

      <div className="mt-10 md:mt-0 flex justify-center md:justify-end">
        <img
          src={pic}
          alt="Daniella"
          className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-full border-4 border-black shadow-[12px_12px_0px_#000]"
        />
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6">
        <a href="https://www.linkedin.com/in/daniellaovbude/" target="_blank" rel="noopener noreferrer"
           className="p-3 bg-white border-4 border-black shadow-[4px_4px_0px_#000] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200">
          <img src={linkedin} alt="LinkedIn" className="w-6 h-6 min-w-[24px] min-h-[24px] sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain" />
        </a>

        <a href="https://wustl.joinhandshake.com/profiles/daniellaovbude" target="_blank" rel="noopener noreferrer"
           className="p-3 bg-white border-4 border-black shadow-[4px_4px_0px_#000] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200">
          <img src={handshake} alt="Handshake" className="w-6 h-6 min-w-[24px] min-h-[24px] sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain" />
        </a>

        <a href="https://github.com/Daniella3" target="_blank" rel="noopener noreferrer"
           className="p-3 bg-white border-4 border-black shadow-[4px_4px_0px_#000] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200">
          <img src={github} alt="Github" className="w-6 h-6 min-w-[24px] min-h-[24px] sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain" />
        </a>

        <a href="mailto:daniella.ovbude@gmail.com" rel="noopener noreferrer"
           className="p-3 bg-white border-4 border-black shadow-[4px_4px_0px_#000] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200">
          <img src={gmail} alt="Gmail" className="w-6 h-6 min-w-[24px] min-h-[24px] sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain" />
        </a>
      </div>
    </section>
  );
}
