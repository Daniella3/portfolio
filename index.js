// Ensure website starts at top and handles browser differences
window.onload = function() {
  // Force scroll to top on page load
  window.scrollTo(0, 0);
  
  // Handle browser-specific quirks
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    // Safari-specific fixes
    document.documentElement.style.webkitFontSmoothing = 'antialiased';
  }
};

// --- Enhanced Matrix background for BOTH intro + main ---
// --- Enhanced Matrix background with SLOWER animation ---
function createMatrix(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  let fontSize = 16;
  let columns = 0;
  let drops = [];
  let animationId;
  let lastTime = 0;
  const frameInterval = 50; // Slower animation - higher number = slower

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(dpr, dpr);
    
    const newColumns = Math.floor(rect.width / fontSize);
    if (newColumns > columns) {
      for (let i = columns; i < newColumns; i++) {
        drops[i] = Math.floor(Math.random() * rect.height / fontSize);
      }
    } else if (newColumns < columns) {
      drops = drops.slice(0, newColumns);
    }
    columns = newColumns;
  }

  function draw(currentTime) {
    // Frame rate limiting for slower animation
    if (currentTime - lastTime < frameInterval) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    lastTime = currentTime;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px 'Courier New', monospace`;
    ctx.textBaseline = 'top';

    const heart = "♡";

    for (let i = 0; i < drops.length; i++) {
      const text = heart;
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = "#CB0034";
      ctx.fillText(text, x, y);

      if (Math.random() > 0.95) {
        ctx.fillStyle = "#000000";
        ctx.fillText(text, x, y);
      }

      drops[i]++;

      // Make the drops fall slower by reducing the frequency of reset
      if (drops[i] * fontSize > height && Math.random() > 0.99) { // Changed from 0.975 to 0.99
        drops[i] = 0;
      }
    }
    
    animationId = requestAnimationFrame(draw);
  }

  function init() {
    resizeCanvas();
    animationId = requestAnimationFrame(draw);
  }

  // Use ResizeObserver for better performance
  const resizeObserver = new ResizeObserver(entries => {
    resizeCanvas();
  });

  if (canvas.parentElement) {
    resizeObserver.observe(canvas.parentElement);
  }

  init();

  // Cleanup function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    resizeObserver.disconnect();
  };
}

// Initialize matrix backgrounds
let cleanupMatrixIntro, cleanupMatrix;

document.addEventListener('DOMContentLoaded', () => {
  cleanupMatrixIntro = createMatrix("matrixIntro");
  cleanupMatrix = createMatrix("matrix");
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (cleanupMatrixIntro) cleanupMatrixIntro();
  if (cleanupMatrix) cleanupMatrix();
});

// --- Enhanced Logo / Intro Animation ---
const text = document.getElementById("animatedText");
const logo = document.getElementById("logo");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

const fullName = "Daniella˚";
const shortName = "D˚";
const letters = "abcdefghijklmnopqrstuvwxyz";
const scrambleSpeed = 100;

if (text) text.style.fontFamily = "'Courier New', monospace";
if (logo) logo.style.fontFamily = "'Courier New', monospace";

if (logo) logo.style.visibility = "visible";

function runScramble(callback) {
  if (!text) return;
  
  let current = Array(fullName.length).fill("");
  let i = 0;

  const scrambleInterval = setInterval(() => {
    current = current.map((char, idx) =>
      idx < i ? fullName[idx] : letters[Math.floor(Math.random() * letters.length)]
    );
    text.textContent = current.join("");

    if (i < fullName.length) {
      i++;
    } else {
      clearInterval(scrambleInterval);
      setTimeout(() => {
        let j = fullName.length;
        const eraseInterval = setInterval(() => {
          text.textContent = fullName.substring(0, j);
          j--;
          if (j < 1) {
            clearInterval(eraseInterval);
            text.textContent = shortName;
            if (callback) callback();
          }
        }, 100);
      }, 1500);
    }
  }, scrambleSpeed);
}

// Enhanced intro with error handling
if (intro && mainContent && logo) {
  runScramble(() => {
    setTimeout(() => {
      // fade out intro
      intro.style.transition = "opacity 1.5s ease-in-out";
      intro.style.opacity = "0";

      // fade in mainContent + logo at the same time
      mainContent.classList.remove("opacity-0");
      mainContent.classList.add("opacity-100");

      logo.classList.remove("opacity-0");
      logo.classList.add("opacity-100");

      setTimeout(() => {
        intro.style.display = "none";
        enableHoverScramble();
      }, 1500);
    }, 700);
  });
}

// Enhanced hover scramble with touch support
function enableHoverScramble() {
  if (!logo) return;

  const handleHover = () => {
    if (logo.dataset.animating === "true") return;
    logo.dataset.animating = "true";

    let current = Array(fullName.length).fill("");
    let i = 0;

    const scrambleInterval = setInterval(() => {
      current = current.map((char, idx) =>
        idx < i ? fullName[idx] : letters[Math.floor(Math.random() * letters.length)]
      );
      logo.textContent = current.join("");

      if (i < fullName.length) i++;
      else {
        clearInterval(scrambleInterval);
        setTimeout(() => {
          let j = fullName.length;
          const eraseInterval = setInterval(() => {
            logo.textContent = fullName.substring(0, j);
            j--;
            if (j < 1) {
              clearInterval(eraseInterval);
              logo.textContent = shortName;
              logo.dataset.animating = "false";
            }
          }, 100);
        }, 1000);
      }
    }, scrambleSpeed);
  };

  // Add both mouse and touch events
  logo.addEventListener("mouseenter", handleHover);
  logo.addEventListener("touchstart", handleHover, { passive: true });
}

// Enhanced sidebar animation
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("menu-checkbox");
  const sideMenu = document.getElementById("side-menu");

  if (checkbox && sideMenu) {
    const handleMenuToggle = () => {
      if (checkbox.checked) {
        sideMenu.classList.remove("translate-x-full");
        sideMenu.classList.add("translate-x-0");
      } else {
        sideMenu.classList.remove("translate-x-0");
        sideMenu.classList.add("translate-x-full");
      }
    };

    checkbox.addEventListener("change", handleMenuToggle);

    // Close menu when clicking on links
    const menuLinks = sideMenu.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        checkbox.checked = false;
        handleMenuToggle();
      });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && checkbox.checked) {
        checkbox.checked = false;
        handleMenuToggle();
      }
    });
  }
});

// Enhanced typewriter animation
const roles = [
  "Software Engineer", 
  "Full-Stack Developer",
  "Coding Enthusiast", 
  "Problem Solver"
];

let currentRole = 0;
let currentChar = 0;
let isDeleting = false;
let typeTimeout;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1200;

const typewriter = document.getElementById("typewriter");

function type() {
  if (!typewriter) return;
  
  const role = roles[currentRole];

  if (!isDeleting) {
    typewriter.textContent = role.substring(0, currentChar + 1);
    currentChar++;

    if (currentChar === role.length) {
      isDeleting = true;
      typeTimeout = setTimeout(type, pauseTime);
      return;
    }
  } else {
    typewriter.textContent = role.substring(0, currentChar - 1);
    currentChar--;
    
    if (currentChar === 0) {
      isDeleting = false;
      currentRole = (currentRole + 1) % roles.length;
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  typeTimeout = setTimeout(type, speed);
}

// Start typewriter if element exists
if (typewriter) {
  type();
}

// Enhanced intersection observer for about section
const about = document.getElementById('about');
if (about) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          about.classList.remove('opacity-0', 'translate-y-10');
          about.classList.add('opacity-100', 'translate-y-0');
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '50px' 
    }
  );
  observer.observe(about);
}

// Enhanced card interaction
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.cards');
  if (!container) return;
  
  const cards = Array.from(container.querySelectorAll('.card'));
  let isTouchDevice = 'ontouchstart' in window;

  // Make each card keyboard-focusable
  cards.forEach(c => {
    if (!c.hasAttribute('tabindex')) {
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
    }
  });

  const clearAll = () => {
    cards.forEach(c => {
      c.classList.remove('blur-sm', 'scale-90', 'scale-105', 'z-10');
    });
  };

  cards.forEach(card => {
    const onEnter = () => {
      if (isTouchDevice) return; // Don't apply hover effects on touch devices
      
      cards.forEach(c => {
        if (c === card) {
          c.classList.add('scale-105', 'z-10');
          c.classList.remove('blur-sm', 'scale-90');
        } else {
          c.classList.add('blur-sm', 'scale-90');
          c.classList.remove('scale-105', 'z-10');
        }
      });
    };

    const onLeave = () => {
      clearAll();
    };

    // Mouse events
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    // Keyboard accessibility
    card.addEventListener('focus', onEnter);
    card.addEventListener('blur', onLeave);

    // Touch feedback
    card.addEventListener('touchstart', () => {
      card.classList.add('scale-105');
    }, { passive: true });

    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.classList.remove('scale-105');
      }, 150);
    });
  });

  container.addEventListener('mouseleave', clearAll);
});

// Enhanced experience automation 
const jobs = [
  {
    intro: true,
    title: "EXPERIENCE"
  },
  {
    title: "Software Engineer Intern",
    bullets: [
      "𖥔 Developed a full-stack multiplayer web app with real-time state synchronization, implementing socket-based communication for live interactions",
      "𖥔 Built RESTful APIs and integrated third-party services to support user authentication, media handlings, and data persistence",
      "𖥔 Created interactive UI components with dynamic state management to improve usability and responsiveness",
      "𖥔 Implemented automated testing and deployment scripts to ensure stable releases under short iteration cycles",
      "𖥔 Collaborated in small teams to translate feature requests into funcitonal prototypes, presenting weekly deliverables to stakeholders"
    ],
    location: "Washington University - St. Louis, MO",
    bg: ["JAN 2025", "- - - - -", "MAY 2025"]
  },
  {
    title: "Software Engineer Intern",
    bullets: [
      "𖥔 Automated student scheduling & biling for the Mechanical Engineering department's SLMP Makerspace, replacing manual entry",
      "𖥔 Built backend services in Node.js + SQL to track equipment reservations & usage", 
      "𖥔 Developed error-handling + job processing to ensure reliable appointment management",
      "𖥔 Delivered a system that saved staff time and eliminated repetitive paperwork"
    ],
    location: "Washington University - St. Louis, MO",
    bg: ["AUG 2024", "- - - - -", "DEC 2024"]
  },
  {
    title: "Systems Engineer",
    bullets: [
      "𖥔 Operated and maintained lighting, sound, and control systems during live productions",
      "𖥔 Engineered backstage workflows >99.9% uptime during 400+ show hours", 
      "𖥔 Improved monitoring and quick-response fixes for live technical issues", 
      "𖥔 Collaborated with production teams, balancing technical reliability and artistic needs"
    ],
    location: "Edison Theatre - St. Louis, MO",
    bg: ["DEC 2022", "- - - - -", "APR 2025"]
  }
];

let currentIndex = 0;
const card = document.getElementById("experience-card");
const bg1 = document.getElementById("bg-line-1");
const bg2 = document.getElementById("bg-line-2");
const bg3 = document.getElementById("bg-line-3");

const nal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890:/;";
let scrambleInterval = null;
const speed = 100;

function scrambleText(elements, targets) {
  return new Promise(resolve => {
    let i = 0;
    let current = targets.map(t => Array(t.length).fill(""));

    if (scrambleInterval) clearInterval(scrambleInterval);

    scrambleInterval = setInterval(() => {
      current = current.map((arr, idx) =>
        arr.map((char, j) =>
          j < i ? targets[idx][j] : nal[Math.floor(Math.random() * nal.length)]
        )
      );
      elements.forEach((el, idx) => {
        if (el) el.textContent = current[idx].join("");
      });
      
      if (i < Math.max(...targets.map(t => t.length))) {
        i++;
      } else {
        clearInterval(scrambleInterval);
        scrambleInterval = null;
        resolve();
      }
    }, speed);
  });
}

async function updateBackground(bgArray) {
  if (!bg1 || !bg2 || !bg3) return;
  
  const targets = bgArray.map(txt => (txt + " ").repeat(5));
  await scrambleText([bg1, bg2, bg3], targets);
}

function updateCard(job) {
  if (!card) return;
  
  card.classList.add("scale-75", "opacity-0", "blur-md");
  setTimeout(() => {
    if (job.intro) {
      card.innerHTML = `
        <div class="flex items-center justify-center w-full h-full bg-black text-white font-thin text-4xl md:text-5xl lg:text-7xl">
          ${job.title}
        </div>
      `;
    } else {
      const bulletHTML = job.bullets.map(b => `<p class="mb-4">${b}</p>`).join("");
      card.innerHTML = `
        <div class="head w-full h-10 bg-black border-b-4 border-black px-3 py-2 text-rose-300 font-extrabold text-lg mb-4 lg:text-2xl">
          ${job.title}
        </div>
        <div class="content font-semibold text-sm md:text-base lg:text-xl space-y-4">
          ${bulletHTML}
          <p class="italic mt-6">${job.location}</p>
        </div>
      `;
    }
    card.classList.remove("scale-75", "opacity-0", "blur-md");
  }, 500);
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateButtons() {
  if (!prevBtn || !nextBtn) return;
  
  prevBtn.classList.toggle("hidden", currentIndex === 0);
  nextBtn.classList.toggle("hidden", currentIndex === jobs.length - 1);
}

function showJob(index) {
  const job = jobs[index];
  updateCard(job);

  if (!job.intro) {
    updateBackground(job.bg);
  } else {
    if (scrambleInterval) {
      clearInterval(scrambleInterval);
      scrambleInterval = null;
    }
    if (bg1 && bg2 && bg3) {
      bg1.textContent = "";
      bg2.textContent = "";
      bg3.textContent = "";
    }
  }

  updateButtons();
}

// Add event listeners with checks
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < jobs.length - 1) {
      currentIndex++;
      showJob(currentIndex);
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showJob(currentIndex);
    }
  });
}

// Keyboard navigation for experience section
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    showJob(currentIndex);
  } else if (e.key === 'ArrowRight' && currentIndex < jobs.length - 1) {
    currentIndex++;
    showJob(currentIndex);
  }
});

// Initialize if elements exist
if (card) {
  showJob(currentIndex);
}

// Enhanced project section with throttling
document.addEventListener("DOMContentLoaded", () => {
  const projectIntro = document.getElementById("project-intro");
  const projectSection = document.getElementById("project");

  if (!projectIntro || !projectSection) return;

  let ticking = false;

  const updateOpacity = () => {
    const sectionTop = projectSection.offsetTop;
    const sectionHeight = projectSection.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight / 2;

    const progress = (scrollY - sectionTop) / sectionHeight;
    const fade = Math.min(Math.max(1 - progress * 2, 0), 1);

    projectIntro.style.opacity = fade;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateOpacity);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
});

// Enhanced contact animation 
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("contact-title");
  const contactSection = document.getElementById("contact");

  if (!title || !contactSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.classList.remove("opacity-0");
          title.classList.add("animate-reveal");
        } else {
          title.classList.remove("animate-reveal");
          title.classList.add("opacity-0");
        }
      });
    },
    { 
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  observer.observe(contactSection);
});

// Enhanced responsive font sizing
function updateResponsiveText() {
  const elements = document.querySelectorAll('.text-responsive, .text-responsive-sm');
  elements.forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    const fontSize = parseFloat(computedStyle.fontSize);
    const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize * 1.2;
    
    // Ensure readable line height on mobile
    if (window.innerWidth < 768) {
      el.style.lineHeight = Math.max(lineHeight, fontSize * 1.4) + 'px';
    }
  });
}

window.addEventListener('resize', updateResponsiveText);
window.addEventListener('load', updateResponsiveText);

// Prevent horizontal scroll on mobile
function preventHorizontalScroll() {
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
}

preventHorizontalScroll();
window.addEventListener('resize', preventHorizontalScroll);

function fitContactText() {
  const container = document.querySelector('.contact-scale');
  const h1 = container.querySelector('h1');
  const scale = container.offsetWidth / h1.scrollWidth;
  h1.style.setProperty('--scale', scale);
}

window.addEventListener('resize', fitContactText);
window.addEventListener('load', fitContactText);
