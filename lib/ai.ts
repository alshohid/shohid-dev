import { GoogleGenAI } from "@google/genai";

export const SHOHID_PROFILE = {
  name: "Shohidullah (Shoihidullah)",
  role: "Full-Stack Frontend & UI/UX Engineer / Project Lead",
  bio: "Passionate Full-Stack & Frontend Engineer specialized in building high-performance, real-time web applications with Next.js 16, React 19, TypeScript, WebSockets, Tailwind CSS v4, and modern UI animations.",
  skills: [
    "Next.js 16 & React 19",
    "TypeScript & JavaScript",
    "Tailwind CSS v4 & Glassmorphism UI",
    "GSAP & Framer Motion",
    "Redux Toolkit / RTK Query & Tanstack Query",
    "Socket.io & WebSockets (Laravel Echo / Reverb)",
    "Node.js, NestJS & Python/Django",
    "Matter.js, OGL (WebGL) & Shaders",
    "TRON / Web3 Integration",
    "UI/UX Design Systems & Accessibility (a11y)",
  ],
  projects: [
    {
      name: "FleetOS / ReedExpress",
      role: "Project Lead (2025)",
      tech: "Next.js 16, TypeScript, Socket.io, Redux Toolkit",
      description: "Multi-tenant logistics management platform for dispatching loads, tracking carriers, managing shipments, and financial operations.",
      liveUrl: "https://fleetos.pro",
      githubUrl: "https://github.com/alshohid/reedsexpress",
    },
    {
      name: "Model Boss Offers (Atlas)",
      role: "Project Lead (2025)",
      tech: "Next.js 16, TypeScript, Laravel Echo (Reverb WebSockets), Redux Toolkit",
      description: "Real-time bidding system & live-gaming platform for 1v1 tournaments, supporter battles, and point-based player support.",
      liveUrl: "https://modelbossoffers.com/",
      githubUrl: "https://github.com/alshohid/model-jai",
    },
    {
      name: "Game Arena X",
      role: "Frontend Engineer",
      tech: "Next.js 16, React 19, TypeScript, Redux, TRON/TronWeb, WebSockets",
      description: "Skill-based multiplayer gaming platform with live matches, TRON wallet payments, and admin operations.",
      liveUrl: "https://www.gamearenax.com/",
      githubUrl: "https://github.com/backbencherstudio/demencigames-front-end",
    },
    {
      name: "Iscovod Digital Music Dashboard",
      role: "Project Lead (2026)",
      tech: "Next.js 16, TypeScript, Socket.io, Redux Toolkit",
      description: "Management dashboard for digital music distribution powering artist release management, subscription billing, and real-time alerts.",
      liveUrl: "https://dashboard.discovod.com/",
      githubUrl: "https://github.com/alshohid/zvonsystem-dashboard",
    },
    {
      name: "DartsLive",
      role: "Design Engineer (2024)",
      tech: "Python, Django, JavaScript, Memcached, Tailwind CSS",
      description: "Connected darts platform for competitive play, online matches, leagues, and player statistics.",
      liveUrl: "https://www.dartslive.com/",
    },
    {
      name: "Yousuf Engineering AI & HVAC",
      role: "Frontend Engineer (2024)",
      tech: "Next.js 16, TypeScript, Tanstack Query",
      description: "HVAC & Engineering Solutions platform featuring engineering services, product catalogs, and AI assistant interface.",
      liveUrl: "https://yousufengineering.com/",
      githubUrl: "https://github.com/farhanOkobiz/yousuf-engineering",
    },
  ],
  contact: {
    github: "https://github.com/alshohid",
    email: "shohid.dev@example.com",
    availability: "Open for freelance projects, senior frontend / full-stack engineering roles, and AI integration consulting.",
  }
};

const SYSTEM_PROMPT = `
You are "Shohid AI", an intelligent, friendly, and versatile AI assistant representing Shohidullah (Shohid).

Core Responsibilities:
1. Portfolio Representative: Help visitors, recruiters, and clients learn about Shohid's skills, experience, projects, tech stack, and contact/hiring availability.
2. General AI Assistant: You MUST also answer ANY general question (such as general knowledge, science, animals like cows, coding, math, history, everyday facts) thoroughly, accurately, and naturally.

Shohid's Profile:
- Name: ${SHOHID_PROFILE.name}
- Role: ${SHOHID_PROFILE.role}
- Bio: ${SHOHID_PROFILE.bio}
- Core Skills: ${SHOHID_PROFILE.skills.join(", ")}
- Featured Projects:
${SHOHID_PROFILE.projects.map(p => `  * ${p.name} (${p.role}): ${p.description}. Tech: ${p.tech}. Live: ${p.liveUrl}`).join("\n")}
- Contact & Status: ${SHOHID_PROFILE.contact.availability} | GitHub: ${SHOHID_PROFILE.contact.github}

Instructions:
- Be warm, concise, professional, and helpful.
- You can answer in English, Bengali, or Banglish depending on the user's input language.
- Format responses nicely using Markdown (bullet points, bold text, code blocks where appropriate).
- Do NOT refuse or ignore non-portfolio questions! Answer general questions (e.g., "do you know about cow?", science, technology, general advice) comprehensively and directly.
- If relevant, feel free to add a gentle closing line reminding users they can also ask about Shohid's projects or tech stack.
`;

export async function generatePortfolioResponse(
  userMessage: string,
  history: Array<{ role: "user" | "model"; text: string }> = []
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    const candidateModels = [
      "gemini-flash-latest",
      "gemma-4-26b-a4b-it",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
    ];

    const ai = new GoogleGenAI({ apiKey });
    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood! I am Shohid AI, ready to assist portfolio visitors with accurate information about Shohid's expertise and projects, as well as answering any general knowledge or random questions." }] },
      ...history.map(h => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })),
      { role: "user", parts: [{ text: userMessage }] }
    ];

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
        });

        if (response.text) {
          return response.text;
        }
      } catch (err) {
        console.warn(`Gemini API call failed with model ${modelName}, trying fallback model:`, err);
      }
    }
  }

  // Fallback response when GEMINI_API_KEY is not set or all live API calls fail
  const query = userMessage.toLowerCase();
  
  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("কি পারো") || query.includes("দক্ষতা")) {
    return `**Shohid's Core Skills & Technologies:**\n\n` +
      `- **Frontend & UI:** Next.js 16, React 19, TypeScript, Tailwind CSS v4\n` +
      `- **Animations & Graphics:** GSAP, Framer Motion, Matter.js, WebGL (OGL)\n` +
      `- **Real-time & State:** WebSockets (Socket.io, Reverb), Redux Toolkit, RTK Query\n` +
      `- **Backend & Web3:** Node.js, NestJS, Python/Django, TRON/TronWeb\n\n` +
      `Feel free to ask about specific projects or hiring availability!`;
  }

  if (query.includes("project") || query.includes("work") || query.includes("প্রজেক্ট") || query.includes("কাজ")) {
    return `**Shohid's Top Highlighted Projects:**\n\n` +
      `1. **FleetOS / ReedExpress** - Multi-tenant logistics dispatch & tracking system.\n` +
      `2. **Model Boss Offers (Atlas)** - Real-time bidding & 1v1 live gaming tournament hub.\n` +
      `3. **Game Arena X** - Skill-based multiplayer platform with TRON crypto payments.\n` +
      `4. **Iscovod Dashboard** - Digital music distribution management platform.\n\n` +
      `You can check out full live links in the **Projects** page!`;
  }

  if (query.includes("hire") || query.includes("contact") || query.includes("job") || query.includes("যোগাযোগ") || query.includes("কাজের জন্য")) {
    return `**Looking to collaborate or hire Shohid?**\n\n` +
      `Shohid is available for **Full-Time engineering roles**, **Freelance Web/AI projects**, and **Technical Lead contracts**.\n\n` +
      `📌 GitHub: [github.com/alshohid](https://github.com/alshohid)\n` +
      `💬 You can also send a direct note via the Contact section on the homepage!`;
  }

  return `Hello! I'm **Shohid AI**. I can answer any general knowledge questions, as well as tell you all about Shohid's engineering background, projects (FleetOS, Game Arena X, Model Boss Offers), tech stack, and availability for hire.\n\nWhat would you like to know?`;
}
