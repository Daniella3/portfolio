import { useTypewriter } from "../hooks/useTypewriter";
import { useMemo } from "react";
import pic from "../assets/pic.png";

export default function IntroHero() {
  const roles = useMemo(() => ["Software Engineer", "Full-Stack Developer", "Coding Enthusiast", "Problem Solver"], []);  
  const typed = useTypewriter({roles});  

  return (
    <section className="intro relative w-full h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-32 bg-pink-200 dark:bg-[#470D29]">
      <div className="flex flex-col items-center md:items-start space-y-8 md:space-y-12 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight dark:text-rose-200">
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
          className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-full border-4 border-black dark:border-rose-200 shadow-[12px_12px_0px_#000] dark:shadow-[12px_12px_0px_#FECDD3]"
        />
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6">
        <a href="https://www.linkedin.com/in/daniellaovbude/" target="_blank" rel="noopener noreferrer"
           className="p-3 bg-white dark:bg-black border-4 border-black dark:border-rose-200 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FECDD3] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#FECDD3] transition-all duration-200">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-black dark:text-white"
            fill="currentColor"
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M 1.48 29.91 h 18.657 v 60.01 H 1.48 V 29.91 z M 10.809 0.08 c 5.963 0 10.809 4.846 10.809 10.819 c 0 5.967 -4.846 -10.809 10.813 C 4.832 21.712 0 16.866 0 10.899 C 0 4.926 4.832 0.08 10.809 0.08" />
              <path d="M 31.835 29.91 h 17.89 v 8.206 h 0.255 c 2.49 -4.72 8.576 -9.692 17.647 -9.692 C 86.514 28.424 90 40.849 90 57.007 V 89.92 H 71.357 V 60.737 c 0 -6.961 -0.121 -15.912 -9.692 -15.912 c -9.706 0 -11.187 7.587 -11.187 15.412 V 89.92 H 31.835 V 29.91 z" />
            </g>
          </svg>
        </a>

        <a href="https://github.com/Daniella3" target="_blank" rel="noopener noreferrer"
           className="p-3 bg-white dark:bg-black border-4 border-black dark:border-rose-200 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FECDD3] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#FECDD3] transition-all duration-200">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-black dark:text-white"
            fill="currentColor"
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M 5.46 63.31 c 0 0 3.998 1.875 6.773 8.925 c 0 0 3.581 10.887 20.55 7.197 c 0.017 3.237 0.046 6.354 0.064 8.571 C 32.857 89.112 33.758 90 34.867 90 h 26.238 c 1.11 0 2.012 -0.89 2.019 -2 c 0.02 -3.124 0.056 -8.131 0.056 -13.951 c 0 -5.691 -1.949 -9.403 -4.137 -11.296 c 13.583 -1.51 27.853 -6.668 27.853 -30.097 c 0 -6.659 -2.366 -12.101 -6.278 -16.373 c 0.633 -1.537 2.722 -7.741 -0.599 -16.143 c 0 0 -5.115 -1.638 -16.757 6.253 c -4.875 -1.352 -10.097 -2.029 -15.281 -2.053 C 42.798 4.365 37.58 5.043 32.714 6.394 C 21.058 -1.497 15.936 0.141 15.936 0.141 c -3.312 8.402 -1.224 14.606 -0.591 16.143 c -3.902 4.272 -6.286 9.713 -6.286 16.373 c 0 23.372 14.243 28.603 27.792 30.145 c -1.745 1.523 -3.325 4.215 -3.873 8.157 c -3.481 1.559 -12.311 4.254 -17.751 -5.07 c 0 0 -3.226 -5.856 -9.35 -6.287 C 5.877 59.602 -0.075 59.524 5.46 63.31 z" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            </g>
          </svg>

        </a>

        <a href="mailto:daniella.ovbude@gmail.com" rel="noopener noreferrer"
           className="p-3 bg-white dark:bg-black border-4 border-black dark:border-rose-200 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FECDD3] rounded-full hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#FECDD3] transition-all duration-200">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-black dark:text-white"
            fill="currentColor"
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
          >
             <g>
              <path d="M 86.17 11.255 H 3.83 c -2.115 0 -3.83 1.715 -3.83 3.83 v 59.83 c 0 2.115 1.715 3.83 3.83 3.83 h 82.34 c 2.115 0 3.83 -1.715 3.83 -3.83 v -59.83 C 90 12.97 88.285 11.255 86.17 11.255 z M 84.55 69.598 c 0 1.739 -1.498 3.149 -3.346 3.149 h -3.792 V 26.717 L 45.016 54.692 L 12.843 26.91 v 45.836 H 9.051 c -1.848 0 -3.346 -1.41 -3.346 -3.149 V 20.403 c 0 -1.739 1.498 -3.149 3.346 -3.149 h 1.535 h 2.209 h 0.048 v 0.041 l 32.173 27.782 l 32.221 -27.823 h 2.209 l 0 0 h 1.757 c 1.848 0 3.346 1.41 3.346 3.149 V 69.598 z" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            </g>
          </svg>
        </a>
      </div>
    </section>
  );
}
