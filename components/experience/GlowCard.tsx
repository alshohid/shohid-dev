import { useRef } from "react";
import gsap from "gsap";

interface ExperienceCard {
    review: string;
    imgPath: string;
    logoPath: string;
    title: string;
    date: string;
    responsibilities: string[];
}

interface GlowCardProps {
    card: ExperienceCard;
    children: React.ReactNode;
    className?: string;
}

const GlowCard = ({
    card,
    children,
    className = "",
}: GlowCardProps) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        const currentCard = cardRef.current;

        if (!currentCard) return;

        const rect = currentCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        const mouseX = x - centerX;
        const mouseY = y - centerY;

        let angle =
            Math.atan2(mouseY, mouseX) * (180 / Math.PI);

        angle = (angle + 360) % 360;

        currentCard.style.setProperty(
            "--start",
            `${angle + 60}`
        );

        gsap.to(currentCard, {
            rotateX,
            rotateY,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = () => {
        const currentCard = cardRef.current;

        if (!currentCard) return;

        gsap.to(currentCard, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`card card-border timeline-card rounded-xl p-6 md:p-10 mb-5 break-inside-avoid-column ${className}`}
        >
            <div className="glow" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }, (_, i) => (
                    <img
                        key={i}
                        src="/images/star.png"
                        alt="star"
                        loading="lazy"
                        className="size-5"
                    />
                ))}
            </div>

            {/* Review */}
            <div className="mb-6">
                <p className="text-white-50 text-base md:text-lg leading-7">
                    {card.review}
                </p>
            </div>

            {children}
        </div>
    );
};

export default GlowCard;