import { useEffect, useMemo, useRef, useState } from "react";

export default function ExperienceSection() {
  const jobs = useMemo(
    () => [
      { intro: true, title: "EXPERIENCE" },
      {
        title: "Software Engineer Intern",
        bullets: [
          "𖥔 Developed a full-stack multiplayer web app with real-time state synchronization, implementing socket-based communication for live interactions",
          "𖥔 Built RESTful APIs and integrated third-party services to support user authentication, media handlings, and data persistence",
          "𖥔 Created interactive UI components with dynamic state management to improve usability and responsiveness",
          "𖥔 Implemented automated testing and deployment scripts to ensure stable releases under short iteration cycles",
          "𖥔 Collaborated in small teams to translate feature requests into funcitonal prototypes, presenting weekly deliverables to stakeholders",
        ],
        location: "Washington University - St. Louis, MO",
        bg: ["JAN 2025", "- - - - -", "MAY 2025"],
      },
      {
        title: "Software Engineer Intern",
        bullets: [
          "𖥔 Automated student scheduling & biling for the Mechanical Engineering department's SLMP Makerspace, replacing manual entry",
          "𖥔 Built backend services in Node.js + SQL to track equipment reservations & usage",
          "𖥔 Developed error-handling + job processing to ensure reliable appointment management",
          "𖥔 Delivered a system that saved staff time and eliminated repetitive paperwork",
        ],
        location: "Washington University - St. Louis, MO",
        bg: ["AUG 2024", "- - - - -", "DEC 2024"],
      },
      {
        title: "Systems Engineer",
        bullets: [
          "𖥔 Operated and maintained lighting, sound, and control systems during live productions",
          "𖥔 Engineered backstage workflows >99.9% uptime during 400+ show hours",
          "𖥔 Improved monitoring and quick-response fixes for live technical issues",
          "𖥔 Collaborated with production teams, balancing technical reliability and artistic needs",
        ],
        location: "Edison Theatre - St. Louis, MO",
        bg: ["DEC 2022", "- - - - -", "APR 2025"],
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const job = jobs[currentIndex];

  const [cardAnimating, setCardAnimating] = useState(false);

  const nal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/;";
  const speed = 100;

  const [bg1, setBg1] = useState("");
  const [bg2, setBg2] = useState("");
  const [bg3, setBg3] = useState("");

  const scrambleIntervalRef = useRef(null);

  const clearScramble = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
  };

  const scrambleText = (targets, setters) => {
    return new Promise((resolve) => {
      let i = 0;
      let current = targets.map((t) => Array(t.length).fill(""));

      clearScramble();

      scrambleIntervalRef.current = setInterval(() => {
        current = current.map((arr, idx) =>
          arr.map((_, j) => (j < i ? targets[idx][j] : nal[Math.floor(Math.random() * nal.length)]))
        );

        setters[0](current[0].join(""));
        setters[1](current[1].join(""));
        setters[2](current[2].join(""));

        if (i < Math.max(...targets.map((t) => t.length))) i++;
        else {
          clearScramble();
          resolve();
        }
      }, speed);
    });
  };

  const updateBackground = async (bgArray) => {
    const targets = bgArray.map((txt) => (txt + " ").repeat(5));
    await scrambleText(targets, [setBg1, setBg2, setBg3]);
  };

  const showJob = async (index) => {
    setCardAnimating(true);

    setTimeout(async () => {
      const next = jobs[index];

      if (!next.intro) {
        updateBackground(next.bg);
      } else {
        clearScramble();
        setBg1("");
        setBg2("");
        setBg3("");
      }

      setCurrentIndex(index);

      setTimeout(() => setCardAnimating(false), 0);
    }, 500);
  };

  useEffect(() => {
    if (!job.intro && job.bg) updateBackground(job.bg);
    return () => clearScramble();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) showJob(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < jobs.length - 1) showJob(currentIndex + 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, jobs.length]);

  const prevHidden = currentIndex === 0;
  const nextHidden = currentIndex === jobs.length - 1;

  return (
    <section id="experience" className="relative bg-black min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 text-pink-200 opacity-20 overflow-hidden flex flex-col justify-between">
        <div className="marquee-row flex whitespace-nowrap animate-left -translate-y-[8vh]">
          <span className="text-[26vh] font-extrabold mr-16">{bg1}</span>
        </div>
        <div className="marquee-row flex whitespace-nowrap animate-right -translate-y-[8vh]">
          <span className="text-[26vh] font-extrabold tracking-[3rem] mr-16">{bg2}</span>
        </div>
        <div className="marquee-row flex whitespace-nowrap animate-left -translate-y-[8vh]">
          <span className="text-[26vh] font-extrabold mr-16">{bg3}</span>
        </div>
      </div>

      <div
        className={[
          "relative z-10 h-1/2 w-[90%] sm:w-[60%] md:w-2/3 lg:w-1/2 mx-auto bg-pink-200 border-4 border-black shadow-[12px_12px_0px_#fff] p-8 transition-all duration-500",
          cardAnimating ? "scale-75 opacity-0 blur-md" : "",
        ].join(" ")}
      >
        {job.intro ? (
          <div className="flex items-center justify-center w-full h-full bg-black text-white font-thin text-4xl md:text-5xl lg:text-7xl">
            {job.title}
          </div>
        ) : (
          <>
            <div className="head w-full h-10 bg-black border-b-4 border-black px-3 py-2 text-rose-300 font-extrabold text-md mb-4 lg:text-2xl">
              {job.title}
            </div>
            <div className="content font-semibold text-sm md:text-base lg:text-xl space-y-4">
              {job.bullets.map((b, idx) => (
                <p key={idx} className="mb-4">
                  {b}
                </p>
              ))}
              <p className="italic mt-6">{job.location}</p>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => currentIndex > 0 && showJob(currentIndex - 1)}
        className={`absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer duration-200 hover:scale-125 active:scale-100 ${prevHidden ? "hidden" : ""}`}
        aria-label="Previous experience"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="120px" height="120px" viewBox="0 0 24 24" className="stroke-pink-300">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
        </svg>
      </button>

      <button
        onClick={() => currentIndex < jobs.length - 1 && showJob(currentIndex + 1)}
        className={`absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer duration-200 hover:scale-125 active:scale-100 ${nextHidden ? "hidden" : ""}`}
        aria-label="Next experience"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="120px" height="120px" viewBox="0 0 24 24" className="stroke-pink-300">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M13 6l6 6m0 0l-6 6m6-6H5"></path>
        </svg>
      </button>
    </section>
  );
}
