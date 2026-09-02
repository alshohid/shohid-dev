import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";

const PORTRAIT_SRC = "/me.webp";
const PORTRAIT_HOVER_SRC = "/me2.webp";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-foreground text-[20px] leading-tight font-medium tracking-tight">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m Shohid.
            </p>

            <h1 className="text-foreground text-[2.35rem] leading-[1.05] font-medium tracking-tight md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block whitespace-nowrap">
                Frontend Engineer &
              </span>
              <span className="block whitespace-nowrap">AI Enthusiast</span>
            </h1>

            <p className="text-foreground/65 text-[1rem] max-w-[40ch] md:text-[1.125rem] leading-[1.4] text-justify tracking-tight">
              Frontend Engineer with 3.3+ years of experience and 20+ professional projects across CRM, POS, and ERP systems. I build scalable, high-performance web applications with React, Next.js, and TypeScript, driven by strong problem-solving skills and 800+ solved programming problems. Passionate about AI, clean architecture, and building intuitive digital products.
            </p>
            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="border-foreground/8 bg-background relative aspect-square w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm md:max-w-105">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_HOVER_SRC}
                  alt="Shohid portrait"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
