# Overview

WIKIMASTERS IS A Fullstack Article Publishing Platform built with **Next.js (App Router)**.

Users can:

- Browse public articles
- Register & Login securely
- Create and edit their own articles
- View other users’ content
- Get AI-generated summaries
- Receive email notifications when their article reaches a view threshold

This project started from a [Frontend Masters course](https://frontendmasters.com/courses/fullstack-app-next-v4).
but I intentionally replaced the core tools to avoid “just following along”.

## 🔴 Live Demo

- [WIKIMASTERS](https://fullstack-next-wikimasters.vercel.app/)

---

---

## 🧨 Leveling Up the Difficulty

Instead of copying the instructor’s stack, I swapped it with more advanced tools:

| Course Stack  | My Stack           |
| ------------- | ------------------ |
| Drizzle ORM   | Prisma             |
| Stytch Auth   | NextAuth           |
| Vercel AI SDK | LangChain + Gemini |

Why?

Because I wanted to:

- Make architectural decisions myself
- Understand trade-offs
- Go beyond tutorial-level implementation

---

## Tech Stack

### Framework

- Next.js (App Router – Fullstack Mode)
- Server Components
- Server Actions

### Authentication & Authorization

- NextAuth
- Secure sessions
- Protected routes
- Ownership-based permissions (users edit only their articles)

### Database

- Neon (Serverless PostgreSQL)
- Prisma ORM
- Relational modeling
- Migrations
- Type-safe queries

### Caching

- Upstash Redis
- Cache-first homepage strategy
- TTL handling
- Reduced database load

### 🤖 AI Integration

- LangChain
- Google Gemini

#### Flow:

1. User writes article
2. AI generates a summary
3. Summary is stored
4. Displayed in public feed

## 📧 Email Notifications

- Resend API
- When article views exceed threshold (e.g. 10 views)
- Automatic email sent to author

---

## ✨ Features

### 👤 User System

- Register
- Login
- Session management
- Route protection
- Authorization rules

### Article System

- Create article
- Edit own articles
- Public listing
- View counter
- AI-generated summary

### Performance Optimization

- Redis caching layer
- Reduced DB round-trips
- Faster homepage load

---

## What This Project Demonstrates

This is not just CRUD.

It demonstrates:

- Fullstack architecture thinking
- Authentication vs Authorization understanding
- ORM schema design
- Caching strategies
- AI integration beyond SDK abstraction
- Event-driven backend logic
- Production-oriented mindset
