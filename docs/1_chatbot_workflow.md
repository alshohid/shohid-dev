# 🤖 Shohid AI Portfolio Chatbot - Integration & Workflow Guide

## 📌 Overview
Shohid AI portfolio chatbot একটি ইন্টারেক্টিভ AI অ্যাসিস্ট্যান্ট যা ভিজিটর, রিক্রুটার এবং ক্লায়েন্টদের সংজ্ঞায়িত পোর্টফোলিও তথ্যের ভিত্তিতে রিয়েল-টাইম উত্তর প্রদান করে। এটি ভিজিটরদের শোহিদের স্কিল, প্রজেক্ট, টেক স্ট্যাক এবং কন্টাক্ট ইনফরমেশন সম্পর্কে বিস্তারিত ধারণা দেয়।

---

## 🏗️ Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│ Client UI: components/ai/portfolio-chat.tsx            │
│ (Mobile Bottom-Sheet / Desktop Floating Window)        │
└───────────────────────────┬────────────────────────────┘
                            │ POST /api/chat { message, history }
                            ▼
┌────────────────────────────────────────────────────────┐
│ Server Route: app/api/chat/route.ts                    │
└───────────────────────────┬────────────────────────────┘
                            │ Pulls System Prompt
                            ▼
┌────────────────────────────────────────────────────────┐
│ Context Provider: lib/ai.ts (SHOHID_PORTFOLIO_CONTEXT) │
└───────────────────────────┬────────────────────────────┘
                            │ Calls Google Gemini 2.5 Flash API
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fallback Engine (Local Engine if GEMINI_API_KEY missing│
└────────────────────────────────────────────────────────┘
```

---

## 📁 Key File Locations

1. **Client Chat Component**: [`components/ai/portfolio-chat.tsx`](file:///Users/betopia/Desktop/shohid-dev/components/ai/portfolio-chat.tsx)
   - ইউজার ইন্টারফেস, মোবাইল বটম শিট, ২x২ হট টপিক গ্রিড এবং টেক্সট ফরম্যাটিং সামলায়।
2. **Server API Route**: [`app/api/chat/route.ts`](file:///Users/betopia/Desktop/shohid-dev/app/api/chat/route.ts)
   - ক্লায়েন্ট রিকোয়েস্ট রিসিভ করে এবং Gemini API বা Local AI Engine-এ ফরোয়ার্ড করে।
3. **AI Knowledge Base**: [`lib/ai.ts`](file:///Users/betopia/Desktop/shohid-dev/lib/ai.ts)
   - শোহিদের প্রোফাইল তথ্য, প্রজেক্ট হিস্ট্রি এবং Gemini 2.5 Flash SDK সেটআপ।
4. **Global Layout**: [`app/layout.tsx`](file:///Users/betopia/Desktop/shohid-dev/app/layout.tsx)
   - চ্যাটবটকে পুরো অ্যাপ্লিকেশনের সব পেজে গ্লোবালি রেন্ডার করে।

---

## 🔄 Step-by-Step Workflow

1. **User Request Initiation**:
   - ইউজার চ্যাটবক্সের ইনপুটে প্রশ্ন লেখে অথবা "Hot Topics" (যেমন: `⚡ Core Tech Stack`, `🚀 Featured Projects`) বাটনে ক্লিক করে।
2. **Client State Update**:
   - ক্লায়েন্ট সাথে সাথে ইউজারের মেসেজ টি চ্যাট হিস্ট্রিতে যোগ করে এবং লোডিং অ্যানিমেশন স্পিনার দেখায়।
3. **API Request Dispatch**:
   - `fetch('/api/chat')`-এর মাধ্যমে ব্যাকএন্ডে বিগত মেসেজ হিস্ট্রি এবং নতুন মেসেজ পাঠানো হয়।
4. **System Context Injection**:
   - ব্যাকএন্ড `SHOHID_PORTFOLIO_CONTEXT` যুক্ত করে Gemini 2.5 Flash API কল করে।
5. **Smart Fallback Engine**:
   - যদি `GEMINI_API_KEY` কনফিগার করা না থাকে অথবা নেটওয়ার্ক ইস্যু হয়, তবে ব্যাকএন্ডের `getFallbackChatReply()` লোকালি কিওয়ার্ড ম্যাচ করে স্মার্ট ও অ্যাকুরেট উত্তর জেনারেট করে।
6. **Formatted UI Rendering**:
   - প্রাপ্ত মেসেজটি ক্লায়েন্টে `FormattedText` কম্পোনেন্টের মাধ্যমে বোল্ড টেক্সট, কোড ব্লক, বুলেট পয়েন্ট এবং ক্লিকেবল লিংকে রূপান্তরিত হয়।

---

## 🎨 UI & Responsive Features

- **Mobile Bottom-Sheet (`< sm`)**: মোবাইল স্ক্রিনে চ্যাটবক্স নিচে সংযুক্ত চ্যাট শিট (`bottom-0 rounded-t-3xl`) হিসেবে আসে, এবং টপ-রাইটে স্পষ্ট `X` (Cross) ক্লোজ বাটন থাকে।
- **Desktop Floating Window (`>= sm`)**: ডেক্সটপ স্ক্রিনে চ্যাটবক্স ডানপাশে ফ্লোটিং মিনি উইন্ডো (`bottom-24 right-6`) হিসেবে থাকে।
- **Hot Topics 2x2 Grid**: স্ক্রোলিং ঝামেলা দূর করে পরিষ্কার ৪টি কুইক প্রেসেট প্রশ্ন ২x২ গ্রিডে দেখানো হয়।
- **Lenis Scroll Prevention**: `data-lenis-prevent` অ্যাট্রিবিউট ব্যবহার করায় চ্যাট মেসেজ বক্সে স্মুথলি চাকা ঘুরিয়ে স্ক্রোল করা যায়।
