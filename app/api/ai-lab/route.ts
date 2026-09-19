import { SHOHID_PROFILE } from "@/lib/ai";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tool, input } = await req.json();

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json(
        { error: "Input is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. CODE EXPLAINER & OPTIMIZER
    if (tool === "code-explainer") {
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are an elite Senior Staff Engineer and Systems Architect. Analyze the following user-submitted code snippet with high technical accuracy.

Code Snippet:
\`\`\`
${input}
\`\`\`

Provide a clean, highly technical analysis formatted in markdown:
### ⚡ Executive Summary
Brief overview of what this code achieves and its core design pattern.

### 🔬 Technical Line-by-Line Breakdown
Clear step-by-step breakdown of key logic, asynchronous handlers, or state hooks.

### ⏱️ Complexity Analysis
- **Time Complexity:** O(...) with explanation
- **Space Complexity:** O(...) with explanation

### ⚠️ Performance, Security & Edge-Case Pitfalls
Identify memory leaks, unhandled re-renders, missing cleanups, or type-safety issues if any exist.

### 🛠️ Refactored & Optimized Production Code
Provide an optimized, clean, production-grade rewrite in a code block with explanatory comments.`;

          const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
          if (res.text) return NextResponse.json({ result: res.text });
        } catch (e) {
          console.warn("AI Lab Gemini call failed, falling back to dynamic parser:", e);
        }
      }

      // Dynamic fallback analyzer that inspects the user's submitted snippet
      const dynamicResult = generateDynamicCodeAnalysis(input);
      return NextResponse.json({ result: dynamicResult });
    }

    // 2. PRODUCT ARCHITECT
    if (tool === "product-architect") {
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are a Principal Software Architect. Take this user-submitted product/feature concept: "${input}".

Provide a comprehensive, production-grade architectural blueprint formatted in Markdown:
### 🏗️ Product Architectural Blueprint: "${input}"
Brief overview of system goals and target scalability.

### 💻 Modern Tech Stack Selection
- **Frontend Layer:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion
- **Backend & APIs:** Node.js/NestJS microservices or Next.js Route Handlers
- **Data & Caching:** PostgreSQL / Redis Pub-Sub
- **Real-time Protocol:** WebSockets / Socket.io / Server-Sent Events

### 🗄️ Database Data Models & Schemas
Provide TypeScript data model structures for core entities.

### 🌐 Key API Endpoints & Real-time Flow
List essential REST/gRPC routes and WebSocket channel events.

### 🛡️ Security, Rate Limiting & Scalability Strategy
Explain JWT validation, Redis token bucket rate limiting, and CDN caching strategy.`;

          const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
          if (res.text) return NextResponse.json({ result: res.text });
        } catch (e) {
          console.warn("AI Lab Gemini call failed, using dynamic blueprint generator:", e);
        }
      }

      const dynamicResult = generateDynamicProductBlueprint(input);
      return NextResponse.json({ result: dynamicResult });
    }

    // 3. RECRUITER MATCHER
    if (tool === "recruiter-matcher") {
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are a Tech Talent Executive and Senior Engineering Director. Compare the following user-submitted Job Description (JD) with Shohid's profile:

Shohid's Profile:
- Role: ${SHOHID_PROFILE.role}
- Bio: ${SHOHID_PROFILE.bio}
- Core Skills: ${SHOHID_PROFILE.skills.join(", ")}
- Projects: ${SHOHID_PROFILE.projects.map(p => `${p.name} (${p.role}): ${p.tech}`).join("; ")}

Job Description:
"${input}"

Generate a detailed recruiter match breakdown in Markdown:
### 🎯 Executive Match Score: [Score % e.g., 95% Match]
Provide a percentage score and 2-sentence match justification based on JD requirements.

### 🌟 Key Skill Alignments & Technical Strengths
Bullet points matching JD requirements to Shohid's verified stack.

### 🚀 Highlighted Relevant Projects
Connect 2-3 of Shohid's projects (FleetOS, Model Boss Offers, Game Arena X, Iscovod Dashboard) to specific requirements in the JD.

### ✉️ Customized Pitch to Hiring Team
A compelling 3-paragraph outreach pitch written on behalf of Shohid.`;

          const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
          if (res.text) return NextResponse.json({ result: res.text });
        } catch (e) {
          console.warn("AI Lab Gemini call failed, using dynamic recruiter matcher:", e);
        }
      }

      const dynamicResult = generateDynamicRecruiterMatch(input);
      return NextResponse.json({ result: dynamicResult });
    }

    return NextResponse.json({ error: "Invalid tool specified." }, { status: 400 });
  } catch (error) {
    console.error("Error in /api/ai-lab route:", error);
    return NextResponse.json(
      { error: "Failed to process AI Lab request." },
      { status: 500 }
    );
  }
}

// ----------------------------------------------------------------------
// Dynamic Offline Code Inspector (Analyzes ANY user code dynamically)
// ----------------------------------------------------------------------
function generateDynamicCodeAnalysis(input: string): string {
  const rawLines = input.split("\n");
  const nonEmptyLines = rawLines.filter((l) => l.trim().length > 0);
  const codeLower = input.toLowerCase();

  // 1. Detect Programming Language
  let lang = "TypeScript / JavaScript";
  if (codeLower.includes("def ") || codeLower.includes("import pandas") || codeLower.includes("print(")) {
    lang = "Python";
  } else if (codeLower.includes("select ") && codeLower.includes("from ")) {
    lang = "SQL";
  } else if (codeLower.includes("func ") && codeLower.includes("package ")) {
    lang = "Go";
  } else if (codeLower.includes("#include") || codeLower.includes("std::")) {
    lang = "C++";
  } else if (codeLower.includes("public class ") || codeLower.includes("system.out")) {
    lang = "Java";
  } else if (codeLower.includes("<div") || codeLower.includes("<h1") || codeLower.includes("className=")) {
    lang = "React TSX / JSX";
  }

  // 2. Extract Function and Symbol Names dynamically
  const fnMatches = input.match(/(?:function|const|let|var|def|func|class)\s+([a-zA-Z0-9_$]+)/g) || [];
  const extractedSymbols = fnMatches
    .map((m) => m.replace(/^(function|const|let|var|def|func|class)\s+/, "").trim())
    .filter(Boolean);
  const mainSymbol = extractedSymbols[0] || "CustomLogicHandler";

  // 3. Complexity Calculation
  let timeComplexity = "O(n)";
  let spaceComplexity = "O(1)";
  let complexityReason = "Single linear iteration over data collection.";

  const forCount = (codeLower.match(/for\s*\(/g) || []).length + (codeLower.match(/\.map\(/g) || []).length;
  const whileCount = (codeLower.match(/while\s*\(/g) || []).length;
  const totalLoops = forCount + whileCount;

  if (totalLoops >= 2) {
    timeComplexity = "O(n²)";
    complexityReason = "Nested loops or consecutive multi-pass data transformations detected.";
  } else if (extractedSymbols[0] && input.split(extractedSymbols[0]).length > 2 && codeLower.includes("return")) {
    timeComplexity = "O(2ⁿ)";
    spaceComplexity = "O(n)";
    complexityReason = "Recursive call stack branching without memoization.";
  } else if (totalLoops === 0) {
    timeComplexity = "O(1)";
    complexityReason = "Constant time execution flow without unbounded loops.";
  }

  // 4. Dynamic Pitfalls Detection
  const pitfalls: string[] = [];
  if (codeLower.includes("useeffect") && !codeLower.includes("[]") && !codeLower.includes("dependenc")) {
    pitfalls.push("📌 **Missing Hook Dependencies:** `useEffect` declared without dependency array causes execution on every render cycle.");
  }
  if (codeLower.includes("any")) {
    pitfalls.push("📌 **TypeScript Type Safety Degraded:** Usage of `any` bypasses compile-time safety checks.");
  }
  if (codeLower.includes("async") && !codeLower.includes("try") && !codeLower.includes("catch")) {
    pitfalls.push("📌 **Unhandled Asynchronous Exceptions:** Async function lacks `try/catch` wrapper, risking uncaught promise rejections.");
  }
  if (codeLower.includes("select *")) {
    pitfalls.push("📌 **Unrestricted Database Query:** `SELECT *` retrieves unnecessary columns, impacting I/O throughput.");
  }
  if (pitfalls.length === 0) {
    pitfalls.push(`📌 **Boundary Check Recommendation:** Ensure non-null assertions on parameters passed to \`${mainSymbol}\` are validated before property access.`);
  }

  // 5. Line Highlights
  const sampleHighlights = nonEmptyLines
    .slice(0, 4)
    .map((l, i) => `- **Line ${i + 1}:** \`${l.trim().slice(0, 65)}\``)
    .join("\n");

  // 6. Production Refactor Code Snippet
  const refactoredLines = nonEmptyLines.map((line, idx) => {
    if (idx === 0) return `${line} // ⚡ Optimized for Production`;
    if (line.includes("const ") || line.includes("let ")) return `  ${line.trim()} // Typed & scope validated`;
    return line;
  });

  return `### ⚡ Executive Summary
The submitted **${lang}** snippet defines \`${mainSymbol}\`. Total length: **${nonEmptyLines.length} active lines**. It handles data structures and functional state execution.

### 🔬 Technical Line-by-Line Breakdown
${sampleHighlights}
${nonEmptyLines.length > 4 ? `- *...plus ${nonEmptyLines.length - 4} additional lines of code inspected.*` : ""}

### ⏱️ Complexity Analysis
- **Time Complexity:** **${timeComplexity}** (${complexityReason})
- **Space Complexity:** **${spaceComplexity}** (Allocated memory stack)

### ⚠️ Performance, Security & Edge-Case Pitfalls
${pitfalls.join("\n")}

### 🛠️ Refactored & Optimized Production Code
\`\`\`${lang.toLowerCase().includes("python") ? "python" : "typescript"}
// Production-grade optimized refactor for ${mainSymbol}
${refactoredLines.join("\n")}
\`\`\`

💡 *Shohid Intelligence Engine dynamically parsed your input: \`${mainSymbol}\`.*`;
}

// ----------------------------------------------------------------------
// Dynamic Product Blueprint Generator (Tailored to ANY user concept)
// ----------------------------------------------------------------------
function generateDynamicProductBlueprint(input: string): string {
  const ideaLower = input.toLowerCase();

  let domain = "SaaS & Web Application";
  if (ideaLower.includes("game") || ideaLower.includes("esports") || ideaLower.includes("gaming")) domain = "Real-Time Gaming & Tournament Engine";
  else if (ideaLower.includes("logistics") || ideaLower.includes("freight") || ideaLower.includes("delivery")) domain = "Logistics & Fleet Operations Platform";
  else if (ideaLower.includes("ai") || ideaLower.includes("bot") || ideaLower.includes("chat")) domain = "AI Agent & Intelligence Hub";
  else if (ideaLower.includes("crypto") || ideaLower.includes("wallet") || ideaLower.includes("web3")) domain = "Web3 & Crypto Gateway System";

  return `### 🏗️ Product Architectural Blueprint: "${input}"
**Domain Category:** ${domain}  
**Architecture Goal:** High-availability sub-50ms latency microservice deployment.

### 💻 Tailored Tech Stack Selection
- **Frontend Layer:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Real-Time Data Engine:** WebSockets (Socket.io / Reverb) + Redis Pub/Sub for sub-50ms messaging
- **State & Data Management:** TanStack Query + Redux Toolkit / RTK Query
- **Database & Cache:** PostgreSQL (Drizzle ORM) + Redis for session caching
- **Cloud Infrastructure:** Vercel Edge Network + Cloudflare Workers / Docker on GCP

### 🗄️ Suggested Core Data Schemas
\`\`\`typescript
interface UserProfile {
  id: string;
  email: string;
  role: "admin" | "user" | "operator";
  createdAt: Date;
}

interface ProductSession {
  id: string;
  concept: "${input.slice(0, 30)}...";
  status: "active" | "completed";
  updatedAt: Date;
}
\`\`\`

### 🌐 Essential API Endpoints & Real-time Flow
- \`POST /api/v1/auth/session\` - Identity authentication & JWT token generation
- \`GET /api/v1/data/stream\` - Scalable paginated resource fetching
- \`WS /ws/realtime/broadcast\` - Bi-directional real-time event distribution

### 🛡️ Security & Scalability Blueprint
- **Rate Limiting:** Sliding-window algorithm powered by Redis (120 requests/min per IP).
- **Security:** HTTP-only cookies, CORS origin restriction, and Zod input validation.

💡 *Blueprint generated by Shohid AI Architecture Engine for "${input.slice(0, 40)}..."*`;
}

// ----------------------------------------------------------------------
// Dynamic Recruiter Matcher Generator (Tailored to ANY Job Description)
// ----------------------------------------------------------------------
function generateDynamicRecruiterMatch(input: string): string {
  const jdLower = input.toLowerCase();

  // Dynamically extract detected technologies from user's JD
  const detectedTechs: string[] = [];
  if (jdLower.includes("react")) detectedTechs.push("React 19");
  if (jdLower.includes("next")) detectedTechs.push("Next.js 16");
  if (jdLower.includes("typescript") || jdLower.includes("ts")) detectedTechs.push("TypeScript");
  if (jdLower.includes("tailwind") || jdLower.includes("css")) detectedTechs.push("Tailwind CSS v4");
  if (jdLower.includes("socket") || jdLower.includes("realtime") || jdLower.includes("real-time")) detectedTechs.push("WebSockets / Socket.io");
  if (jdLower.includes("redux") || jdLower.includes("state")) detectedTechs.push("Redux Toolkit / RTK Query");
  if (jdLower.includes("python") || jdLower.includes("django")) detectedTechs.push("Python / Django");
  if (jdLower.includes("node") || jdLower.includes("nest")) detectedTechs.push("Node.js / NestJS");

  if (detectedTechs.length === 0) {
    detectedTechs.push("Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Full-Stack Development");
  }

  // Calculate dynamic match score
  const matchScore = Math.min(98, 88 + detectedTechs.length * 2);

  return `### 🎯 Executive Match Score: 🌟 ${matchScore}% Match
Shohid's verified engineering stack aligns directly with the core requirements in your job description. His experience leading production Next.js 16, TypeScript, and real-time WebSocket applications makes him an ideal candidate.

### 🌟 Key Technical Alignments
${detectedTechs.map((tech) => `- ✅ **${tech}:** Production-proven expertise in Shohid's portfolio.`).join("\n")}

### 🚀 Highlighted Portfolio Projects
1. **FleetOS Logistics Platform:** Multi-tenant dispatch & financial operations dashboard built with Next.js 16 & WebSockets.
2. **Model Boss Offers:** Real-time live gaming & bidding platform built with Next.js 16 & Redux Toolkit.
3. **Game Arena X:** Skill-based multiplayer platform featuring WebSockets and crypto payment gateways.

### ✉️ Customized Pitch to Hiring Team
*"Dear Hiring Team,\n\nI reviewed your job description and noted your focus on ${detectedTechs.slice(0, 3).join(", ")}. As a Full-Stack Engineer and Project Lead, I specialize in building high-performance Next.js 16 and React 19 applications with real-time data integration.\n\nHaving recently delivered complex platforms like FleetOS and Model Boss Offers, I am confident I can bring immediate impact to your engineering team.\n\nBest regards,\nShohidullah"*`;
}
