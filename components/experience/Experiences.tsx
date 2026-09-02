
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowCard from "./GlowCard";
import { expCards } from "./expCards";
import TitleHeader from "./TitleHeader";


gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            const rows =
                gsap.utils.toArray<HTMLElement>(".experience-row");

            rows.forEach((row) => {
                const cardPanel =
                    row.querySelector<HTMLElement>(
                        ".experience-card-panel"
                    );

                const detailPanel =
                    row.querySelector<HTMLElement>(
                        ".experience-detail-panel"
                    );

                const logo =
                    row.querySelector<HTMLElement>(".timeline-logo");

                const progress =
                    row.querySelector<HTMLElement>(
                        ".experience-rail-progress"
                    );

                const responsibilities =
                    row.querySelectorAll<HTMLElement>(
                        ".experience-list li"
                    );

                const isReverse =
                    row.dataset.direction === "reverse";

                // --------------------------------
                // Initial state
                // --------------------------------

                if (cardPanel) {
                    gsap.set(cardPanel, {
                        autoAlpha: 0,
                        x: isReverse ? 80 : -80,
                        y: 30,
                        rotateX: 8,
                        transformPerspective: 1000,
                    });
                }

                if (detailPanel) {
                    gsap.set(detailPanel, {
                        autoAlpha: 0,
                        x: isReverse ? -60 : 60,
                        y: 30,
                    });
                }

                if (logo) {
                    gsap.set(logo, {
                        autoAlpha: 0,
                        scale: 0.4,
                        rotate: -25,
                    });
                }

                gsap.set(responsibilities, {
                    autoAlpha: 0,
                    y: 18,
                });

                if (progress) {
                    gsap.set(progress, {
                        height: "0%",
                    });
                }

                // --------------------------------
                // Timeline
                // --------------------------------

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 75%",
                        end: "bottom 45%",
                        toggleActions: "play none none reverse",
                    },
                });

                // --------------------------------
                // Card reveal
                // --------------------------------

                if (cardPanel) {
                    tl.to(cardPanel, {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        rotateX: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    });
                }

                // --------------------------------
                // Detail reveal
                // --------------------------------

                if (detailPanel) {
                    tl.to(
                        detailPanel,
                        {
                            autoAlpha: 1,
                            x: 0,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                        },
                        "-=0.65"
                    );
                }

                // --------------------------------
                // Logo pop
                // --------------------------------

                if (logo) {
                    tl.to(
                        logo,
                        {
                            autoAlpha: 1,
                            scale: 1,
                            rotate: 0,
                            duration: 0.65,
                            ease: "back.out(1.7)",
                        },
                        "-=0.65"
                    );
                }

                // --------------------------------
                // Responsibilities stagger
                // --------------------------------

                if (responsibilities.length > 0) {
                    tl.to(
                        responsibilities,
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.45,
                            stagger: 0.1,
                            ease: "power2.out",
                        },
                        "-=0.35"
                    );
                }

                // --------------------------------
                // Timeline progress
                // --------------------------------

                if (progress) {
                    tl.to(
                        progress,
                        {
                            height: "100%",
                            duration: 1.2,
                            ease: "power2.inOut",
                        },
                        0
                    );
                }

                // --------------------------------
                // Logo pulse
                // --------------------------------

                if (logo) {
                    gsap.to(logo, {
                        boxShadow:
                            "0 0 0 0 rgba(56,189,248,0), 0 0 35px rgba(56,189,248,0.25)",
                        duration: 1.8,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: 1,
                    });
                }
            });
        },
        {
            scope: sectionRef,
            dependencies: [],
        }
    );

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="section-shell">
                <TitleHeader
                    title="Professional Work Experience"
                    sub="💼 My Career Overview"
                />

                <div className="experience-stack">
                    {expCards.map((card: any, index: number) => {
                        const isReverse = index % 2 === 1;

                        return (
                            <article
                                key={card.title}
                                data-direction={
                                    isReverse ? "reverse" : "forward"
                                }
                                className="experience-row"
                            >
                                {/* Timeline */}
                                <div
                                    className="experience-rail"
                                    aria-hidden="true"
                                >
                                    <span className="experience-rail-track" />

                                    <span className="experience-rail-progress" />

                                    <div className="timeline-logo">
                                        <img
                                            src={card.logoPath}
                                            alt={`${card.title} logo`}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="experience-content">
                                    {/* Experience Card */}
                                    <div
                                        className={`experience-card-panel ${isReverse
                                            ? "xl:col-start-3"
                                            : "xl:col-start-1"
                                            } xl:row-start-1`}
                                    >
                                        <GlowCard

                                            card={card}
                                            className="mb-0 h-full"
                                        >
                                            <div className="experience-image-wrapper">
                                                <img
                                                    src={card.imgPath}
                                                    alt={card.title}
                                                    loading="lazy"
                                                />
                                            </div>
                                        </GlowCard>
                                    </div>

                                    {/* Experience Details */}
                                    <div
                                        className={`experience-detail-panel ${isReverse
                                            ? "xl:col-start-1"
                                            : "xl:col-start-3"
                                            } xl:row-start-1`}
                                    >
                                        <p className="experience-kicker">
                                            Role and impact
                                        </p>

                                        <h3 className="experience-title">
                                            {card.title}
                                        </h3>

                                        <p className="experience-date">
                                            🗓️ {card.date}
                                        </p>

                                        <p className="experience-subtitle">
                                            Responsibilities
                                        </p>

                                        <ul className="experience-list">
                                            {card.responsibilities.map(
                                                (responsibility: any) => (
                                                    <li key={responsibility}>
                                                        {responsibility}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;