"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const projects = {
  "python-hand-tracking": {
    title: "Python Hand Tracking System",
    category: "Computer Vision",
    description:
      "A real-time hand tracking and gesture recognition system built using Python, OpenCV, and MediaPipe. Review the repository for the implemented functionality and setup requirements.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    image: "/projects/python.png",
    githubUrl: "https://github.com/jvhluces/boring",
    liveDemo: null as string | null,
    status: "In Development",
    features: [
      "Python-based computer vision project",
      "Uses OpenCV and MediaPipe according to the project description",
      "Intended for camera-based hand tracking",
    ],
    requirements: [
      "Python installed on your computer",
      "A compatible webcam, if required by the code",
      "The dependencies listed in the repository",
    ],
    instructions:
      "Open the repository and read its README and dependency files. Install the listed packages and run the documented entry-point script. This project may require a local Python environment and camera access, so a static website host alone will not make it runnable in the browser.",
  },
  "media-vault-app": {
    title: "Media Vault Web App",
    category: "Web Application",
    description:
      "A media storage and organization web application using the technologies described in the portfolio. Check the repository for the current implemented features and installation steps.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    image: "/projects/vault.png",
    githubUrl: "https://github.com/jvhluces/Vault-website",
    liveDemo: null as string | null,
    status: "In Development",
    features: [
      "Web-based media interface",
      "Media organization project",
      "PHP and MySQL listed in the portfolio technology stack",
    ],
    requirements: [
      "A PHP-compatible local server, such as XAMPP, if the project uses PHP",
      "MySQL, if required by the project",
      "The database setup instructions and configuration from the repository",
    ],
    instructions:
      "Open the repository and follow its README. If the project uses PHP and MySQL, place it in your local server directory, configure the database using the actual project SQL/configuration files, and then open it through your local server URL.",
  },
  "event-management-system": {
    title: "Event Management System",
    category: "Web Application",
    description:
      "An event management platform built with the technologies listed in the portfolio. Review the source repository for the current features, database schema, and setup instructions.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/projects/event-management.png",
    githubUrl: "https://github.com/jvhluces/event_management_system",
    liveDemo: null as string | null,
    status: "In Development",
    features: [
      "Event management interface",
      "PHP and MySQL listed in the portfolio technology stack",
      "Bootstrap listed among the project technologies",
    ],
    requirements: [
      "A PHP-compatible local server, such as XAMPP, if the project uses PHP",
      "MySQL, if required by the project",
      "The database setup instructions and configuration from the repository",
    ],
    instructions:
      "Open the repository and read its README. If it uses PHP and MySQL, configure the local server and database based on the actual files in the repository, then access the application using the local server URL.",
  },
};

type ProjectSlug = keyof typeof projects;

export default function ProjectDetailsPage() {
  const params = useParams<{ slug: string }>();
  const project = projects[params.slug as ProjectSlug];

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-white">
        <div className="max-w-lg text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Project not found
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            We couldn&apos;t find that project.
          </h1>
          <Link
            href="/#projects"
            className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-300"
        >
          <span aria-hidden="true">←</span> Back to Portfolio
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 sm:text-sm">
            Project Details / {project.category}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 leading-7 text-gray-400">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            {project.status}
          </div>
        </header>

        <section className="mt-10 overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/60 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-500">Project Preview</span>
          </div>
          <div className="bg-gray-950 p-3 sm:p-6">
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              className="max-h-[560px] w-full rounded-2xl object-contain object-center"
            />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-gray-950 transition hover:bg-cyan-300"
          >
            <span aria-hidden="true">↗</span> View GitHub Repository
          </a>

          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-4 font-bold text-cyan-200 transition hover:bg-cyan-400/20"
            >
              <span aria-hidden="true">▶</span> Open Live Demo
            </a>
          ) : (
            <div
              aria-disabled="true"
              title="Add the deployed project URL to enable this button."
              className="inline-flex min-h-14 cursor-not-allowed items-center justify-center gap-3 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-4 font-semibold text-gray-500"
            >
              <span aria-hidden="true">◷</span> Live Demo Coming Soon
            </div>
          )}
        </section>

        <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Overview
            </p>
            <h2 className="mt-3 text-2xl font-bold">Project Highlights</h2>
            <ul className="mt-6 space-y-4">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-cyan-400" aria-hidden="true">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Getting Started
            </p>
            <h2 className="mt-3 text-2xl font-bold">How to Try It</h2>
            <ul className="mt-6 space-y-3">
              {project.requirements.map((requirement) => (
                <li key={requirement} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-cyan-400" aria-hidden="true">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-gray-400">
              {project.instructions}
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              Read the source code and setup files →
            </a>
          </div>
        </section>

        <footer className="mt-14 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © 2026 Janine Luces · Project Portfolio
        </footer>
      </div>
    </main>
  );
}
