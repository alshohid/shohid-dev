"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Trash2,
  ChevronDown,
  ArrowDown,
  Loader2,
  ExternalLink,
  MessageSquare,
  Wand2,
} from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
};

const QUICK_PROMPTS = [
  { label: "⚡ Core Tech Stack", query: "What is Shohid's core tech stack and skills?" },
  { label: "🚀 Featured Projects", query: "Tell me about Shohid's top featured projects" },
  { label: "💼 Available for Hire?", query: "Is Shohid available for freelance or full-time roles?" },
  { label: "📫 How to Contact", query: "How can I contact or hire Shohid?" },
];

function FormattedText({ text }: { text: string }): ReactNode {
  const rawLines = text.split("\n");
  const nonEmptyLines = rawLines.filter((l) => l.trim().length > 0);
  const firstLine = nonEmptyLines[0] || "";

  // If single line without lists, render inline span for tight bubble width
  if (nonEmptyLines.length === 1 && !firstLine.trim().startsWith("- ") && !firstLine.trim().startsWith("* ")) {
    return <span className="break-words text-xs sm:text-[13.5px] leading-snug">{parseFormattedString(firstLine)}</span>;
  }

  return (
    <div className="space-y-1 text-xs sm:text-[13.5px] leading-relaxed break-words">
      {rawLines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
        const content = isBullet ? line.trim().substring(2) : line;
        const parts = parseFormattedString(content);

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/80" />
              <span className="flex-1 leading-normal">{parts}</span>
            </div>
          );
        }

        return <div key={idx} className="leading-relaxed">{parts}</div>;
      })}
    </div>
  );
}

function parseFormattedString(str: string): ReactNode[] {
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = str.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-blue-500 hover:text-blue-600 underline font-medium break-all"
          >
            {match[1]}
            <ExternalLink className="h-3 w-3 inline shrink-0" />
          </a>
        );
      }
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[11.5px] text-foreground font-medium break-all"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function PortfolioChat(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Hi there! I'm **Shohid AI**.\n\nAsk me anything about Shohid's expertise in **Next.js 16**, **React 19**, **TypeScript**, **Real-Time WebSockets**, or his featured projects like **FleetOS** & **Game Arena X**!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isOpen]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isFarFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight > 120;
    setShowScrollBottomBtn(isFarFromBottom);
  };

  const handleSend = async (userQuery?: string) => {
    const textToSend = userQuery || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInput("");
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("model" as const),
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history }),
      });

      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.reply || "Sorry, I encountered an issue. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Failed to fetch AI chat reply", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I am having trouble connecting to the AI server. Please try asking again!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: "Conversation cleared! What else would you like to know about Shohid's work?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Shohid AI Assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-2 ring-foreground/20 backdrop-blur-md transition-all duration-300 cursor-pointer"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-purple-500 to-indigo-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />

          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
          </span>

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="sparkles"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center relative z-10"
              >
                <Sparkles className="h-6 w-6 transition-transform group-hover:rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            data-lenis-prevent
            className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-[420px] rounded-3xl border border-foreground/15 bg-background/95 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex flex-col overflow-hidden h-[560px] max-h-[82vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 px-4 sm:px-5 py-3.5 bg-foreground/[0.03]">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 text-background font-bold shadow-md">
                  <Bot className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-foreground flex items-center gap-1.5">
                    Shohid AI
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      v2.5 Live Core
                    </span>
                  </h3>
                  <p className="text-[10.5px] sm:text-[11px] text-foreground/60">Portfolio & Tech Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={clearChat}
                  title="Clear chat"
                  className="rounded-xl p-1.5 sm:p-2 text-foreground/50 hover:bg-foreground/8 hover:text-foreground transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  className="rounded-xl p-1.5 sm:p-2 text-foreground/50 hover:bg-foreground/8 hover:text-foreground transition-colors cursor-pointer"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Chat Body Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 sm:space-y-4 text-sm overscroll-contain relative scrollbar-thin"
              style={{ touchAction: "pan-y" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-foreground text-xs font-semibold shadow-xs mb-0.5">
                      <Wand2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </div>
                  )}

                  <div
                    className={`w-fit max-w-[82%] sm:max-w-[78%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xs tracking-tight ${
                      msg.sender === "user"
                        ? "bg-foreground text-background rounded-br-xs font-medium"
                        : "bg-foreground/[0.04] text-foreground border border-foreground/10 rounded-bl-xs"
                    }`}
                  >
                    <FormattedText text={msg.text} />
                    <span
                      className={`block mt-1 text-[9px] sm:text-[9.5px] font-mono tracking-wider opacity-60 ${
                        msg.sender === "user"
                          ? "text-right text-background/80"
                          : "text-left text-foreground/50"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-xl bg-foreground text-background text-xs font-semibold shadow-xs mb-0.5">
                      <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-foreground/60 text-xs py-1 px-1">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <span className="italic font-medium">Shohid AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Floating Scroll-to-Bottom Button */}
            <AnimatePresence>
              {showScrollBottomBtn && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  type="button"
                  onClick={() => scrollToBottom(true)}
                  className="absolute bottom-28 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quick Prompt Chips Container */}
            <div
              data-lenis-prevent
              className="px-3.5 sm:px-4 py-2 border-t border-foreground/8 bg-foreground/[0.01]"
            >
              <div
                data-lenis-prevent
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs"
                style={{ touchAction: "pan-x" }}
              >
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleSend(p.query)}
                    className="shrink-0 rounded-full border border-foreground/12 bg-background px-3 py-1 text-[11px] font-medium text-foreground/80 hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Bar */}
            <div className="p-3 border-t border-foreground/10 bg-background">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 rounded-2xl border border-foreground/15 bg-foreground/[0.02] px-3.5 py-1.5 sm:py-2 focus-within:border-foreground/40 focus-within:ring-2 focus-within:ring-foreground/10 transition-all"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Shohid's skills or projects..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-foreground text-background disabled:opacity-30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </form>
              <div className="mt-1 flex items-center justify-between px-1 text-[9.5px] sm:text-[10px] font-medium text-foreground/40">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-2.5 w-2.5" /> Direct portfolio QA
                </span>
                <span>Press Enter ↵</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
