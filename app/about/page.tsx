import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto text-justify w-full max-w-280 px-6 pt-20 sm:px-10 sm:pt-28">
        <FadeIn delay={0.5}>
          Hello! I’m <strong>Shohidullah Biswas</strong>.

          A <strong>Frontend Software Developer</strong> with <strong>3.3+ years of experience</strong> building scalable, production-grade applications with <strong>React, Next.js, and TypeScript</strong>. I graduated from <strong>Noakhali Science and Technology University (NSTU)</strong> in <strong>2023</strong> with a degree in <strong>Information and Communication Engineering</strong>.

          I’ve solved <strong>800+ problems across online judges</strong>, strengthening my problem-solving and analytical skills. I’ve worked at <strong>Celltron EMS</strong> and <strong>Polygon Technology</strong>, and currently work as a <strong>Lead Frontend Engineer</strong> at <strong>Softvence Delta</strong>, focusing on frontend architecture, scalable solutions, performance, and technical leadership. I also have experience with <strong>NestJS, PostgreSQL, Prisma, and Docker</strong>, and I’m continuously growing toward becoming a well-rounded <strong>Full-Stack Software Engineer</strong>.

        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[70rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            {/* <Experience />
            <Education /> */}
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
