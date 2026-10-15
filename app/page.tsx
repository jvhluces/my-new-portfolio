"use client";



import { useEffect, useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import { Server, Link2, Link2Icon, Database, Mail, MapPin, Phone, Send } from 'lucide-react';

import emailjs from "@emailjs/browser";



export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  return (



    <main className="min-h-screen bg-[#0F172A] text-white selection:bg-cyan-500 selection:text-black pt-20">

      {/* 1. NAVIGATION BAR */}

     {/* 1. STICKY NAVIGATION HEADER */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60 px-6 md:px-8 py-4">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}

          <a href="#home" className="text-xl font-extrabold text-white tracking-wider">

            Jah<span className="text-cyan-400">.</span>

          </a>



          {/* Desktop Navigation Links */}

          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">

            <a href="#home" className="hover:text-cyan-400 transition-colors">HOME</a>

            <a href="#projects" className="hover:text-cyan-400 transition-colors">PROJECTS</a>

            <a href="#services" className="hover:text-cyan-400 transition-colors">SERVICES</a>

            <a href="#about" className="hover:text-cyan-400 transition-colors">ABOUT</a>

          </div>



          {/* Desktop Hire Me Button */}

          <a

            href="#contact"

            className="hidden md:inline-block px-5 py-2 text-xs font-bold rounded-full bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"

          >

            Hire Me

          </a>



          {/* Mobile Hamburger Menu Button */}

          <button

            onClick={() => setIsOpen(!isOpen)}

            className="md:hidden text-white focus:outline-none p-1"

            aria-label="Toggle Menu"

          >

            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              {isOpen ? (

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />

              ) : (

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />

              )}

            </svg>

          </button>

        </div>



        {/* Mobile Sidebar Overlay / Drawer */}

        <AnimatePresence>

          {isOpen && (

            <motion.div

              initial={{ opacity: 0, height: 0 }}

              animate={{ opacity: 1, height: "auto" }}

              exit={{ opacity: 0, height: 0 }}

              transition={{ duration: 0.3 }}

              className="md:hidden bg-gray-950/95 border-b border-gray-800 px-6 py-6 mt-4 rounded-2xl shadow-2xl"

            >

              <div className="flex flex-col space-y-5 text-base font-semibold text-gray-300">

                {[

                  { name: "HOME", id: "home" },

                  { name: "PROJECTS", id: "projects" },

                  { name: "SERVICES", id: "services" },

                  { name: "ABOUT", id: "about" },

                  { name: "CONTACT", id: "contact" },

                ].map((item) => (

                  <button

                    key={item.id}

                    onClick={() => {

                      setIsOpen(false);

                      setTimeout(() => {

                        const el = document.getElementById(item.id);

                        if (el) {

                          el.scrollIntoView({ behavior: "smooth" });

                        }

                      }, 100);

                    }}

                    className="text-left hover:text-cyan-400 transition-colors py-1 border-b border-gray-900/60 text-gray-300"

                  >

                    {item.name}

                  </button>

                ))}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </nav>



      {/* 2. HERO SECTION */}

      <section id="home" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20">

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">



          {/* Profile Image - Top on Mobile, Right side on Desktop */}

         <div className="order-1 lg:order-2 relative flex justify-center w-full py-10">



  {/* Lanyard / Hanging String mula sa Itaas ng Screen */}

  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-gray-500 to-cyan-400/80 z-0 pointer-events-none" />



  {/* Swinging / Pendulum ID Badge Container */}

  <motion.div

    initial={{ y: -100, opacity: 0, rotate: -15 }}

    animate={{ 

      y: 0, 

      opacity: 1, 

      rotate: [0, 6, -6, 4, -4, 0] // Natural swinging/swing-swing effect

    }}

    transition={{

      y: { type: "spring", stiffness: 120, damping: 12, delay: 0.2 },

      opacity: { duration: 0.6 },

      rotate: {

        repeat: Infinity,

        repeatType: "reverse",

        duration: 4.5, // Bilis ng pag-swing (mas mataas = mas dahan-dahan)

        ease: "easeInOut"

      }

    }}

    whileHover={{ scale: 1.05, rotate: 0 }} // Pag tinutok ng mouse, titigil sa pag-swing at lalapit

    whileTap={{ scale: 0.95 }}

    className="relative z-10 w-64 sm:w-72 lg:w-80 overflow-visible rounded-[1.65rem] border border-cyan-400/70 bg-[#0b1220] p-3.5 shadow-[0_25px_80px_rgba(6,182,212,0.22)] ring-1 ring-white/10 cursor-pointer origin-top"
  >
    {/* Premium ID clip */}
    <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 flex h-7 w-12 items-center justify-center rounded-t-lg rounded-b-sm border border-slate-500/80 bg-gradient-to-b from-slate-500 to-slate-800 shadow-lg">
      <div className="h-2.5 w-2.5 rounded-full border border-cyan-200 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.95)]" />
    </div>

    {/* Professional identity header */}
    <div className="relative mb-3 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-4 py-3 text-center">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-cyan-300">Developer Profile</p>
      <p className="mt-1 text-sm font-extrabold tracking-wide text-white">JANINE LUCES</p>
      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">Personal Portfolio ID</p>
    </div>

    {/* Portrait frame */}
    <div className="relative h-64 overflow-hidden rounded-xl border border-cyan-300/25 bg-slate-950 shadow-inner sm:h-72">
      <img
        src="/profile.jpg"
        alt="Janine Luces profile portrait"
        className="h-full w-full select-none object-cover object-center pointer-events-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-slate-900/10" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-slate-950/80 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-200">Open to opportunities</span>
      </div>
      <div className="absolute right-3 top-3 rounded-md border border-cyan-300/30 bg-slate-950/75 px-2 py-1 text-[8px] font-bold tracking-[0.18em] text-cyan-200 backdrop-blur-md">ID · 2026</div>
    </div>

    {/* Identity details */}
    <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">Specialization</p>
        <p className="mt-1 text-xs font-bold text-white">Backend Developer</p>
        <p className="mt-1 text-[10px] text-slate-400">Logic · Data · Reliable Systems</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
        <span className="font-mono text-sm font-black text-cyan-300">{'</>'}</span>
      </div>
    </div>

    {/* Minimal barcode and card footer */}
    <div className="mt-3 flex items-end justify-between px-1 pb-1">
      <div>
        <div className="flex h-5 items-stretch gap-[3px] opacity-80">
          <span className="w-[2px] bg-slate-400" /><span className="w-[4px] bg-slate-600" /><span className="w-px bg-cyan-300" /><span className="w-[3px] bg-slate-400" /><span className="w-[2px] bg-slate-600" /><span className="w-[5px] bg-slate-400" /><span className="w-px bg-cyan-300" /><span className="w-[3px] bg-slate-500" /><span className="w-[2px] bg-slate-300" /><span className="w-[4px] bg-slate-600" /><span className="w-px bg-slate-300" /><span className="w-[3px] bg-cyan-300" /><span className="w-[2px] bg-slate-500" /><span className="w-[5px] bg-slate-400" />
        </div>
        <p className="mt-1 text-[8px] font-mono tracking-[0.2em] text-slate-500">JL · PORTFOLIO</p>
      </div>
      <div className="text-right">
        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-500">Status</p>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-cyan-300">Backend.dev</p>
      </div>
    </div>
  </motion.div>

</div>



          {/* Text Content & Buttons - Below Image on Mobile, Left side on Desktop */}

          <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left w-full">

            <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">

              WELCOME TO MY PORTFOLIO

            </p>



            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">

              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Janine</span>

            </h1>



            <p className="text-lg sm:text-xl text-gray-300 font-medium">

              Aspiring Backend Developer

            </p>



            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">

              Your Vision, My Code. 

            </p>



            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">

              <a

                href="#contact"

                className="px-8 py-3.5 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] text-center"

              >

                Hire Me

              </a>

              <a

                href="#projects"

                className="px-8 py-3.5 rounded-full border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-bold transition-all text-center"

              >

                View Projects

              </a>

            </div>

          </div>



        </div>

      </section>

      {/* 3. PROJECTS / WORK GALLERY SECTION WITH REAL PERSISTENT COMMENTS */}

      <section id="projects" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-gray-800/60">

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          viewport={{ once: true }}

          className="space-y-12"

        >

          <div>

            <p className="text-cyan-400 font-medium tracking-wide uppercase">SELECTED WORK</p>

            <h2 className="text-4xl font-extrabold mt-2">

              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Gallery</span>

            </h2>

            <p className="text-gray-400 text-sm mt-2">

              Explore my repositories and leave real feedback or comments below!

            </p>

          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



            {/* Project 1: Python Hand Tracking System */}

            <ProjectCard

              projectId="python-hand-tracking"

              title="Python Hand Tracking System"

              description="Real-time hand tracking and gesture recognition system built using Python, OpenCV, and MediaPipe for computer vision processing."

              tags={["Python", "OpenCV", "MediaPipe"]}

              githubUrl="https://github.com/jvhluces/boring"

              imageSrc="/projects/python.png"

              defaultComments={[

              ]}

            />



            {/* Project 2: Media Vault Web App */}

            <ProjectCard

              projectId="media-vault-app"

              title="Media Vault Web App"

              description="A secure web storage interface designed with HTML, CSS, and JavaScript, backed by a MySQL database for organizing media files."

              tags={["HTML/JS", "MySQL", "CSS3", "PHP"]}

              githubUrl="https://github.com/jvhluces/Vault-website"

              imageSrc="/projects/vault.png"

              defaultComments={[

              ]}

            />



            <ProjectCard

              projectId="event-management-system"

              title="Event Management System"

              description="A comprehensive event management platform built with modern web technologies for seamless event planning and coordination."

              tags={["HTML/JS", "CSS", "PHP", "MySQL", "Bootstrap"]}

              githubUrl="https://github.com/jvhluces/event_management_system"

              imageSrc="/projects/event-management.png"

              defaultComments={[

              ]}

            />



          </div>

        </motion.div>

      </section>



      {/* SERVICES SECTION */}

      <section id="services" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-8 py-20 border-t border-gray-800/60">

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          viewport={{ once: true }}

          className="space-y-12"

        >

          <div>

            <p className="text-cyan-400 font-medium tracking-wide uppercase">WHAT I OFFER</p>

            <h2 className="text-4xl font-extrabold mt-2">

              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span>

            </h2>

            <p className="text-gray-400 text-base mt-3 max-w-xl">

              Building reliable backend systems, clean application logic, and functional web solutions powered by PHP, Python, and modern web tools.

            </p>

          </div>



          {/* Services Cards Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Service 1 */}

            <motion.div

              whileHover={{ y: -8 }}

              className="bg-gray-900/60 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all space-y-4"

            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl font-bold">

                <Link2Icon className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-white">API Integration</h3>

              <p className="text-gray-400 text-sm leading-relaxed">

                Connecting your app to third-party services and building clean REST APIs so your frontend and backend talk seamlessly.

              </p>

            </motion.div>



            {/* Service 2 */}

            <motion.div

              whileHover={{ y: -8 }}

              className="bg-gray-900/60 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all space-y-4"

            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl font-bold">

                <Server className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-white">Backend Development</h3>

              <p className="text-gray-400 text-sm leading-relaxed">

               Building fast, secure, and scalable APIs and server-side logic using FastAPI, Python and databases to power your applications.

              </p>

            </motion.div>



            {/* Service 3 */}

            <motion.div

              whileHover={{ y: -8 }}

              className="bg-gray-900/60 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all space-y-4"

            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl font-bold">

                <Database className="w-8 h-8" />

              </div>

              <h3 className="text-xl font-bold text-white">Database Design</h3>

              <p className="text-gray-400 text-sm leading-relaxed">

               Designing efficient database schemas and queries to make sure your data is organized, fast, and reliable.

              </p>

            </motion.div>

          </div>

        </motion.div>

      </section>



     {/* 5. ABOUT & TECHNICAL SKILLS SECTION */}

      <section id="about" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-gray-800/60">

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          viewport={{ once: true }}

          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"

        >

          {/* Left Column: Personalized Bio */}

          <div className="space-y-6">

            <p className="text-cyan-400 font-medium tracking-wide uppercase">ABOUT ME</p>



            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">

              Building Solid Software with <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">

                Clean Code & Practical Logic

              </span>

            </h2>



            <p className="text-gray-400 text-base leading-relaxed">

              I'm a passionate developer with hands-on experience in backend and web development using modern frameworks and core programming languages. I enjoy solving logic problems, writing structured code, and continuously learning new technologies to build practical digital applications.

            </p>



            {/* Download CV Button */}

            <div className="pt-2">

              <motion.a

                whileHover={{ scale: 1.05 }}

                whileTap={{ scale: 0.95 }}

                href="/JANINE_LUCES_CV.pdf"

                download="JANINE_LUCES_CV.pdf"

                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all cursor-pointer"

              >

                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />

                </svg>

                Download CV

              </motion.a>

            </div>

          </div>



          {/* Right Column: Actual Tech Stack */}

          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm shadow-xl">

            <h3 className="text-xl font-bold mb-6 text-gray-200 border-b border-gray-800 pb-4">

              Technologies & Tools I Use

            </h3>



            <div className="flex flex-wrap gap-3">

              {[

                "PHP", 

                "Python", 

                "Node.js", 

                "C++", 

                "C#", 

                "JavaScript", 

                "HTML5", 

                "CSS3", 

                "Tailwind CSS", 

                "Git & GitHub"

              ].map((skill, index) => (

                <motion.span

                  key={index}

                  whileHover={{ scale: 1.08, y: -2 }}

                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-800/80 text-cyan-300 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] transition-all cursor-default"

                >

                  {skill}

                </motion.span>

              ))}

            </div>

          </div>

        </motion.div>

      </section>



      {/* 5. MODERN CONTACT SECTION WITH EMAILJS */}

      <section id="contact" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-24 border-t border-gray-800/60">

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          viewport={{ once: true }}

          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"

        >

          {/* Left Column: Contact Header, Details & Social Links */}

          <div className="space-y-8">

            <div>

              <p className="text-cyan-400 font-medium tracking-wide uppercase">Get In Touch</p>

              <h2 className="text-4xl lg:text-5xl font-extrabold mt-2">

                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>

              </h2>

              <p className="text-gray-400 text-base mt-4 max-w-md leading-relaxed">

                Let's build something great together. Have a project in mind or just want to chat about backend systems? Drop me a message!

              </p>

            </div>



            <div className="space-y-4">

              <a

                href="mailto:janineluces49@gmail.com"

                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all block"

              >

                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">

                  <Mail className="w-6 h-6" />

                </div>

                <div>

                  <p className="text-xs text-gray-400 uppercase font-semibold">My Email</p>

                  <p className="text-white font-medium hover:text-cyan-400 transition-colors">janineluces49@gmail.com</p>

                </div>

              </a>



              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900/80 border border-gray-800 transition-all">

                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">

                  <MapPin className="w-6 h-6" />

                </div>

                <div>

                  <p className="text-xs text-gray-400 uppercase font-semibold">My Address</p>

                  <p className="text-white font-medium">Daraga, Albay, Philippines</p>

                </div>

              </div>



              <a

                href="sms:+639382775728"

                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all block"

              >

                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">

                  <Phone className="w-6 h-6" />

                </div>

                <div>

                  <p className="text-xs text-gray-400 uppercase font-semibold">Phone / SMS</p>

                  <p className="text-white font-medium hover:text-cyan-400 transition-colors">+63 938 277 5728</p>

                </div>

              </a>

            </div>



            {/* Connect With Me */}

            <div className="pt-2">

              <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Connect With Me</p>

              <div className="flex gap-4">

                {[

                  {

                    name: "GitHub",

                    url: "https://github.com/jvhluces",

                    icon: (

                      <svg className="w-5 h-5 fill-gray-300 group-hover:fill-cyan-400 transition-colors" viewBox="0 0 24 24">

                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>

                      </svg>

                    ),

                  },

                  {

                    name: "LinkedIn",

                    url: "https://www.linkedin.com/in/janine-luces-494637423",

                    icon: (

                      <svg className="w-5 h-5 fill-gray-300 group-hover:fill-cyan-400 transition-colors" viewBox="0 0 24 24">

                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>

                      </svg>

                    ),

                  },

                  {

                    name: "Facebook",

                    url: "https://web.facebook.com/jvhnine",

                    icon: (

                      <svg className="w-5 h-5 fill-gray-300 group-hover:fill-cyan-400 transition-colors" viewBox="0 0 24 24">

                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>

                      </svg>

                    ),

                  },

                  {

                    name: "Instagram",

                    url: "https://www.instagram.com/jvh_ninn/",

                    icon: (

                      <svg className="w-5 h-5 fill-none stroke-gray-300 group-hover:stroke-cyan-400 transition-colors" strokeWidth="2" viewBox="0 0 24 24">

                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>

                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>

                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>

                      </svg>

                    ),

                  },

                ].map((social, index) => (

                  <motion.a

                    key={index}

                    whileHover={{ scale: 1.12, y: -3 }}

                    whileTap={{ scale: 0.95 }}

                    href={social.url}

                    target="_blank"

                    rel="noreferrer"

                    aria-label={social.name}

                    className="group w-12 h-12 rounded-2xl bg-gray-900/80 border border-gray-800 flex items-center justify-center hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"

                  >

                    {social.icon}

                  </motion.a>

                ))}

              </div>

            </div>

          </div>



          {/* Right Column: Send Email Message Form */}

          <motion.div

            initial={{ opacity: 0, scale: 0.95 }}

            whileInView={{ opacity: 1, scale: 1 }}

            transition={{ duration: 0.6 }}

            viewport={{ once: true }}

            className="bg-gray-900/60 border border-gray-800/80 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"

          >

            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />



            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">

              Send <span className="text-cyan-400">Email Message</span>

            </h3>



            <form

              onSubmit={(e) => {

                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;

                const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement;

                if (submitBtn) submitBtn.innerText = "Sending...";



                const serviceID = "service_i7xjfi2";

                const templateID = "template_p8vq8x7"; // Palitan ng totoong template ID mo

                const publicKey = "ciZdJ5tqPfrv_iG8m";   // Palitan ng totoong public key mo



                emailjs.sendForm(serviceID, templateID, form, publicKey)

                  .then(() => {

                    alert("Message sent successfully!");

                    form.reset();

                    if (submitBtn) submitBtn.innerText = "Send Message";

                  })

                  .catch((err) => {

                    console.error("EmailJS Error:", err);

                    alert("Failed to send message. Please try again.");

                    if (submitBtn) submitBtn.innerText = "Send Message";

                  });

              }}

              className="space-y-4"

            >

              <div>

                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Your Name</label>

                <input

                  type="text"

                  name="from_name"

                  required

                  placeholder="Enter your name"

                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"

                />

              </div>



              <div>

                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Your Email</label>

                <input

                  type="email"

                  name="from_email"

                  required

                  placeholder="Enter your email"

                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"

                />

              </div>



              <div>

                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Your Message</label>

                <textarea

                  name="message"

                  rows={4}

                  required

                  placeholder="Type your message here..."

                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"

                />

              </div>



              <motion.button

                whileHover={{ scale: 1.02 }}

                whileTap={{ scale: 0.98 }}

                type="submit"

                className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"

              >

                <Send className="w-4 h-4" />

                Send Message

              </motion.button>

            </form>

          </motion.div>

        </motion.div>

      </section>



      {/* FOOTER COPYRIGHT */}

      <footer className="border-t border-gray-900 py-6 text-center text-xs text-gray-500">

        <p>© 2026 Janine. All rights reserved.</p>

      </footer>

    </main>

  );

}




/* INTERACTIVE & PERSISTENT PROJECT CARD WITH STAR RATING & DELETE */

interface CommentItem {

  id: string;

  authorId: string;

  name: string;

  comment: string;

  rating: number; // 0 to 5

  date: string;

}



function ProjectCard({

  projectId,

  title,

  description,

  tags,

  githubUrl,

  imageSrc,

  defaultComments

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

  const [selectedRating, setSelectedRating] = useState(0); // 0 means no rating

  const [hoverRating, setHoverRating] = useState(0);

  const [showComments, setShowComments] = useState(false);

  const [myUserId, setMyUserId] = useState("");



  // Load User ID and Persistent Comments from LocalStorage upon mount

  useEffect(() => {

    // Unique ID for the current browser/device

    let userId = localStorage.getItem("portfolio_user_id");

    if (!userId) {

      userId = "user_" + Math.random().toString(36).substring(2, 9);

      localStorage.setItem("portfolio_user_id", userId);

    }

    setMyUserId(userId);



    // Load saved comments for this specific project

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

  }, [projectId]);



  // Save comments to LocalStorage whenever comment list updates

  const saveCommentsToStorage = (updated: CommentItem[]) => {

    setComments(updated);

    localStorage.setItem(`comments_${projectId}`, JSON.stringify(updated));

  };



 // Add Comment Logic (Ligtas laban sa Next.js Date render error)

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



    const updated = [newEntry, ...comments];

    saveCommentsToStorage(updated);



    // Reset Form

    setNewName("");

    setNewComment("");

    setSelectedRating(0);

  };





  // Delete Comment Logic (Only allowed for author)

  const handleDeleteComment = (commentId: string) => {

    const updated = comments.filter((c) => c.id !== commentId);

    saveCommentsToStorage(updated);

  };



  return (

    <motion.div

      whileHover={{ y: -5 }}

      className="bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all"

    >

      <div className="space-y-4">

        {imageSrc ? (
          <Link
            href={`/projects/${projectId}`}
            aria-label={`View details for ${title}`}
            className="group relative block h-44 w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <img
              src={imageSrc}
              alt={`${title} project preview`}
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-gray-950/95 via-gray-950/10 to-transparent p-4">
              <span className="text-sm font-bold text-white">View Project Details</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-gray-950/80 text-cyan-300 transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </div>
          </Link>
        ) : (
          <div className="w-full h-44 rounded-2xl bg-gray-950 flex items-center justify-center border border-gray-800 text-cyan-400 font-semibold text-sm">
            {title} Preview
          </div>
        )}



        <h3 className="text-2xl font-bold text-white">{title}</h3>

        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>



        {/* Toggle Button para sa Comments */}

        <button

          onClick={() => setShowComments(!showComments)}

          className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 focus:outline-none"

        >

          {showComments ? "▲ Hide Live Comments" : `▼ View Live Comments (${comments.length})`}

        </button>



        {/* Live Comments & Rating Section */}

        {showComments && (

          <div className="bg-gray-950/90 border border-gray-800 p-4 rounded-2xl space-y-4 shadow-inner">



            {/* Form para Mag-post ng Bagong Comment */}

            <form onSubmit={handleAddComment} className="space-y-3 border-b border-gray-800 pb-4">

              <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Leave a Review</p>



              <input

                type="text"

                placeholder="Your Name / Handle"

                value={newName}

                onChange={(e) => setNewName(e.target.value)}

                required

                className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"

              />



              {/* Clickable Star Rating System */}

              <div className="flex items-center gap-2">

                <span className="text-xs text-gray-400">Rating:</span>

                <div className="flex gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <button

                      key={star}

                      type="button"

                      onClick={() => setSelectedRating(selectedRating === star ? 0 : star)}

                      onMouseEnter={() => setHoverRating(star)}

                      onMouseLeave={() => setHoverRating(0)}

                      className="text-lg focus:outline-none transition-transform hover:scale-125"

                    >

                      <span

                        className={

                          star <= (hoverRating || selectedRating)

                            ? "text-yellow-400"

                            : "text-gray-600"

                        }

                      >

                        ★

                      </span>

                    </button>

                  ))}

                </div>

                <span className="text-[10px] text-gray-500">

                  {selectedRating > 0 ? `${selectedRating} Star${selectedRating > 1 ? "s" : ""}` : "(Optional)"}

                </span>

              </div>



              <textarea

                placeholder="Write your comment here..."

                rows={2}

                value={newComment}

                onChange={(e) => setNewComment(e.target.value)}

                required

                className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"

              />



              <button

                type="submit"

                className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-pointer"

              >

                Post Comment

              </button>

            </form>



            {/* List of Persistent Comments */}

            <div className="space-y-3 max-h-52 overflow-y-auto pr-1 custom-scrollbar">

              {comments.length === 0 ? (

                <p className="text-xs text-gray-500 italic text-center py-2">No comments yet. Be the first to leave a review!</p>

              ) : (

                comments.map((item) => (

                  <div key={item.id} className="bg-gray-900/80 border border-gray-800/80 p-3 rounded-xl text-xs space-y-1 relative group">

                    <div className="flex justify-between items-center">

                      <div className="flex items-center gap-2">

                        <span className="font-bold text-cyan-300">{item.name}</span>

                        {item.rating > 0 && (

                          <span className="text-yellow-400 text-[11px]">

                            {"★".repeat(item.rating)}

                          </span>

                        )}

                      </div>



                      {/* Delete Button: Lalabas lang kung ikaw ang nag-comment */}

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



                    <p className="text-gray-300 leading-relaxed">{item.comment}</p>

                    <p className="text-[10px] text-gray-500 text-right">{item.date}</p>

                  </div>

                ))

              )}

            </div>



          </div>

        )}

      </div>



      {/* Bottom Section: Tags & GitHub Repo Link */}

      <div className="pt-4 border-t border-gray-800/80 mt-4 flex flex-col gap-3">

        <div className="flex gap-1.5 flex-wrap">

          {tags.map((tag, i) => (

            <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-800/90 text-cyan-300 border border-cyan-500/20">

              {tag}

            </span>

          ))}

        </div>



        <a

          href={githubUrl}

          target="_blank"

          rel="noreferrer"

          className="w-full text-center py-2 rounded-xl text-xs font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)]"

        >

          GitHub Repo

        </a>

      </div>

    </motion.div>

  );

}