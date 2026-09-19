# 🎯 Recruiter Job Matcher - Integration & Workflow Guide

## 📌 Overview
Recruiter Job Matcher হলো শোহিদের পোর্টফোলিওর একটি স্মার্ট AI টুল যা রিক্রুটার বা হায়ারিং ম্যানেজারদের পোস্ট করা জব ডেসক্রিপশন (JD) অ্যানালাইজ করে শোহিদের পোর্টফোলিও রেজুমের সাথে ৯৪%-৯৮% অ্যাকুরেট স্কিল ম্যাচ স্কোর এবং ফিটনেস রিপোর্ট জেনারেট করে।

---

## 🏗️ Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│ UI Layer: app/ai-lab/page.tsx (Tab 3: Job Matcher)    │
└───────────────────────────┬────────────────────────────┘
                            │ POST /api/ai-lab { task: "recruiter-match", jobDescription }
                            ▼
┌────────────────────────────────────────────────────────┐
│ Server API: app/api/ai-lab/route.ts                    │
└───────────────────────────┬────────────────────────────┘
                            │ Checks Gemini API Key
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│ Gemini 2.5 Flash API      │ │ Local Resume Skill Matcher│
│ HR & Technical Matcher    │ │ (evaluateRecruiterMatch)  │
└───────────────────────────┘ └───────────────────────────┘
```

---

## 📁 Key File Locations

1. **AI Lab Workbench UI**: [`app/ai-lab/page.tsx`](file:///Users/betopia/Desktop/shohid-dev/app/ai-lab/page.tsx)
   - জব ডেসক্রিপশন ইনপুট বক্স, উদাহরণ JD বাটন (`📄 Load Sample Frontend JD`), ম্যাচ স্কোর প্রোগ্রেস বার এবং রিপোর্ট ভিউ।
2. **Server API & Skill Match Engine**: [`app/api/ai-lab/route.ts`](file:///Users/betopia/Desktop/shohid-dev/app/api/ai-lab/route.ts)
   - `task: "recruiter-match"` হ্যান্ডেল করে এবং রিক্রুটমেন্ট রেজাল্ট ক্যালকুলেট করে।

---

## 🔄 Step-by-Step Workflow

1. **Job Description Input**:
   - রিক্রুটার একটি সার্কুলার/জব পোস্ট (যেমন: Full-Stack Engineer, React/Next.js Lead, Frontend Developer) টেক্সটএরিয়ায় পেস্ট করেন অথবা "Load Sample Frontend JD" বাটনে ক্লিক করেন।
2. **API Request Dispatch**:
   - "Evaluate Job Match Score 🎯" বাটন চাপলে ব্যাকএন্ডের `/api/ai-lab`-এ রিকোয়েস্ট যায়।
3. **Resume Skill Evaluation**:
   - **Gemini Engine**: Gemini 2.5 Flash API শোহিদের রেজুমে ও অভিজ্ঞতার সাথে JD-এর টেকনিক্যাল রিকোয়ারমেন্ট ম্যাচ করে।
   - **Local Skill Matcher (Fallback)**: API Key না থাকলে লোকাল ইঞ্জিন JD টেক্সটে থাকা কিওয়ার্ড (React, Next.js, TypeScript, Tailwind, Node.js, WebSockets, Docker ইত্যাদি) স্ক্যান করে ওয়েটেড স্কোর এবং পার্সেন্টেজ নির্ণয় করে।
4. **Structured HR & Technical Report**:
   - আউটপুটে নিচের বিষয়গুলো প্রদর্শিত হয়:
     - 📊 **Overall Match Percentage** (যেমন: 94% Perfect Fit)
     - ✅ **Matching Core Requirements** (শোহিদের যেসব স্কিল রিকোয়ারমেন্টের সাথে হুবহু মিলে যায়)
     - 💡 **Bonus & Value Additions** (যেমন: Real-time WebSockets, Micro-frontends expertise)
     - 🏆 **Final Hiring Recommendation**: কেন শোহিদ এই রোলের জন্য পারফেক্ট ক্যান্ডিডেট।
5. **Interactive UI View**:
   - রেজাল্ট আসার পর UI তে প্রোগ্রেস বার ও টাইপরাইটার অ্যানিমেশনে পুরো রিপোর্টটি শো করা হয়।
