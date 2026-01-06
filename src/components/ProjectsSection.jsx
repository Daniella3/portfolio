import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const introOpacity = useScrollFade(sectionRef, { multiplier: 2 });

  return (
    <section id="project" ref={sectionRef} className="relative sm:p-8 md:p-12 lg:p-20 m-10 bg-white rounded-2xl">
      <div id="project-intro" className="mb-16" style={{ opacity: introOpacity }}>
        <img
          src="/images/project_2.png"
          alt="Project Intro"
          className="mx-auto w-full mt-[-30px] opacity-100 transition-opacity duration-700"
        />
      </div>

      <ul className="space-y-8 lg:space-y-12">
        <li className="bg-pink-100 border border-white/20 rounded-2xl shadow-lg sticky top-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 p-6 lg:p-12">
            <div className="flex-1">
              <h3 className="font-bold text-lg lg:text-2xl text-rose-300 mb-6">
                Book Discovery &amp; Tracking App
              </h3>
              <ul className="space-y-4 text-black font-bold mb-8">
                <li>𖥔 Built a book discovery hub where readers can search, explore, and get tailored recommendations.</li>
                <li>𖥔 Designed personal reading lists so users can add books, track progress, and revisit favorites.</li>
                <li>𖥔 Made the experience engaging with smart suggestions, interactive browsing, and easy list management.</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <div className="comic-button">• Google API</div>
                <div className="comic-button">• MySQL</div>
                <div className="comic-button">• React</div>
                <div className="comic-button">• HTML/CSS/JS</div>
              </div>
            </div>

            <figure className="flex-shrink-0 w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px]">
              <img src="/images/book.svg" alt="book_icon" className="w-full h-auto" />
            </figure>
          </div>
        </li>

        <li className="bg-pink-100 border border-white/20 rounded-2xl shadow-lg sticky top-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 p-6 lg:p-12">
            <div className="flex-1">
              <h3 className="font-bold text-lg lg:text-2xl text-rose-300 mb-6">
                Spotify Virtual Hangout Web App
              </h3>
              <ul className="space-y-4 text-black font-bold mb-8">
                <li>𖥔 Created a virtual hangout where friends can chat, share music, and vibe together in real time.</li>
                <li>𖥔 Designed interactive rooms with collaborative playlists and a host-powered "DJ mode."</li>
                <li>𖥔 Brought the experience to life with live chat, emojis, and responsive design for any device.</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <div className="comic-button">• Spotify API</div>
                <div className="comic-button">• Fast API</div>
                <div className="comic-button">• React</div>
                <div className="comic-button">• Python</div>
                <div className="comic-button">• HTML/CSS/JS</div>
              </div>
            </div>

            <figure className="flex-shrink-0 w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px]">
              <img src="/images/chat.svg" alt="chat_icon" className="w-full h-auto" />
            </figure>
          </div>
        </li>

        <li className="bg-pink-100 border border-white/20 rounded-2xl shadow-lg sticky top-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 p-6 lg:p-12">
            <div className="flex-1">
              <h3 className="font-bold text-lg lg:text-2xl text-rose-300 mb-6">
                Deconstructed Culinary
              </h3>
              <ul className="space-y-4 text-black font-bold mb-8">
                <li>𖥔 Built a custom API to serve structured data on Michelin-starred dishes, including ingredient lists, origins, and cultural histories.</li>
                <li>𖥔 Users can query the API to explore dish origins, ingredient backgrounds, and plating visuals.</li>
                <li>𖥔 Designed endpoints to support advanced features like flavor-pairing suggestions, seasonal availability, or AI-driven recommendations.</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <div className="comic-button">• React</div>
                <div className="comic-button">• Next.js</div>
                <div className="comic-button">• Tailwind CSS</div>
                <div className="comic-button">• Node.js</div>
                <div className="comic-button">• AWS</div>
                <div className="comic-button">• PostgreSQL</div>
              </div>
            </div>

            <figure className="flex-shrink-0 w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px]">
              <img src="/images/food.svg" alt="food_icon" className="w-full h-auto" />
            </figure>
          </div>
        </li>
      </ul>
    </section>
  );
}
