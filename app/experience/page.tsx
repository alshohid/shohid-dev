import { createMetadata } from "@/lib/metadata";
import ExperienceSection from "@/components/experience/Experiences";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
    title: "Experience",
    description: "My professional work experience and career timeline.",
    path: "/experience",
});

export default function ExperiencePage(): ReactNode {
    return (
        <main
            id="main-content"
            className="flex flex-1 flex-col bg-[#050816] text-white"
        >
            <div className="pt-28 sm:pt-36">
                <ExperienceSection />
            </div>
            <div className="h-16 sm:h-24" />
        </main>
    );
}
