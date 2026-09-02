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
            "Leading frontend development across multiple production projects, focusing on scalable architecture, polished user experiences, and reliable delivery.",

        imgPath: "/softvence.png",
        logoPath: "/softvence.png",
        title: "Executive Frontend - Softvence Delta",
        date: "October 2025 - Present",

        responsibilities: [
            "Lead frontend development across multiple projects using React, Next.js, TypeScript, and ShadCN UI.",

            "Architect and deliver scalable, maintainable, and production-ready frontend applications.",

            "Lead project implementation, code reviews, and frontend technical decisions.",

            "Perform usability testing and resolve bugs to support ongoing production and maintenance.",
        ],
    },

    {
        review:
            "Developed and maintained production frontend experiences for DARTSLIVE, with a focus on reusable architecture, responsive interfaces, and reliable live application delivery.",

        imgPath: "/exp2.png",
        logoPath: "/logo2.png",
        title: "Front End Engineer - Polygon Technology",
        date: "September 2024 - October 2025",

        responsibilities: [
            "Architected scalable frontend interfaces for DARTSLIVE using JavaScript and reusable component architecture.",

            "Built and maintained user-facing features for production web applications.",

            "Collaborated with the team to deliver reliable frontend solutions for live products.",

            "Performed usability testing and resolved frontend bugs to improve application stability.",
        ],
    },

    {
        review:
            "Worked across frontend and backend development for ERP software, delivering new features, resolving production issues, and supporting client-facing requirements.",

        imgPath: "/exp1.png",
        logoPath: "/logo1.png",
        title: "Jr. Software Engineer - Celltron EMS",
        date: "August 2023 - August 2024",

        responsibilities: [
            "Worked as a full-stack developer on ERP software, implementing new features and resolving bugs based on business requirements.",

            "Conducted R&D for new feature implementation and collaborated with the team to evaluate and select suitable solutions.",

            "Worked across frontend and backend components to support end-to-end feature development.",

            "Handled client communication and provided production support for deployed applications.",
        ],
    },
];