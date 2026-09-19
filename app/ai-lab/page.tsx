"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Code2,
  Cpu,
  UserCheck,
  Play,
  Copy,
  Check,
  RefreshCw,
  Zap,
  Terminal,
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion-primitives";

type TabKey = "code-explainer" | "product-architect" | "recruiter-matcher";

const SAMPLE_CODE = `// Real-Time Socket Hook in Next.js 16
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useRealtimeData<T>(channel: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on(channel, (payload: T) => {
      setData(payload);
    });

    return () => {
      socket.disconnect();
    };
  }, [channel]);

  return data;
}`;

const SAMPLE_IDEAS = [
  "Multi-tenant Logistics Freight Dispatch System with live GPS tracking",
  "Real-time 1v1 Esports Tournament Bidding Platform with WebSockets",
  "AI-powered Code Review & Automated PR Summarizer SaaS",
];

const SAMPLE_JDS = [
  "Senior Full-Stack Engineer with 3+ years in Next.js, React 19, TypeScript, WebSockets, Redux Toolkit, and scalable UI design systems.",
  "Lead Frontend Developer skilled in Tailwind CSS v4, Framer Motion animations, real-time dashboards, and WebGL integration.",
];

export default function AILabPage(): ReactNode {
  const [activeTab, setActiveTab] = useState<TabKey>("code-explainer");

  // Inputs
  const [codeSnippet, setCodeSnippet] = useState<string>(SAMPLE_CODE);
  const [productIdea, setProductIdea] = useState<string>(SAMPLE_IDEAS[0] || "");
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JDS[0] || "");

  // Results & Loading
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const runTool = async (tool: TabKey, input: string) => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, input }),
      });
      const data = await res.json();
      setResult(data.result || data.error || "Failed to get AI output.");
    } catch (err) {
      console.error(err);
      setResult("Error processing AI request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="main-content" className="mx-auto w-full max-w-275 px-6 pt-32 pb-24 sm:px-10 sm:pt-40">
      {/* Hero Header */}
      <FadeIn className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
          <span>Interactive AI Lab & Workbench</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
            Shohid Intelligence Core
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground">
          Live AI Showcase
        </h1>
        <p className="max-w-[42ch] text-base sm:text-lg text-foreground/65 leading-relaxed">
          Test real-time AI capabilities built into Shohid&apos;s portfolio. Run code analysis, product blueprinting, and job matching live.
        </p>
      </FadeIn>

      {/* Tabs Navigation */}
      <FadeIn delay={0.1} className="mb-8 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-background/80 p-1.5 shadow-sm backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              setActiveTab("code-explainer");
              setResult(null);
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "code-explainer"
                ? "bg-foreground text-background shadow-md"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <Code2 className="h-4 w-4" />
            Code Explainer
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("product-architect");
              setResult(null);
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "product-architect"
                ? "bg-foreground text-background shadow-md"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <Cpu className="h-4 w-4" />
            Product Blueprint
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("recruiter-matcher");
              setResult(null);
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "recruiter-matcher"
                ? "bg-foreground text-background shadow-md"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Recruiter Matcher
          </button>
        </div>
      </FadeIn>

      {/* Tab Panels */}
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Input Controls */}
          <div className="rounded-3xl border border-foreground/10 bg-background/90 p-6 shadow-sm backdrop-blur-sm flex flex-col gap-5">
            <AnimatePresence mode="wait">
              {activeTab === "code-explainer" && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-foreground/70" />
                      Paste TypeScript / React Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setCodeSnippet(SAMPLE_CODE)}
                      className="text-[11px] text-foreground/60 hover:text-foreground underline underline-offset-2"
                    >
                      Load Sample
                    </button>
                  </div>

                  <textarea
                    rows={12}
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="// Paste code snippet here..."
                    className="w-full rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-4 text-xs font-mono text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none resize-none leading-relaxed"
                  />

                  <button
                    type="button"
                    disabled={loading || !codeSnippet.trim()}
                    onClick={() => runTool("code-explainer", codeSnippet)}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-md transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                    )}
                    {loading ? "Analyzing Code..." : "Analyze & Optimize Code"}
                  </button>
                </motion.div>
              )}

              {activeTab === "product-architect" && (
                <motion.div
                  key="product"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col gap-4"
                >
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Describe Product or Feature Concept
                  </label>

                  <textarea
                    rows={6}
                    value={productIdea}
                    onChange={(e) => setProductIdea(e.target.value)}
                    placeholder="e.g. A real-time AI collaborative editor with presence indicators..."
                    className="w-full rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none resize-none leading-relaxed"
                  />

                  <div>
                    <span className="block text-[12px] font-medium text-foreground/60 mb-2">
                      Or pick a preset concept:
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {SAMPLE_IDEAS.map((idea) => (
                        <button
                          key={idea}
                          type="button"
                          onClick={() => setProductIdea(idea)}
                          className="text-left rounded-xl border border-foreground/8 bg-foreground/[0.02] p-2.5 text-xs text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all"
                        >
                          👉 {idea}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={loading || !(productIdea || "").trim()}
                    onClick={() => runTool("product-architect", productIdea || "")}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-md transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    )}
                    {loading ? "Generating Blueprint..." : "Generate Architectural Blueprint"}
                  </button>
                </motion.div>
              )}

              {activeTab === "recruiter-matcher" && (
                <motion.div
                  key="recruiter"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-emerald-500" />
                      Paste Job Description (JD)
                    </label>
                  </div>

                  <textarea
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job requirements here..."
                    className="w-full rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none resize-none leading-relaxed"
                  />

                  <div>
                    <span className="block text-[12px] font-medium text-foreground/60 mb-2">
                      Or test with sample JD:
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {SAMPLE_JDS.map((jd, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setJobDescription(jd)}
                          className="text-left rounded-xl border border-foreground/8 bg-foreground/[0.02] p-2.5 text-xs text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all line-clamp-2"
                        >
                          📋 Sample JD #{idx + 1}: {jd}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={loading || !(jobDescription || "").trim()}
                    onClick={() => runTool("recruiter-matcher", jobDescription || "")}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-md transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <UserCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
                    )}
                    {loading ? "Calculating Match..." : "Calculate Match & Pitch"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - AI Output Display */}
          <div className="rounded-3xl border border-foreground/10 bg-background/90 p-6 shadow-sm backdrop-blur-sm flex flex-col gap-4 min-h-[460px]">
            <div className="flex items-center justify-between border-b border-foreground/8 pb-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Shohid Intelligence Output
              </h3>

              {result && (
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-background px-3 py-1 text-xs font-medium text-foreground/80 hover:bg-foreground/5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Output
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto rounded-2xl border border-foreground/8 bg-foreground/[0.02] p-5 text-sm leading-relaxed text-foreground scrollbar-thin">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 text-center gap-3 text-foreground/50">
                  <RefreshCw className="h-8 w-8 animate-spin text-foreground" />
                  <p className="text-xs font-medium">Processing with Shohid Intelligence Engine...</p>
                </div>
              ) : result ? (
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-normal">
                  {result}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center gap-3 text-foreground/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Select a tool on the left and click execute.</p>
                    <p className="text-[11px] text-foreground/30 mt-0.5">Real-time response will render here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
