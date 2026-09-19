# 💻 Code Explainer & Analyzer - Integration & Workflow Guide

## 📌 Overview
Code Explainer and Analyzer হলো AI Lab-এর একটি শক্তিশালী টুল যা ডেভেলপার ও ভিজিটরদের যেকোনো কোড ইনপুট দিলে তার বিস্তারিত লাইন-বাই-লাইন ব্যাখ্যা, টাইম ও স্পেস কমপ্লেক্সিটি ($O(N)$, $O(N^2)$), অপটিমাইজেশন টিপস এবং সিকিউরিটি চেক প্রদান করে। এতে কোড এডিটরটি VS Code IDE-এর মতো লাইন নম্বর সহ ডিজাইন করা হয়েছে এবং ChatGPT-এর মতো স্ট্রিম টাইপরাইটার ইফেক্টে রেজাল্ট আউটপুট দেয়।

---

## 🏗️ Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│ UI Layer: app/ai-lab/page.tsx                          │
│ (VS Code Style IDE + Typewriter Stream Output)        │
└───────────────────────────┬────────────────────────────┘
                            │ POST /api/ai-lab { task: "code-explain", code, language }
                            ▼
┌────────────────────────────────────────────────────────┐
│ Server API: app/api/ai-lab/route.ts                    │
└───────────────────────────┬────────────────────────────┘
                            │ Checks Gemini API Key
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│ Gemini 2.5 Flash API      │ │ AST Local Static Code     │
│ High-Accuracy LLM Analysis│ │ Parser (analyzeCodeLocally│
└───────────────────────────┘ └───────────────────────────┘
```

---

## 📁 Key File Locations

1. **AI Lab Workbench Page**: [`app/ai-lab/page.tsx`](file:///Users/betopia/Desktop/shohid-dev/app/ai-lab/page.tsx)
   - IDE এডিটর, ইনপুট টেক্সটএরিয়া, লাইন কাউন্টার, টাইপরাইটার অ্যানিমেশন লজিক এবং "Skip Typing ⏩" ফিচার নিয়ন্ত্রণ করে।
2. **Server API & Local Parser Route**: [`app/api/ai-lab/route.ts`](file:///Users/betopia/Desktop/shohid-dev/app/api/ai-lab/route.ts)
   - `task: "code-explain"` রিকোয়েস্ট রিসিভ করে এবং Gemini API অথবা AST Static Parser-এর মাধ্যমে ডাইনামিক অ্যানালাইসিস জেনারেট করে।

---

## 🔄 Step-by-Step Workflow

1. **User Code Input**:
   - ইউজার AI Lab-এর "Code Explainer" ট্যাবে যেকোনো প্রোগ্রামিং ল্যাঙ্গুয়েজের (JavaScript, TypeScript, Python, C++, Go, HTML/CSS) কোড পেস্ট করে বা টাইপ করে।
2. **IDE Line Counting & Styling**:
   - ইনপুট বক্সে লাইন নম্বর অটোমেটিক ক্যালকুলেট হয় এবং `data-lenis-prevent` থাকায় মাউস দিয়ে স্বাধীনভাবে স্ক্রোল করা যায়।
3. **API Request Dispatch**:
   - "Analyze & Explain Code ✨" বাটনে ক্লিক করলে ব্যাকএন্ডের `/api/ai-lab` এন্ডপয়েন্টে `code` এবং `language` পাঠানো হয়।
4. **Dynamic Code Parsing Engine**:
   - **Gemini API Mode**: Gemini 2.5 Flash API কোডটি অ্যানালাইজ করে প্রফেশনাল রিপোর্ট তৈরি করে।
   - **AST Local Parser Mode (Fallback)**: API Key না থাকলে লোকাল পার্সার লুপ ইনস্পেকশন, রিকার্শন ডিটেকশন এবং ডিওএম ডিপেনডেন্সি চেক করে সম্পূর্ণ নতুন ও ডাইনামিক বিশ্লেষণ প্রদান করে (একই ফিক্সড উত্তর দেয় না)।
5. **Typewriter Streaming Response**:
   - রেজাল্ট আসার পর `app/ai-lab/page.tsx`-এর টাইপরাইটার হুক অক্ষরে অক্ষরে (ChatGPT Style) স্ক্রিনে কোড এবং অ্যানালাইসিস রেন্ডার করে।
   - ইউজার চাইলে "Skip Typing ⏩" এ চাপ দিয়ে সাথে সাথে পুরো রেজাল্ট দেখতে পারে।

---

## 🚀 Highlighted Features

- **VS Code Inspired IDE**: ফাইল ট্যাব, লাইন নাম্বার কলাম, ফরমেট টেক্সট এবং কপি বাটন।
- **Dynamic AST Complexity Detector**: ফর-লুপ বা নেস্টেড লুপের ক্ষেত্রে সঠিক $O(N)$ বা $O(N^2)$ কমপ্লেক্সিটি নির্ণয় করে।
- **Lenis Smooth Scroll Isolation**: টেক্সটএরিয়ায় স্ক্রোল ব্লক হওয়া রোধ করার জন্য বিশেষ স্ক্রোল প্রিভেনশন যুক্ত।
