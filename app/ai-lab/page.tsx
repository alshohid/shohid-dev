"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
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
  FastForward,
  Bot,
  Sliders,
  CheckCircle2,
  FileCode2,
  Trash2,
  RotateCcw,
  Palette,
  Eye,
  Code,
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion-primitives";

type TabKey = "code-explainer" | "product-architect" | "ui-builder" | "recruiter-matcher";

const TABS: { id: TabKey; label: string; icon: typeof Code2 }[] = [
  { id: "code-explainer", label: "Code Optimizer", icon: Code2 },
  { id: "product-architect", label: "Product Blueprint", icon: Cpu },
  { id: "ui-builder", label: "UI Builder & Sandbox", icon: Palette },
  { id: "recruiter-matcher", label: "Recruiter Matcher", icon: UserCheck },
];

const SAMPLE_CODE = `// Real-Time Socket Hook in Next.js 16 & React 19
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
  "Multi-tenant Freight Logistics Platform with live GPS tracking & sub-50ms WebSockets",
  "Real-time 1v1 Esports Tournament Bidding Platform with live leaderboards & JWT auth",
  "AI-powered Automated Code Review & Architectural PR Inspector SaaS",
];

const SAMPLE_JDS = [
  "Senior Full-Stack Engineer with 3+ years in Next.js 16, React 19, TypeScript, WebSockets, Redux Toolkit, and scalable UI design systems.",
  "Lead Frontend Developer skilled in Tailwind CSS v4, Framer Motion animations, real-time dashboards, and WebGL integration.",
];

const SAMPLE_UI_PROMPTS = [
  "Glassmorphism SaaS Pricing Card with Monthly/Yearly toggle & glowing CTA",
  "Dark Theme Analytics Dashboard Hero Card with live sparkline stats & ping badge",
  "Cyberpunk E-Commerce Product Card with size selector & gradient borders",
  "Neumorphic Task Kanban Card with priority tags & drag handles",
];

function extractHtmlCode(text: string): string | null {
  const match = text.match(/```html([\s\S]*?)```/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

export default function AILabPage(): ReactNode {
  const [activeTab, setActiveTab] = useState<TabKey>("code-explainer");

  // Inputs
  const [codeSnippet, setCodeSnippet] = useState<string>(SAMPLE_CODE);
  const [productIdea, setProductIdea] = useState<string>(SAMPLE_IDEAS[0] || "");
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JDS[0] || "");
  const [uiPrompt, setUiPrompt] = useState<string>(SAMPLE_UI_PROMPTS[0] || "");

  // Results, Streaming & Loading
  const [loading, setLoading] = useState(false);
  const [fullResult, setFullResult] = useState<string | null>(null);
  const [streamedOutput, setStreamedOutput] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [outputViewMode, setOutputViewMode] = useState<"preview" | "code">("preview");

  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  // Typewriter streaming effect (ChatGPT-style)
  const startStreaming = (text: string) => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setFullResult(text);
    setStreamedOutput("");
    setIsStreaming(true);

    let currentIndex = 0;
    const chunkSize = 4; // characters per tick
    const speed = 14; // ms tick speed

    streamIntervalRef.current = setInterval(() => {
      currentIndex += chunkSize;
      if (currentIndex >= text.length) {
        setStreamedOutput(text);
        setIsStreaming(false);
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
      } else {
        setStreamedOutput(text.slice(0, currentIndex));
      }
    }, speed);
  };

  const skipStreaming = () => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    if (fullResult) {
      setStreamedOutput(fullResult);
      setIsStreaming(false);
    }
  };

  // Auto-scroll output container while streaming
  useEffect(() => {
    if (isStreaming && outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [streamedOutput, isStreaming]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const runTool = async (tool: TabKey, input: string) => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setFullResult(null);
    setStreamedOutput("");
    setIsStreaming(false);

    try {
      const res = await fetch("/api/ai-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, input }),
      });
      const data = await res.json();
      const outputText = data.result || data.error || "Failed to generate AI output.";
      startStreaming(outputText);
    } catch (err) {
      console.error(err);
      const errMsg = "Error communicating with AI Lab server. Please try again.";
      startStreaming(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (isStreaming && streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setIsStreaming(false);
    setStreamedOutput("");
    setFullResult(null);
  };

  const copyToClipboard = () => {
    if (!streamedOutput) return;
    navigator.clipboard.writeText(streamedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = codeSnippet.split("\n").length;

  return (
    <main id="main-content" className="mx-auto w-full max-w-275 px-3.5 sm:px-10 pt-28 pb-24 sm:pt-36">
      {/* Hero Header */}
      <FadeIn className="flex flex-col items-center text-center gap-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-xs backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
          <span>Shohid Intelligence Studio</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            v2.5 Neural Engine
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground">
          Interactive AI Workbench
        </h1>
        <p className="max-w-[44ch] text-base sm:text-lg text-foreground/65 leading-relaxed">
          Test real-time code analysis, system architectural blueprints, and job description matching powered by Shohid&apos;s custom AI engine.
        </p>
      </FadeIn>

      {/* Tabs Navigation Bar */}
      <FadeIn delay={0.08} className="mb-8 flex justify-center w-full">
        <div className="relative grid grid-cols-2 sm:grid-cols-4 w-full max-w-3xl items-center justify-center gap-1.5 rounded-2xl border border-foreground/12 bg-background/90 p-1.5 shadow-sm backdrop-blur-xl">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`relative z-10 flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none text-center ${
                  isActive
                    ? "text-background"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 -z-10 rounded-xl bg-foreground shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Main Grid Workbench */}
      <FadeIn delay={0.12}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Input Controls */}
          <div className="rounded-3xl border border-foreground/12 bg-background/95 p-3.5 sm:p-6 shadow-md backdrop-blur-xl flex flex-col gap-5">
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
                      <FileCode2 className="h-4 w-4 text-emerald-500" />
                      IDE Code Editor
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCodeSnippet("")}
                        title="Clear code"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => setCodeSnippet(SAMPLE_CODE)}
                        title="Reset sample code"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/60 hover:text-foreground underline underline-offset-2 cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" /> Sample
                      </button>
                    </div>
                  </div>

                  {/* High-End IDE Editor Card with data-lenis-prevent */}
                  <div
                    data-lenis-prevent
                    className="relative rounded-2xl border border-foreground/15 bg-foreground/[0.04] overflow-hidden shadow-inner flex flex-col"
                  >
                    {/* IDE Header Bar */}
                    <div className="flex items-center justify-between border-b border-foreground/10 px-3 py-2 sm:px-4 bg-foreground/[0.05]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 text-[11px] font-mono text-foreground/75 font-semibold flex items-center gap-1">
                          main.ts
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-foreground/50">{lineCount} lines</span>
                    </div>

                    {/* Code Editor Body with Synchronized Line Numbers */}
                    <div data-lenis-prevent className="flex h-72 sm:h-80 overflow-hidden relative">
                      {/* Line Numbers Column */}
                      <div className="select-none py-2.5 px-1 sm:py-3 sm:px-2 text-right text-[10px] sm:text-[11px] font-mono text-foreground/30 border-r border-foreground/10 bg-foreground/[0.02] flex flex-col leading-relaxed min-w-[28px] sm:min-w-[36px]">
                        {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
                          <span key={i + 1}>{i + 1}</span>
                        ))}
                      </div>

                      {/* Textarea Input with data-lenis-prevent & scroll */}
                      <textarea
                        data-lenis-prevent
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        placeholder="// Paste or type your code here..."
                        style={{ touchAction: "pan-y" }}
                        className="flex-1 bg-transparent p-2.5 sm:p-3 text-xs font-mono text-foreground placeholder:text-foreground/40 focus:outline-none resize-none leading-relaxed overflow-y-auto overflow-x-auto whitespace-pre scrollbar-thin overscroll-contain"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={loading || !codeSnippet.trim()}
                    onClick={() => runTool("code-explainer", codeSnippet)}
                    className="group relative flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-lg transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer overflow-hidden"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                    )}
                    {loading ? "Analyzing AST & Logic..." : "Analyze & Optimize Code"}
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
                    data-lenis-prevent
                    rows={6}
                    value={productIdea}
                    onChange={(e) => setProductIdea(e.target.value)}
                    placeholder="e.g. A real-time AI collaborative editor with presence indicators..."
                    style={{ touchAction: "pan-y" }}
                    className="w-full rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none resize-none leading-relaxed shadow-inner overflow-y-auto scrollbar-thin max-h-48 overscroll-contain"
                  />

                  <div>
                    <span className="block text-[12px] font-semibold text-foreground/70 mb-2">
                      Preset Concepts:
                    </span>
                    <div className="flex flex-col gap-2">
                      {SAMPLE_IDEAS.map((idea) => (
                        <button
                          key={idea}
                          type="button"
                          onClick={() => setProductIdea(idea)}
                          className={`text-left rounded-xl border p-3 text-xs font-medium transition-all cursor-pointer ${
                            productIdea === idea
                              ? "border-foreground/30 bg-foreground/10 text-foreground font-semibold"
                              : "border-foreground/10 bg-foreground/[0.02] text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                          }`}
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
                    className="group relative flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-lg transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer overflow-hidden"
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

              {activeTab === "ui-builder" && (
                <motion.div
                  key="ui-builder"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col gap-4"
                >
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Palette className="h-4 w-4 text-indigo-500" />
                    Describe UI Component / Layout Concept
                  </label>

                  <textarea
                    data-lenis-prevent
                    rows={6}
                    value={uiPrompt}
                    onChange={(e) => setUiPrompt(e.target.value)}
                    placeholder="e.g. Glassmorphism SaaS Pricing Card with Monthly/Yearly toggle..."
                    style={{ touchAction: "pan-y" }}
                    className="w-full rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none resize-none leading-relaxed shadow-inner overflow-y-auto scrollbar-thin max-h-48 overscroll-contain"
                  />

                  <div>
                    <span className="block text-[12px] font-semibold text-foreground/70 mb-2">
                      Preset UI Concepts:
                    </span>
                    <div className="flex flex-col gap-2">
                      {SAMPLE_UI_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => setUiPrompt(prompt)}
                          className={`text-left rounded-xl border p-3 text-xs font-medium transition-all cursor-pointer ${
                            uiPrompt === prompt
                              ? "border-foreground/30 bg-foreground/10 text-foreground font-semibold"
                              : "border-foreground/10 bg-foreground/[0.02] text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                          }`}
                        >
                          🎨 {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={loading || !(uiPrompt || "").trim()}
                    onClick={() => runTool("ui-builder", uiPrompt || "")}
                    className="group relative flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-lg transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer overflow-hidden"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Palette className="h-4 w-4 transition-transform group-hover:scale-110" />
                    )}
                    {loading ? "Building Component UI..." : "Build Component & Live Sandbox"}
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
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-emerald-500" />
                    Paste Job Description (JD)
                  </label>

                  <textarea
                    data-lenis-prevent
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job requirements here..."
                    style={{ touchAction: "pan-y" }}
                    className="w-full rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none resize-none leading-relaxed shadow-inner overflow-y-auto scrollbar-thin max-h-48 overscroll-contain"
                  />

                  <div>
                    <span className="block text-[12px] font-semibold text-foreground/70 mb-2">
                      Sample Job Descriptions:
                    </span>
                    <div className="flex flex-col gap-2">
                      {SAMPLE_JDS.map((jd, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setJobDescription(jd)}
                          className={`text-left rounded-xl border p-3 text-xs font-medium transition-all cursor-pointer ${
                            jobDescription === jd
                              ? "border-foreground/30 bg-foreground/10 text-foreground font-semibold"
                              : "border-foreground/10 bg-foreground/[0.02] text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                          }`}
                        >
                          📋 Sample #{idx + 1}: {jd}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={loading || !(jobDescription || "").trim()}
                    onClick={() => runTool("recruiter-matcher", jobDescription || "")}
                    className="group relative flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-lg transition-all hover:opacity-95 disabled:opacity-40 cursor-pointer overflow-hidden"
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

          {/* Right Column - ChatGPT-Style Streamed Output Display */}
          <div className="rounded-3xl border border-foreground/12 bg-background/95 p-3.5 sm:p-6 shadow-md backdrop-blur-xl flex flex-col gap-4 min-h-[500px]">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-foreground/10 pb-3.5 gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-foreground text-background shadow-xs">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                    Shohid AI Analysis Output
                    {isStreaming && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                      </span>
                    )}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Switcher for UI Builder & HTML outputs */}
                {extractHtmlCode(streamedOutput) && (
                  <div className="flex items-center rounded-xl border border-foreground/15 bg-foreground/5 p-1 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setOutputViewMode("preview")}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                        outputViewMode === "preview"
                          ? "bg-foreground text-background shadow-xs font-bold"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <Eye className="h-3 w-3" /> Live Sandbox
                    </button>
                    <button
                      type="button"
                      onClick={() => setOutputViewMode("code")}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                        outputViewMode === "code"
                          ? "bg-foreground text-background shadow-xs font-bold"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <Code className="h-3 w-3" /> Code & Specs
                    </button>
                  </div>
                )}

                {isStreaming && (
                  <button
                    type="button"
                    onClick={skipStreaming}
                    className="inline-flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer"
                  >
                    <FastForward className="h-3 w-3" /> Skip Typing
                  </button>
                )}

                {streamedOutput && (
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/12 bg-background px-3 py-1 text-xs font-medium text-foreground/80 hover:bg-foreground/5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Output Box */}
            <div
              ref={outputContainerRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-3.5 sm:p-5 text-sm leading-relaxed text-foreground scrollbar-thin relative min-h-[380px]"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-80 text-center gap-3 text-foreground/60">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-2xl border-2 border-foreground border-t-transparent animate-spin" />
                    <Sparkles className="h-5 w-5 absolute inset-0 m-auto text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Executing Shohid AI Neural Analysis...</p>
                    <p className="text-[11px] text-foreground/40 mt-0.5">Evaluating AST logic, Big-O complexity & production patterns</p>
                  </div>
                </div>
              ) : streamedOutput ? (
                <div className="space-y-3 font-sans text-xs sm:text-sm leading-relaxed">
                  {outputViewMode === "preview" && extractHtmlCode(streamedOutput) ? (
                    <div className="flex flex-col gap-4">
                      <IframeLivePreview htmlCode={extractHtmlCode(streamedOutput)!} />
                      <RenderRichMarkdown text={streamedOutput} />
                    </div>
                  ) : (
                    <RenderRichMarkdown text={streamedOutput} />
                  )}
                  {isStreaming && (
                    <span className="inline-block h-4 w-2 bg-amber-500 animate-pulse ml-1 align-middle rounded-xs" />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center gap-3 text-foreground/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5 border border-foreground/10">
                    <Sliders className="h-6 w-6 text-foreground/60" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Select a tool on the left and click analyze.</p>
                    <p className="text-[11px] text-foreground/40 mt-1">ChatGPT-style streaming character output & live sandbox will render here.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Metrics */}
            {streamedOutput && (
              <div className="flex items-center justify-between text-[10.5px] font-mono text-foreground/40 px-1 border-t border-foreground/5 pt-2">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-3 w-3" /> Output Generated
                </span>
                <span>{streamedOutput.length} characters streamed</span>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </main>
  );
}

// Live Iframe Renderer for Tailwind CSS UI Components
function IframeLivePreview({ htmlCode }: { htmlCode: string }): ReactNode {
  const srcDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        margin: 0;
        padding: 1.5rem;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
    </style>
  </head>
  <body>
    ${htmlCode}
  </body>
</html>`;

  return (
    <div className="w-full rounded-2xl border border-foreground/15 bg-slate-950/90 overflow-hidden shadow-inner flex flex-col my-2">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 bg-slate-900/80">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px] font-mono text-slate-300 font-semibold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Tailwind CSS Component Sandbox
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Interactive Preview</span>
      </div>

      <div className="p-3 sm:p-6 bg-slate-950/60 min-h-[320px] flex items-center justify-center overflow-auto">
        <iframe
          title="UI Component Live Preview"
          srcDoc={srcDoc}
          className="w-full h-80 sm:h-96 border-0 rounded-xl bg-transparent"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}

// Custom Markdown & Code Block Renderer for AI Lab
function RenderRichMarkdown({ text }: { text: string }): ReactNode {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const lang = (lines[0] || "").trim();
          const code = (lang ? lines.slice(1) : lines).join("\n");
          const isMermaid = lang.toLowerCase() === "mermaid" || lang.toLowerCase() === "erdiagram" || lang.toLowerCase() === "er";
          const isSql = lang.toLowerCase() === "sql";

          if (isMermaid) {
            return (
              <div key={index} className="my-4 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 dark:bg-emerald-950/40 p-4 font-mono text-xs overflow-x-auto shadow-md backdrop-blur-md">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20 mb-3">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    📊 Entity-Relationship Diagram (ERD)
                  </span>
                  <span className="text-[10px] text-emerald-300/60 font-sans">Mermaid Schema</span>
                </div>
                <pre className="whitespace-pre overflow-x-auto leading-relaxed text-emerald-200/90 font-mono text-[11px] sm:text-xs p-2 bg-black/40 rounded-xl border border-emerald-500/10">
                  <code>{code}</code>
                </pre>
              </div>
            );
          }

          return (
            <div key={index} className="my-3 rounded-2xl border border-foreground/20 bg-foreground/95 text-background p-4 font-mono text-xs overflow-x-auto shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-background/20 mb-2.5">
                <span className="text-[10.5px] text-background/60 font-semibold uppercase tracking-wider">
                  {isSql ? "🗄️ SQL DDL Schema" : lang || "code"}
                </span>
                <span className="text-[10.5px] text-background/40">Architectural Schema</span>
              </div>
              <pre className="whitespace-pre overflow-x-auto leading-relaxed text-background/95">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split("\n");
        return (
          <div key={index} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              if (!line.trim()) return <div key={lIdx} className="h-1" />;

              if (line.startsWith("### ")) {
                return (
                  <h4 key={lIdx} className="text-sm font-bold text-foreground mt-4 mb-1.5 flex items-center gap-1.5 border-b border-foreground/8 pb-1">
                    {line.replace("### ", "")}
                  </h4>
                );
              }
              if (line.startsWith("#### ")) {
                return (
                  <h5 key={lIdx} className="text-xs font-bold text-foreground mt-3 mb-1">
                    {line.replace("#### ", "")}
                  </h5>
                );
              }

              const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
              const content = isBullet ? line.trim().substring(2) : line;

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{parseFormattedInline(content)}</span>
                  </div>
                );
              }

              return <p key={lIdx} className="leading-relaxed">{parseFormattedInline(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

function parseFormattedInline(str: string): ReactNode[] {
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = str.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[11.5px] text-foreground font-medium">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
