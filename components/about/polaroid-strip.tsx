"use client";

import {
  BriefcaseBusiness,
  Braces,
  Box,
  Code2,
  GraduationCap,
  Rocket,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type HighlightCard = {
  id: string;
  rotate: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
};

const HIGHLIGHTS: HighlightCard[] = [
  {
    id: "education",
    rotate: -8,
    title: "B.Sc. in ICE",
    subtitle: "NSTU · 2023",
    icon: <GraduationCap />,
  },
  {
    id: "frontend",
    rotate: 6,
    title: "Frontend",
    subtitle: "React · Next.js",
    icon: <Code2 />,
  },
  {
    id: "experience",
    rotate: -4,
    title: "3+ Years",
    subtitle: "Professional Experience",
    icon: <BriefcaseBusiness />,
  },
  {
    id: "typescript",
    rotate: 7,
    title: "TypeScript",
    subtitle: "Scalable Applications",
    icon: <Braces />,
  },
  {
    id: "threejs",
    rotate: -6,
    title: "Three.js",
    subtitle: "Interactive 3D",
    icon: <Box />,
  },
  {
    id: "career",
    rotate: 5,
    title: "2023 → Present",
    subtitle: "Building for the Web",
    icon: <Rocket />,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function HighlightCard({
  card,
  index,
}: {
  card: HighlightCard;
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });

  const sy = useSpring(my, {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });

  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (
    e: React.PointerEvent<HTMLDivElement>
  ): void => {
    const el = ref.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const max = 18;
    const k = 0.25;

    mx.set(
      Math.max(-max, Math.min(max, dx * k))
    );

    my.set(
      Math.max(-max, Math.min(max, dy * k))
    );
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{
        opacity: 0,
        y: -120,
        filter: "blur(18px)",
        rotate: card.rotate,
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotate: card.rotate,
      }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: card.rotate,
      }}
      className="
        group
        relative
        aspect-[3/4]
        w-[clamp(6rem,11vw,9rem)]
        shrink-0
        overflow-hidden
        rounded-2xl
        border-6
        border-neutral-300/40
        bg-white
        p-1.5
        shadow-sm
        transition-shadow
        duration-300
        hover:shadow-xl
        dark:border-white/15
        dark:bg-neutral-900
      "
    >
      {/* Dotted background */}
      <DottedPattern
        className="
          absolute
          inset-0
          h-full
          w-full
          rounded-xl
          opacity-60
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          flex-col
          items-center
          justify-center
          rounded-xl
          bg-white/70
          px-2
          text-center
          backdrop-blur-[2px]
          dark:bg-neutral-950/70
        "
      >
        {/* Icon */}
        <div
          className="
            mb-3
            flex
            size-12
            items-center
            justify-center
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            text-neutral-900
            shadow-sm
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:-translate-y-1
            dark:border-white/10
            dark:bg-white/5
            dark:text-white
          "
        >
          <div className="size-6">
            {card.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="
            text-sm
            font-semibold
            tracking-tight
            text-neutral-900
            sm:text-base
            dark:text-white
          "
        >
          {card.title}
        </h3>

        {/* Subtitle */}
        <p
          className="
            mt-1
            max-w-[110px]
            text-[10px]
            leading-tight
            text-neutral-500
            sm:text-xs
            dark:text-neutral-400
          "
        >
          {card.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-[clamp(8rem,15vw,12rem)] w-full"
      />
    );
  }

  return (
    <div
      className="
        flex
        w-full
        flex-wrap
        items-start
        justify-center
        gap-1
        px-4
        sm:gap-1.5
        sm:px-8
      "
    >
      {HIGHLIGHTS.map((card, index) => (
        <HighlightCard
          key={card.id}
          card={card}
          index={index}
        />
      ))}
    </div>
  );
}