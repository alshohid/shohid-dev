import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Compass,
  Gamepad2,
  Github,
  Layers,
  LineChart,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: "loom",
    icon: Sparkles,
    iconLabel: "Multi-Tenant Logistics Management Platform",
    title:
      "Production-grade freight and logistics platform for dispatching loads, managing carriers, tracking shipments, and handling finances.",
    description:
      "Multi-role logistics platform with isolated workspaces, secure JWT authentication, load dispatching, carrier management, live tracking, financial operations, reporting, and responsive UI.",
    meta: "Project Lead , 2025",
    techStack: ["Next.js 16 ", "TypeScript", "Socket.io", "Redux Toolkit / RTK Query"],
    githubUrl: "https://github.com/alshohid/reedsexpress",
    liveUrl: "https://fleetos.pro",
    imageRatio: 752 / 497,
    image: "/projects/fleetos.jpg",
    imageAlt: "FleetOS multi-tenant logistics management platform mockup",
  },
  {
    id: "atlas",
    icon: Compass,
    iconLabel: "REAL Timing Bidding System",
    title: "A production-grade, competitive live-gaming platform for 1v1 tournaments, real-time supporter battles, featured gaming matches, and point-based player support.",
    description:
      "Built with Next.js 16 (App Router), Redux Toolkit, Laravel Echo (Reverb WebSockets), and Tailwind CSS v4 — uniting a public tournament discovery hub, an OTP-secured player experience, and a comprehensive super-admin console in one cohesive web application.",
    meta: "Project Lead, 2025",
    techStack: ["Next.js 16 ", "TypeScript", "Laravel Echo (Reverb WebSockets)", "Redux Toolkit / RTK Query"],
    githubUrl: "https://github.com/alshohid/model-jai",
    liveUrl: "https://modelbossoffers.com/",
    imageRatio: 1024 / 768,
    image: "/projects/modelbossoffers.jpg",
    imageAlt: "Model Boss Offers real-time bidding system mockup",
  },
  {
    id: "game-arena",
    icon: Gamepad2,
    iconLabel: "Game Arena Platform",
    title: "Skill-Based Multiplayer Gaming Platform",
    description:
      "A production-grade, role-based gaming platform featuring live multiplayer matches, TRON wallet payments, in-app purchases, real-time support, and comprehensive admin operations.",
    meta: "Frontend Engineer",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Redux Toolkit / RTK Query",
      "Tailwind CSS 4",
      "shadcn/ui",
      "WebSocket",
      "TRON / TronWeb",
    ],
    githubUrl: "https://github.com/backbencherstudio/demencigames-front-end",
    liveUrl: "https://www.gamearenax.com/",
    imageRatio: 1024 / 768,
    image: "/projects/game-arena.jpg",
    imageAlt: "Skill-based multiplayer gaming platform",
  },
  {
    id: "groove",
    icon: Wand2,
    iconLabel: "Iscovod digital music distribution platform",
    title:
      "A production-grade, role-based management dashboard for the Iscovod digital music distribution platform.",
    description:
      "Built with Next.js 16 (App Router), Redux Toolkit, and Tailwind CSS — powering artist release management, subscription billing, real-time notifications, and platform administration in one cohesive web application.",
    meta: "Project Lead, 2026",
    techStack: ["Next.js 16 ", "TypeScript", "Socket.io", "Redux Toolkit / RTK Query"],
    githubUrl: "https://github.com/alshohid/zvonsystem-dashboard",
    liveUrl: "https://dashboard.discovod.com/",
    imageRatio: 1024 / 768,
    image: "/projects/iscovod-dashboard.jpg",
    imageAlt: "Iscovod digital music distribution platform mockup",
  },
  {
    id: "fieldnote",
    icon: Layers,
    iconLabel: "Fieldnote",
    title:
      "A pocket sized research tool for design teams that want to get out of their docs and into the world.",
    description:
      "Capture quotes, tag patterns, and synthesize themes in one place. The interface stays out of the way so the thinking can happen.",
    meta: "Design Engineer, 2024",
    techStack: ["Next.js 16 ", "TypeScript", "Socket.io", "Redux Toolkit / RTK Query"],
    githubUrl: "https://github.com/alshohid/fieldnote",
    liveUrl: "https://fieldnote.example.com/",
    imageRatio: 1024 / 768,
    image: "/projects/dartslive.png",
    imageAlt: "Fieldnote pocket sized research tool mockup",
  },
  {
    id: "talkback",
    icon: Bot,
    iconLabel: "Yousuf Engineering AI Chatbot",
    title: "HVAC & Engineering Solutions",
    description:
      "A modern engineering and e-commerce platform for Yousuf Engineering, showcasing HVAC solutions, AC and VRF/VRV services, engineering products, and professional installation and maintenance services.",
    meta: "Frontend Engineer, 2024",
    techStack: ["Next.js 16 ", "TypeScript", "Context api / Tanstack Query"],
    githubUrl: "https://github.com/farhanOkobiz/yousuf-engineering",
    liveUrl: "https://yousufengineering.com/",
    imageRatio: 1024 / 768,
    image: "/projects/yousuf-engineering.png",
    imageAlt: "Yousuf Engineering friendlier interface for talking to language models mockup",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="text-foreground font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              From playful experiments to thoughtful systems, a look at the work
              I&rsquo;m proud to have shipped.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card border-foreground/8 bg-background flex cursor-pointer flex-col gap-4 rounded-3xl border p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
            <Icon className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-foreground text-sm font-medium tracking-tight">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="project-card__image ring-foreground/5 bg-foreground/5 relative w-full overflow-hidden rounded-2xl ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-foreground text-[20px] leading-[1.2] font-medium tracking-tight sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-foreground/65 text-[14px] leading-normal tracking-tight sm:text-[15px]">
            {project.description}
          </p>
        </div>

        {project.techStack?.length ? (
          <ul
            aria-label="Technologies used"
            className="flex flex-wrap gap-1.5 px-1"
          >
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="border-foreground/10 bg-foreground/5 text-foreground/60 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <footer className="flex flex-wrap items-center justify-between gap-2 px-1 pb-2">
          <p className="text-foreground/50 text-[12px] tracking-tight">
            Role: {project.meta}
          </p>
          {project.githubUrl || project.liveUrl ? (
            <div className="flex items-center gap-1.5">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring border-foreground/8 hover:bg-foreground/5 hover:text-foreground text-foreground/70 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] font-medium tracking-tight transition-colors"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  Code
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring border-foreground/8 hover:bg-foreground/5 hover:text-foreground text-foreground/70 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] font-medium tracking-tight transition-colors"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  Live
                </a>
              ) : null}
            </div>
          ) : null}
        </footer>
      </article>
    </FadeIn>
  );
}
