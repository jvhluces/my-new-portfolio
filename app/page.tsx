"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Server, Link2Icon, Database, Mail, MapPin, Phone, Send, Download, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";

/* ---------- Shared animation config ---------- */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* Navbar: logo + menu appear first, one after another */
const navParent: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.09, delayChildren: 0.15 } },
};
const navChild: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const NAV_ITEMS = [
  { name: "HOME", id: "home" },
  { name: "PROJECTS", id: "projects" },
  { name: "SERVICES", id: "services" },
  { name: "ABOUT", id: "about" },
  { name: "CONTACT", id: "contact" },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";
const LINKEDIN_ICON = "https://cdn-icons-png.flaticon.com/512/174/174857.png";

/* invert = logo is black by default, so flip it to show on the dark theme */
const TECHS = [
  { name: "PHP", icon: `${DEVICON}/php/php-original.svg` },
  { name: "Python", icon: `${DEVICON}/python/python-original.svg` },
  { name: "Node.js", icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "C++", icon: `${DEVICON}/cplusplus/cplusplus-original.svg` },
  { name: "C#", icon: `${DEVICON}/csharp/csharp-original.svg` },
  { name: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "HTML5", icon: `${DEVICON}/html5/html5-original.svg` },
  { name: "CSS3", icon: `${DEVICON}/css3/css3-original.svg` },
  { name: "Tailwind CSS", icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: "MySQL", icon: `${DEVICON}/mysql/mysql-original.svg` },
  { name: "FastAPI", icon: `${DEVICON}/fastapi/fastapi-original.svg` },
  { name: "Git", icon: `${DEVICON}/git/git-original.svg` },
  { name: "GitHub", icon: `${DEVICON}/github/github-original.svg`, invert: true },
];

const SOCIALS = [
  { 
    name: "GitHub", 
    url: "https://github.com/jvhluces", 
    icon: `${DEVICON}/github/github-original.svg`,
    invert: true
  },
  { 
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/janine-luces-494637423", 
    icon: LINKEDIN_ICON,
    invert: true  // ✅ gagana pa rin para maging puti
  },
  { 
    name: "Facebook", 
    url: "https://web.facebook.com/jvhnine", 
    icon: `${SI}/facebook`,
    invert: true
  },
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/jvh_ninn/", 
    icon: `${SI}/instagram`,
    invert: true
  },
];

const ROLES = ["Aspiring Backend Developer", "API Builder", "Database Designer"];

/* ---------- Hero intro timeline (seconds) ---------- */
const T = {
  welcome: 0.8,   // "WELCOME TO MY PORTFOLIO"
  name: 1.5,      // "Hi, I'm Janine"
  card: 2.0,      // ID card drops in
  typing: 3.0,    // typewriter starts
  sway: 3.2,      // card starts swinging / floating
};

/* ---------- Typewriter ---------- */
function Typewriter({
  words,
  active,
  onWordComplete,
}: {
  words: string[];
  active: boolean;
  onWordComplete?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const [pulse, setPulse] = useState(0);
  const controls = useAnimation();
  const cb = useRef(onWordComplete);
  cb.current = onWordComplete;

  const current = words[index];

  useEffect(() => {
    if (!active) return;
    let t: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
      } else {
        setPhase("holding");
        setPulse((p) => p + 1);
        cb.current?.(index);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), 1900);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), 55);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [active, phase, text, current, index, words]);

  /* "done" moment: slight grow + shine when a word is fully typed */
  useEffect(() => {
    if (pulse === 0) return;
    controls.start({
      scale: [1, 1.07, 1],
      textShadow: [
        "0 0 0px rgba(245,240,230,0)",
        "0 0 20px rgba(245,240,230,0.75)",
        "0 0 0px rgba(245,240,230,0)",
      ],
      transition: { duration: 0.95, ease: "easeInOut" },
    });
  }, [pulse, controls]);

  /* progress 0 → 1: drives blur / size / opacity while typing AND erasing */
  const p = current.length ? text.length / current.length : 0;

  return (
    <span className="inline-flex items-center">
      <motion.span animate={controls} className="inline-block origin-center lg:origin-left">
        <span
          className="inline-block origin-center lg:origin-left"
          style={{
            filter: `blur(${((1 - p) * 4).toFixed(2)}px)`,
            transform: `scale(${(0.94 + 0.06 * p).toFixed(3)})`,
            opacity: 0.55 + 0.45 * p,
            transition: "filter 140ms linear, transform 140ms linear, opacity 140ms linear",
          }}
        >
          {text}
        </span>
      </motion.span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="ml-1 inline-block w-[2px] h-[1em] bg-[#E8DFD0]"
      />
    </span>
  );
}

/* ---------- Background: faint drifting code + dot grid ---------- */
const GLYPHS = ["{ }", "</>", "01", "=>", "def", "SELECT", "()", "[]", "php", "&&", "fn", "0x", "git", "::"];

function CodeBackdrop({ reduce }: { reduce: boolean | null }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(245,240,230,0.07) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "34px 34px"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {GLYPHS.map((g, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-xs sm:text-sm text-[#F5F0E6]"
          style={{ left: `${(i * 37 + 8) % 96}%`, top: `${(i * 53 + 10) % 92}%`, opacity: 0.05 }}
          animate={reduce ? undefined : { y: [0, -90, 0], x: [0, i % 2 ? 14 : -14, 0], opacity: [0.03, 0.1, 0.03] }}
          transition={{ duration: 20 + (i % 5) * 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          {g}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- Small helpers ---------- */
function SectionHeader({ eyebrow, first, second, text }: { eyebrow: string; first: string; second: string; text?: string }) {
  return (
    <motion.div variants={fadeUp}>
      <p className="text-[#E8DFD0] font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">{eyebrow}</p>
      <h2 className="text-4xl lg:text-5xl font-extrabold mt-2 tracking-tight">
        {first}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F0E6] to-[#E8DFD0]">{second}</span>
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="mt-4 h-[2px] w-20 origin-left bg-gradient-to-r from-[#F5F0E6] to-transparent"
      />
      {text && <p className="text-[#D8D0C0] text-base mt-4 max-w-xl leading-relaxed">{text}</p>}
    </motion.div>
  );
}

function TechTile({ name, icon, invert, index }: { name: string; icon: string; invert?: boolean; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.85 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
      }}
      whileHover={{ y: -8, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#2A2A2A] bg-[#222222]/70 px-3 py-5 hover:border-[#F5F0E6]/60 hover:bg-[#F5F0E6]/[0.06] hover:shadow-[0_0_25px_rgba(245,240,230,0.18)] transition-colors"
    >
      <motion.img
        src={icon}
        alt={`${name} logo`}
        loading="lazy"
        draggable={false}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3 + (index % 4) * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        className={`h-10 w-10 sm:h-12 sm:w-12 object-contain select-none ${invert ? "invert" : ""}`}
      />
      <span className="text-[11px] font-semibold text-[#B8B0A0] group-hover:text-[#F5F0E6] transition-colors text-center">
        {name}
      </span>
    </motion.div>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [sending, setSending] = useState(false);

  /* hero choreography state */
  const [typing, setTyping] = useState(false);
  const [swayOn, setSwayOn] = useState(false);
  const [firstWordDone, setFirstWordDone] = useState(false);
  const [flash, setFlash] = useState(0);
  const [cardHover, setCardHover] = useState(false);

  const reduce = useReducedMotion();

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  /* ID card lags behind the page while scrolling → feels deeper */
  const cardParallax = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 140]);

  useEffect(() => {
    const t1 = setTimeout(() => setTyping(true), T.typing * 1000);
    const t2 = setTimeout(() => setSwayOn(true), T.sway * 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* smooth scroll + active section tracking */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      document.documentElement.style.scrollBehavior = "";
      observer.disconnect();
    };
  }, []);

  const goTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleWordComplete = () => {
    setFirstWordDone(true);
    setFlash((f) => f + 1);
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    emailjs
      .sendForm("service_i7xjfi2", "template_p8vq8x7", form, "ciZdJ5tqPfrv_iG8m")
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Failed to send message. Please try again.");
      })
      .finally(() => setSending(false));
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/90 border border-[#2A2A2A] text-[#F5F0E6] placeholder-[#888888] focus:outline-none focus:border-[#F5F0E6] focus:ring-1 focus:ring-[#F5F0E6] transition-all";

  /* card motion: sway + float, or lift when hovered */
  const swing = swayOn && !cardHover && !reduce;
  const cardAnimate = cardHover
    ? { rotate: 0, y: -12, scale: 1.03 }
    : swing
    ? { rotate: [0, 3.5, -3.5, 2.5, -2.5, 0], y: [0, -10, 0], scale: 1 }
    : { rotate: 0, y: 0, scale: 1 };
  const cardTransition = swing
    ? {
        rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" as const },
        y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" as const },
        scale: { duration: 0.4 },
      }
    : { type: "spring" as const, stiffness: 140, damping: 16 };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0F0F0F] text-[#F5F0E6] selection:bg-[#E8DFD0] selection:text-[#0F0F0F] pt-20">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#E8DFD0] to-[#F5F0E6]"
      />

      {/* Background: glow blobs + faint code / dots */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#F5F0E6]/[0.05] blur-3xl"
        />
        <motion.div
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full bg-[#E8DFD0]/[0.04] blur-3xl"
        />
      </div>
      <CodeBackdrop reduce={reduce} />

      {/* NAVIGATION BAR — appears first */}
      <motion.nav
        variants={navParent}
        initial="hidden"
        animate="show"
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#2A2A2A]/60 px-6 md:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a variants={navChild} href="#home" className="text-xl font-extrabold text-[#F5F0E6] tracking-wider">
            Jah<span className="text-[#E8DFD0]">.</span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {NAV_ITEMS.filter((i) => i.id !== "contact").map((item) => (
              <motion.a
                key={item.id}
                variants={navChild}
                href={`#${item.id}`}
                className={`group relative py-1 transition-colors ${
                  active === item.id ? "text-[#F5F0E6]" : "text-[#E8DFD0]/70 hover:text-[#F5F0E6]"
                }`}
              >
                {item.name}
                {/* hover line: grows from the center to both ends */}
                <span className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-center scale-x-0 bg-[#F5F0E6]/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#F5F0E6]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <motion.div variants={navChild} className="hidden md:block">
            {/* "Hire Me" gives a faint flash every few seconds */}
            <motion.a
              href="#contact"
              initial={{ boxShadow: "0 0 15px rgba(245,240,230,0.2)" }}
              animate={
                reduce
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 15px rgba(245,240,230,0.2)",
                        "0 0 30px rgba(245,240,230,0.6)",
                        "0 0 15px rgba(245,240,230,0.2)",
                      ],
                    }
              }
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut", delay: 5 }}
              whileHover={{ y: -2, scale: 1.06, boxShadow: "0 0 30px rgba(245,240,230,0.55)" }}
              whileTap={{ scale: 0.94, y: 0 }}
              className="inline-block px-5 py-2 text-xs font-bold rounded-full bg-[#F5F0E6] text-[#0F0F0F] hover:bg-[#FAF6EF] transition-colors"
            >
              Hire Me
            </motion.a>
          </motion.div>

          <motion.button
            variants={navChild}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#F5F0E6] focus:outline-none p-1"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <AnimatePresence mode="wait" initial={false}>
                <motion.path
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </AnimatePresence>
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="md:hidden overflow-hidden bg-[#0A0A0A]/95 border border-[#2A2A2A] px-6 mt-4 rounded-2xl shadow-2xl"
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="flex flex-col space-y-2 py-5 text-base font-semibold text-[#E8DFD0]"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                    onClick={() => goTo(item.id)}
                    className={`text-left py-2 border-b border-[#222222]/60 transition-colors hover:text-[#F5F0E6] ${
                      active === item.id ? "text-[#F5F0E6]" : ""
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 scroll-mt-20"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Profile ID card */}
          <div className="order-1 lg:order-2 relative flex justify-center w-full py-10">
            {/* parallax layer: scrolls slower than the page */}
            <motion.div style={{ y: cardParallax }} className="relative z-10">
              {/* entrance layer: drops in from the top */}
              <motion.div
                initial={{ y: -160, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  y: { type: "spring", stiffness: 80, damping: 11, delay: T.card },
                  opacity: { duration: 0.5, delay: T.card },
                }}
                className="relative"
              >
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-[#666666] to-[#E8DFD0]/80 pointer-events-none" />

                {/* sway + float layer */}
                <motion.div
                  animate={cardAnimate}
                  transition={cardTransition}
                  onHoverStart={() => setCardHover(true)}
                  onHoverEnd={() => setCardHover(false)}
                  className="relative w-64 sm:w-72 lg:w-80 origin-top cursor-pointer"
                >
                  {/* glow: stronger on hover */}
                  <motion.div
                    aria-hidden
                    animate={{ opacity: cardHover ? 0.85 : 0.35 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[#F5F0E6]/25 blur-3xl"
                  />
                  {/* glow: flashes each time a word finishes typing, then fades back */}
                  <motion.div
                    key={flash}
                    aria-hidden
                    initial={{ opacity: flash === 0 ? 0 : 0.9 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[#F5F0E6]/40 blur-3xl"
                  />

                  <div className="relative overflow-visible rounded-[1.65rem] border border-[#F5F0E6]/70 bg-[#1A1A1A] p-3.5 shadow-[0_25px_80px_rgba(245,240,230,0.22)] ring-1 ring-white/10">
                    <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 flex h-7 w-12 items-center justify-center rounded-t-lg rounded-b-sm border border-[#888888]/80 bg-gradient-to-b from-[#666666] to-[#1A1A1A] shadow-lg">
                      <div className="h-2.5 w-2.5 rounded-full border border-[#F5F0E6] bg-[#F5F0E6] shadow-[0_0_12px_rgba(245,240,230,0.95)]" />
                    </div>

                    <div className="relative mb-3 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#222222] via-[#111111] to-[#222222] px-4 py-3 text-center">
                      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E6] to-transparent" />
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F5F0E6]">Developer Profile</p>
                      <p className="mt-1 text-sm font-extrabold tracking-wide text-[#FAF6EF]">JANINE LUCES</p>
                      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#B8B0A0]">Personal Portfolio ID</p>
                    </div>

                    <div className="relative h-64 overflow-hidden rounded-xl border border-[#F5F0E6]/25 bg-[#0A0A0A] shadow-inner sm:h-72">
                      <img
                        src="/profile.jpg"
                        alt="Janine Luces profile portrait"
                        className="h-full w-full select-none object-cover object-center pointer-events-none"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#111111]/10" />

                      {/* scanner line: top → bottom → top, faint */}
                      {!reduce && (
                        <motion.div
                          aria-hidden
                          initial={{ top: "0%" }}
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E6]/70 to-transparent opacity-60 shadow-[0_0_10px_rgba(245,240,230,0.5)]"
                        />
                      )}

                      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-[#A8D5BA]/20 bg-[#0A0A0A]/80 px-3 py-1.5 backdrop-blur-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8D5BA] opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A8D5BA] shadow-[0_0_8px_rgba(168,213,186,0.8)]" />
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#E8DFD0]">Open to opportunities</span>
                      </div>
                      <div className="absolute right-3 top-3 rounded-md border border-[#F5F0E6]/30 bg-[#0A0A0A]/75 px-2 py-1 text-[8px] font-bold tracking-[0.18em] text-[#E8DFD0] backdrop-blur-md">
                        ID · 2026
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#888888]">Specialization</p>
                        <p className="mt-1 text-xs font-bold text-[#F5F0E6]">Backend Developer</p>
                        <p className="mt-1 text-[10px] text-[#B8B0A0]">Logic · Data · Reliable Systems</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F5F0E6]/20 bg-[#F5F0E6]/10">
                        <span className="font-mono text-sm font-black text-[#F5F0E6]">{"</>"}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-end justify-between px-1 pb-1">
                      <div>
                        <div className="flex h-5 items-stretch gap-[3px] opacity-80">
                          {[2, 4, 1, 3, 2, 5, 1, 3, 2, 4, 1, 3, 2, 5].map((w, i) => (
                            <span
                              key={i}
                              style={{ width: w }}
                              className={i % 4 === 2 ? "bg-[#F5F0E6]" : i % 2 ? "bg-[#666666]" : "bg-[#888888]"}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-[8px] font-mono tracking-[0.2em] text-[#666666]">JL · PORTFOLIO</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#666666]">Status</p>
                        <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[#F5F0E6]">Backend.dev</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero text — plays in sequence */}
          <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left w-full">
            {/* 1. WELCOME: slow rise */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: T.welcome, ease: EASE }}
              className="text-[#E8DFD0] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase"
            >
              WELCOME TO MY PORTFOLIO
            </motion.p>

            {/* 2. Hi, I'm Janine: bouncy */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                y: { type: "spring", bounce: 0.55, duration: 1.1, delay: T.name },
                opacity: { duration: 0.5, delay: T.name },
              }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F0E6] to-[#E8DFD0]">Janine</span>
            </motion.h1>

            {/* 3. Typed role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: T.typing - 0.4 }}
              className="text-lg sm:text-2xl text-[#E8DFD0] font-medium min-h-[2rem]"
            >
              <Typewriter words={ROLES} active={typing} onWordComplete={handleWordComplete} />
            </motion.p>

            {/* 4. Tagline: blur → clear + slight rise, only after the first word is typed; then it stays */}
            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
              animate={
                firstWordDone
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 18, filter: "blur(12px)" }
              }
              transition={{ duration: 1.3, ease: EASE }}
              className="text-[#D8D0C0] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Your Vision, My Code.
            </motion.p>

            {/* 5. Buttons appear last */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={firstWordDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, ease: EASE, delay: firstWordDone ? 0.9 : 0 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.a
                href="#contact"
                style={{ boxShadow: "0 0 20px rgba(245,240,230,0.3)" }}
                whileHover={{ y: -4, scale: 1.04, boxShadow: "0 0 36px rgba(245,240,230,0.6)", filter: "brightness(1.08)" }}
                whileTap={{ scale: 0.93, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="px-8 py-3.5 rounded-full bg-[#F5F0E6] text-[#0F0F0F] font-bold text-center"
              >
                Hire Me
              </motion.a>
              <motion.a
                href="#projects"
                style={{ borderColor: "rgba(245,240,230,0.5)", boxShadow: "0 0 0px rgba(245,240,230,0)" }}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  borderColor: "rgba(245,240,230,1)",
                  boxShadow: "0 0 20px rgba(245,240,230,0.2)",
                }}
                whileTap={{ scale: 0.93, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="px-8 py-3.5 rounded-full border text-[#F5F0E6] font-bold text-center"
              >
                View Projects
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: T.typing + 3 }}
          className="hidden lg:flex justify-center mt-10"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[#F5F0E6]/40 p-1.5">
            <motion.span
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[#F5F0E6]"
            />
          </div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[#2A2A2A]/60 scroll-mt-20"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-12"
        >
          <SectionHeader
            eyebrow="SELECTED WORK"
            first="Work"
            second="Gallery"
            text="Explore my repositories and leave real feedback or comments below!"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              projectId="python-hand-tracking"
              title="Python Hand Tracking System"
              description="Real-time hand tracking and gesture recognition system built using Python, OpenCV, and MediaPipe for computer vision processing."
              tags={["Python", "OpenCV", "MediaPipe"]}
              githubUrl="https://github.com/jvhluces/boring"
              imageSrc="/projects/python.png"
              defaultComments={[]}
            />
            <ProjectCard
              projectId="media-vault-app"
              title="Media Vault Web App"
              description="A secure web storage interface designed with HTML, CSS, and JavaScript, backed by a MySQL database for organizing media files."
              tags={["HTML/JS", "MySQL", "CSS3", "PHP"]}
              githubUrl="https://github.com/jvhluces/Vault-website"
              imageSrc="/projects/vault.png"
              defaultComments={[]}
            />
            <ProjectCard
              projectId="event-management-system"
              title="Event Management System"
              description="A comprehensive event management platform built with modern web technologies for seamless event planning and coordination."
              tags={["HTML/JS", "CSS", "PHP", "MySQL", "Bootstrap"]}
              githubUrl="https://github.com/jvhluces/event_management_system"
              imageSrc="/projects/event-management.png"
              defaultComments={[]}
            />
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[#2A2A2A]/60 scroll-mt-20"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          <SectionHeader
            eyebrow="WHAT I OFFER"
            first="My"
            second="Services"
            text="Building reliable backend systems, clean application logic, and functional web solutions powered by PHP, Python, and modern web tools."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Link2Icon,
                title: "API Integration",
                text: "Connecting your app to third-party services and building clean REST APIs so your frontend and backend talk seamlessly.",
              },
              {
                Icon: Server,
                title: "Backend Development",
                text: "Building fast, secure, and scalable APIs and server-side logic using FastAPI, Python and databases to power your applications.",
              },
              {
                Icon: Database,
                title: "Database Design",
                text: "Designing efficient database schemas and queries to make sure your data is organized, fast, and reliable.",
              },
            ].map(({ Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative overflow-hidden bg-[#1A1A1A]/70 border border-[#2A2A2A] p-8 rounded-3xl backdrop-blur-sm hover:border-[#F5F0E6]/40 hover:shadow-[0_0_25px_rgba(245,240,230,0.15)] transition-colors space-y-4"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F5F0E6]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-[#F5F0E6]/10 border border-[#F5F0E6]/20 flex items-center justify-center text-[#F5F0E6]"
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#F5F0E6]">{title}</h3>
                <p className="text-[#D8D0C0] text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[#2A2A2A]/60 scroll-mt-20"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <motion.p variants={fadeUp} className="text-[#E8DFD0] font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">
              ABOUT ME
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Building Solid Software with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F0E6] to-[#E8DFD0]">
                Clean Code & Practical Logic
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#D8D0C0] text-base leading-relaxed">
              I&apos;m a passionate developer with hands-on experience in backend and web development using modern frameworks and core programming languages. I enjoy solving logic problems, writing structured code, and continuously learning new technologies to build practical digital applications.
            </motion.p>
            <motion.div variants={fadeUp} className="pt-2">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/JANINE_LUCES_CV.pdf"
                download="JANINE_LUCES_CV.pdf"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#F5F0E6] to-[#E8DFD0] text-[#0F0F0F] font-bold shadow-[0_0_20px_rgba(245,240,230,0.25)] hover:shadow-[0_0_30px_rgba(245,240,230,0.4)] transition-shadow cursor-pointer"
              >
                <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </motion.a>
            </motion.div>
          </div>

          {/* Technologies & Tools */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden bg-[#1A1A1A]/70 border border-[#2A2A2A] rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#F5F0E6]/[0.07] blur-3xl" />
            <h3 className="relative text-xl font-bold mb-6 text-[#F5F0E6] border-b border-[#2A2A2A] pb-4">
              Technologies & Tools I Use
            </h3>
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              className="relative grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {TECHS.map((t, i) => (
                <TechTile key={t.name} name={t.name} icon={t.icon} invert={t.invert} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-24 border-t border-[#2A2A2A]/60 scroll-mt-20"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-8">
            <SectionHeader
              eyebrow="Get In Touch"
              first="Contact"
              second="Me"
              text="Let's build something great together. Have a project in mind or just want to chat about backend systems? Drop me a message!"
            />
            <div className="space-y-4">
              {[
                { Icon: Mail, label: "My Email", value: "janineluces49@gmail.com", href: "mailto:janineluces49@gmail.com" },
                { Icon: MapPin, label: "My Address", value: "Daraga, Albay, Philippines" },
                { Icon: Phone, label: "Phone / SMS", value: "+63 938 277 5728", href: "sms:+639382775728" },
              ].map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#F5F0E6]/10 flex items-center justify-center text-[#F5F0E6] transition-transform group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-[#D8D0C0] uppercase font-semibold">{label}</p>
                      <p className="text-[#F5F0E6] font-medium">{value}</p>
                    </div>
                  </>
                );
                const cls =
                  "group flex items-center gap-4 p-5 rounded-2xl bg-[#1A1A1A]/85 border border-[#2A2A2A] transition-all";
                return (
                  <motion.div key={label} variants={fadeUp} whileHover={href ? { x: 6 } : undefined}>
                    {href ? (
                      <a href={href} className={`${cls} hover:border-[#F5F0E6]/50 hover:shadow-[0_0_20px_rgba(245,240,230,0.15)]`}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeUp} className="pt-2">
              <p className="text-xs text-[#D8D0C0] uppercase font-semibold mb-3">Connect With Me</p>
              <div className="flex gap-4">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.name}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="group w-12 h-12 rounded-2xl bg-[#1A1A1A]/85 border border-[#2A2A2A] flex items-center justify-center hover:border-[#F5F0E6]/50 hover:shadow-[0_0_15px_rgba(245,240,230,0.25)] transition-colors"
                  >
                    <img
                      src={s.icon}
                      alt=""
                      className="h-5 w-5 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="bg-[#1A1A1A]/70 border border-[#2A2A2A]/80 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F5F0E6]/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Send <span className="text-[#F5F0E6]">Email Message</span>
            </h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D8D0C0] uppercase mb-2">Your Name</label>
                <input type="text" name="from_name" required placeholder="Enter your name" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#D8D0C0] uppercase mb-2">Your Email</label>
                <input type="email" name="from_email" required placeholder="Enter your email" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#D8D0C0] uppercase mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Type your message here..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <motion.button
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl bg-[#F5F0E6] hover:bg-[#E8DFD0] disabled:opacity-70 disabled:cursor-not-allowed text-[#0F0F0F] font-bold shadow-[0_0_20px_rgba(245,240,230,0.3)] transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={sending ? { x: [0, 6, 0], y: [0, -6, 0] } : { x: 0, y: 0 }}
                  transition={{ duration: 0.8, repeat: sending ? Infinity : 0 }}
                  className="flex"
                >
                  <Send className="w-4 h-4" />
                </motion.span>
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#222222] py-6 text-center text-xs text-[#888888]">
        <p>© 2026 Janine. All rights reserved.</p>
      </footer>
    </main>
  );
}

/* ---------- Project card ---------- */
interface CommentItem {
  id: string;
  authorId: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
}

function ProjectCard({
  projectId,
  title,
  description,
  tags,
  githubUrl,
  imageSrc,
  defaultComments,
}: {
  projectId: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  imageSrc?: string;
  defaultComments: CommentItem[];
}) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [myUserId, setMyUserId] = useState("");

  useEffect(() => {
    let userId = localStorage.getItem("portfolio_user_id");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("portfolio_user_id", userId);
    }
    setMyUserId(userId);
    const saved = localStorage.getItem(`comments_${projectId}`);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch {
        setComments(defaultComments);
      }
    } else {
      setComments(defaultComments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const saveCommentsToStorage = (updated: CommentItem[]) => {
    setComments(updated);
    localStorage.setItem(`comments_${projectId}`, JSON.stringify(updated));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;
    const newEntry: CommentItem = {
      id: "comment_" + Math.random().toString(36).substring(2, 9),
      authorId: myUserId,
      name: newName.trim(),
      comment: newComment.trim(),
      rating: selectedRating,
      date: "Just now",
    };
    saveCommentsToStorage([newEntry, ...comments]);
    setNewName("");
    setNewComment("");
    setSelectedRating(0);
  };

  const handleDeleteComment = (commentId: string) => {
    saveCommentsToStorage(comments.filter((c) => c.id !== commentId));
  };

  const fieldClass =
    "w-full px-3 py-2 text-xs bg-[#F5F0E6] border border-[#E8DFD0] rounded-xl text-[#0F0F0F] placeholder-[#666666] focus:outline-none focus:border-[#F5F0E6] focus:ring-1 focus:ring-[#F5F0E6] transition-all";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="bg-[#1A1A1A]/70 border border-[#2A2A2A] rounded-3xl overflow-hidden p-6 flex flex-col justify-between hover:border-[#F5F0E6]/40 hover:shadow-[0_0_25px_rgba(245,240,230,0.15)] transition-colors"
    >
      <div className="space-y-4">
        {imageSrc ? (
          <Link
            href={`/projects/${projectId}`}
            aria-label={`View details for ${title}`}
            className="group relative block h-44 w-full overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F0E6]"
          >
            <img
              src={imageSrc}
              alt={`${title} project preview`}
              className="h-full w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#050505]/95 via-[#050505]/10 to-transparent p-4 opacity-90 transition-opacity group-hover:opacity-100">
              <span className="text-sm font-bold text-[#F5F0E6] translate-y-1 transition-transform group-hover:translate-y-0">
                View Project Details
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F5F0E6]/30 bg-[#0A0A0A]/90 text-[#E8DFD0] transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#F5F0E6] group-hover:text-[#0F0F0F]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ) : (
          <div className="w-full h-44 rounded-2xl bg-[#0A0A0A] flex items-center justify-center border border-[#2A2A2A] text-[#F5F0E6] font-semibold text-sm">
            {title} Preview
          </div>
        )}

        <h3 className="text-2xl font-bold text-[#F5F0E6]">{title}</h3>
        <p className="text-[#D8D0C0] text-sm leading-relaxed">{description}</p>

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-xs font-semibold text-[#F5F0E6] hover:underline flex items-center gap-1 focus:outline-none"
          aria-expanded={showComments}
        >
          <motion.span animate={{ rotate: showComments ? 180 : 0 }} className="inline-block">
            ▼
          </motion.span>
          {showComments ? "Hide Live Comments" : `View Live Comments (${comments.length})`}
        </button>

        {/* Live Comments & Rating Section */}
        <AnimatePresence initial={false}>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="bg-[#0F0F0F]/70 border border-[#2A2A2A] p-4 rounded-2xl space-y-4 shadow-inner">
                <form onSubmit={handleAddComment} className="space-y-3 border-b border-[#2A2A2A] pb-4">
                  <p className="text-xs font-bold text-[#E8DFD0] uppercase tracking-wider">Leave a Review</p>

                  <input
                    type="text"
                    placeholder="Your Name / Handle"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className={fieldClass}
                  />

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#D8D0C0]">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => setSelectedRating(selectedRating === star ? 0 : star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                          className="text-lg focus:outline-none"
                        >
                          <span className={star <= (hoverRating || selectedRating) ? "text-yellow-400" : "text-gray-600"}>
                            ★
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#B8B0A0]">
                      {selectedRating > 0 ? `${selectedRating} Star${selectedRating > 1 ? "s" : ""}` : "(Optional)"}
                    </span>
                  </div>

                  <textarea
                    placeholder="Write your comment here..."
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className={`${fieldClass} resize-none`}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#F5F0E6] to-[#E8DFD0] text-[#0F0F0F] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(245,240,230,0.2)] cursor-pointer"
                  >
                    Post Comment
                  </motion.button>
                </form>

                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {comments.length === 0 ? (
                    <p className="text-xs text-[#B8B0A0] italic text-center py-2">
                      No comments yet. Be the first to leave a review!
                    </p>
                  ) : (
                    <AnimatePresence initial={false}>
                      {comments.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: -12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="bg-[#222222]/80 border border-[#2A2A2A] p-3 rounded-xl text-xs space-y-1"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#F5F0E6]">{item.name}</span>
                              {item.rating > 0 && (
                                <span className="text-yellow-400 text-[11px]">{"★".repeat(item.rating)}</span>
                              )}
                            </div>
                            {item.authorId === myUserId && (
                              <button
                                onClick={() => handleDeleteComment(item.id)}
                                className="text-[10px] text-red-400 hover:text-red-300 hover:underline transition-colors"
                                title="Delete your comment"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <p className="text-[#E8DFD0] leading-relaxed">{item.comment}</p>
                          <p className="text-[10px] text-[#888888] text-right">{item.date}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: Tags & GitHub Repo Link */}
      <div className="pt-4 border-t border-[#2A2A2A] mt-4 flex flex-col gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#F5F0E6]/10 border border-[#F5F0E6]/20 text-[#E8DFD0] transition-colors hover:bg-[#F5F0E6]/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full text-center py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5F0E6] to-[#E8DFD0] text-[#0F0F0F] shadow-[0_0_12px_rgba(245,240,230,0.2)]"
        >
          GitHub Repo
        </motion.a>
      </div>
    </motion.div>
  );
}
