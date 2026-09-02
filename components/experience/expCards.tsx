export interface ExperienceCard {
    review: string;
    imgPath: string;
    logoPath: string;
    title: string;
    date: string;
    responsibilities: string[];
}

export const expCards: ExperienceCard[] = [
    {
        review:
            "At Betopia, Shohid is contributing as a Frontend Developer with a strong focus on polished UI, dependable delivery, and product-minded execution across live web experiences.",
        imgPath: "/images/exp4.svg",
        logoPath: "/images/logos/betopia.svg",
        title: "Frontend Developer - Betopia",
        date: "November 2026 - Present",
        responsibilities: [
            "Builds and improves user-facing product features with attention to responsiveness, usability, and clean interface behavior.",
            "Works with product, design, and backend teammates to turn platform requirements into clear frontend experiences.",
            "Maintains reusable UI structure and visual consistency across Betopia's web surfaces.",
        ],
    },
    {
        review:
            "Shohid brings strong visual judgment and frontend discipline to every build. He balances polish, responsiveness, and maintainable structure in a way that helps products feel premium in the browser.",
        imgPath: "/images/exp2.png",
        logoPath: "/images/logo2.png",
        title: "Frontend Developer",
        date: "November 2024 - December 2025",
        responsibilities: [
            "Built user-facing product features with a focus on smooth interaction and responsive behavior.",
            "Worked closely with design and product direction to translate ideas into reliable frontend delivery.",
            "Improved visual consistency and code quality across real-world interface work.",
        ],
    },
    {
        review:
            "From internal tooling to user-facing experiences, Shohid consistently approaches delivery with practical problem-solving and close attention to detail.",
        imgPath: "/images/exp1.png",
        logoPath: "/images/logo1.png",
        title: "Frontend Developer (On-site)",
        date: "August 2023 - October 2024",
        responsibilities: [
            "Delivered scalable frontend work that supported ongoing product and platform improvements.",
            "Collaborated with backend engineers to align APIs, data flow, and UI behavior.",
            "Contributed to cleaner implementation patterns and more reliable user journeys.",
        ],
    },
];