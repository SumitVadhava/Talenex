<p align="center">
  <h1 align="center">Talenex</h1>
  <p align="center">
    <strong>Learn Grow Together.</strong>
  </p>
  <p align="center">
    A full-stack skill-swapping platform where users discover, connect, and exchange expertise through real-time chat, video calls, and AI-powered matching.
  </p>
  <p align="center">
    <a href="https://talenex.vercel.app">🌐 Live Demo</a> &nbsp;·&nbsp;
    <a href="#-features">Features</a> &nbsp;·&nbsp;
    <a href="#-tech-stack">Tech Stack</a> &nbsp;·&nbsp;
    <a href="#-getting-started">Setup</a> &nbsp;·&nbsp;
    <a href="#-architecture">Architecture</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/.NET-8.0-purple?logo=dotnet" alt=".NET 8" />
    <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" alt="Vite 7" />
    <img src="https://img.shields.io/badge/SQL_Server-Database-red?logo=microsoftsqlserver" alt="SQL Server" />
    <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
  </p>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [License](#-license)

---

## 🔍 Overview

**Talenex** is a peer-to-peer skill exchange platform that connects learners and mentors. Users list skills they can teach and skills they want to learn, then send swap requests to compatible partners. The platform handles the entire flow — from AI-powered discovery to scheduling, real-time messaging, video conferencing, reviews, and premium payments.

> **Live:** [talenex.vercel.app](https://talenex.vercel.app) &nbsp;|&nbsp; **API:** [talenex-server.onrender.com](https://talenex-server.onrender.com/swagger)

---

## ✨ Features

### Core Platform
- **Skill Profiles** — Multi-step onboarding to register skills offered and skills wanted, with categories, proficiency levels, and descriptions
- **Skill Discovery** — Browse, search, and filter users by skill category, proficiency level, rating, and online status
- **Swap Requests** — 6-step guided wizard to create a skill swap proposal (skill selection → scheduling → duration → message → review & confirm)
- **My Swaps Dashboard** — Track all incoming/outgoing requests with real-time status updates (Pending, Accepted, Completed, Cancelled) via SignalR

### Communication
- **Real-Time Chat** — Full-featured messaging powered by Stream Chat with presence indicators, unread counts, and media support
- **Video Calls** — Peer-to-peer video conferencing via ZegoCloud with screen sharing, room invites, and mobile-optimized layouts

### Intelligence
- **AI Match (Premium)** — Groq-powered AI analyzes all user profiles and returns ranked Top-N skill-swap partners based on compatibility
- **Smart Filters** — Multi-criteria filtering with combined category, level, rating, and favourites support

### User Experience
- **Reviews & Reputation** — Star rating system with written reviews that feed into a reputation score
- **User Favourites** — Save and quickly access preferred swap partners
- **Email Notifications** — Beautifully crafted HTML email templates for swap requests, contact inquiries, and feedback acknowledgements
- **Premium Plans** — Razorpay-integrated payment flow with Starter and Professional tiers (INR/USD)
- **Responsive Design** — Mobile-first, fully responsive UI with Tailwind CSS and Framer Motion animations

### Infrastructure
- **Dual JWT Authentication** — Clerk-issued JWTs for initial login + internal app JWTs for API authorization
- **Real-Time Updates** — SignalR hub for live swap request status broadcasting
- **Swagger API Docs** — Interactive API documentation with JWT authentication support

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion / GSAP** | Animations & transitions |
| **Clerk** | Authentication (OAuth, SSO, MFA) |
| **Stream Chat** | Real-time messaging |
| **ZegoCloud** | Video conferencing |
| **TanStack React Query** | Server state management & caching |
| **React Router v7** | Client-side routing |
| **Radix UI / shadcn/ui** | Accessible component primitives |
| **Axios** | HTTP client with interceptors |
| **Razorpay** | Payment gateway (client SDK) |

### Backend
| Technology | Purpose |
|---|---|
| **ASP.NET Core 8** | Web API framework |
| **Entity Framework Core 8** | ORM & database migrations |
| **SQL Server** | Relational database |
| **SignalR** | Real-time WebSocket communication |
| **FluentValidation** | Request model validation |
| **Swagger / Swashbuckle** | API documentation |
| **Clerk JWT + Custom JWT** | Dual authentication schemes |
| **Stream Chat .NET** | Server-side chat token generation |
| **Razorpay .NET** | Payment order creation & verification |
| **MailKit** | SMTP email support |
| **BCrypt.NET** | Password hashing |

### Infrastructure & Deployment
| Technology | Purpose |
|---|---|
| **Vercel** | Frontend hosting (SPA rewrites) |
| **Render** | Backend hosting (Docker) |
| **Docker** | Containerized .NET deployment |
| **Cloudinary** | Image upload & CDN |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        CLIENT                            │
│  React 19 + Vite + Tailwind CSS                          │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐               │
│  │  Clerk   │  │  Stream   │  │  Zego    │               │
│  │  Auth    │  │  Chat     │  │  Video   │               │
│  └────┬─────┘  └─────┬─────┘  └────┬─────┘               │
│       │              │             │                     |
│  ┌────┴──────────────┴─────────────┴────┐                │
│  │         Axios + React Query          │                │
│  └──────────────────┬───────────────────┘                │
└─────────────────────┼────────────────────────────────────┘
                      │ HTTPS / WSS
┌─────────────────────┼────────────────────────────────────┐
│                     │        SERVER                      │
│  ASP.NET Core 8 Web API                                  │
│  ┌──────────────────┴───────────────────┐                │
│  │           Controllers (18)           │                │
│  │  Auth · User · Skills · Swap · Chat  │                │
│  │  Payment · Review · Profile · ...    │                │
│  └──────────────────┬───────────────────┘                │
│                     │                                    │
│  ┌─────────┐  ┌─────┴─────┐  ┌───────────┐               │
│  │ SignalR │  │  Services │  │ Validators│               │
│  │ SwapHub │  │  (11)     │  │ (Fluent)  │               │
│  └─────────┘  └─────┬─────┘  └───────────┘               │
│                     │                                    │
│  ┌──────────────────┴───────────────────┐                │
│  │     Repository Layer (Generic)       │                │
│  └──────────────────┬───────────────────┘                │
│                     │                                    │
│  ┌──────────────────┴───────────────────┐                │
│  │   Entity Framework Core + SQL Server │                │
│  │   (13 Entities, Fluent API Config)   │                │
│  └──────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────┘
```

The backend follows **Clean Architecture** with four layers:

| Layer | Project | Responsibility |
|---|---|---|
| **API** | `Talenex.API` | Controllers, middleware, DI registration, SignalR hub |
| **Application** | `Talenex.Application` | DTOs, repository interfaces, validators |
| **Domain** | `Talenex.Domain` | Entities, value objects, business rules |
| **Infrastructure** | `Talenex.infrastructure` | EF Core DbContext, repositories, external services |

---

## 📁 Project Structure

```
Talenex/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── api/                     # Axios instance, API modules
│   │   ├── assets/                  # Static images & sounds
│   │   ├── components/              # Reusable UI components (43+)
│   │   │   ├── swap-steps/          # Multi-step swap request wizard
│   │   │   └── ui/                  # shadcn/ui primitives
│   │   ├── constants/               # App-wide constants
│   │   ├── context/                 # React contexts (User, Chat)
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility libraries
│   │   ├── pages/                   # Route-level page components (18)
│   │   ├── Services/                # Service layer
│   │   └── utils/                   # Helper functions
│   ├── public/                      # Static public assets
│   ├── index.html                   # Entry HTML
│   ├── vite.config.js               # Vite configuration
│   └── vercel.json                  # Vercel SPA rewrite rules
│
├── server/                          # .NET Backend
│   ├── Talenex.API/                 # Web API Layer
│   │   ├── Controllers/             # API endpoints (18 controllers)
│   │   ├── Hubs/                    # SignalR hubs
│   │   ├── Program.cs              # App configuration & DI
│   │   └── appsettings.json        # Configuration template
│   │
│   ├── Talenex.Application/        # Application Layer
│   │   ├── DTOs/                    # Create, Update, Request, Response DTOs
│   │   ├── IRepository/             # Repository & service interfaces
│   │   └── Validators/              # FluentValidation validators
│   │
│   ├── Talenex.Domain/             # Domain Layer
│   │   ├── Entities/                # Domain entities (13)
│   │   ├── Common/                  # Shared domain logic
│   │   └── ValueObjects/            # Value objects (SkillOfferedObj, etc.)
│   │
│   ├── Talenex.infrastructure/     # Infrastructure Layer
│   │   ├── Data/                    # EF Core DbContext & factory
│   │   ├── Migrations/             # Database migrations
│   │   ├── Repositories/            # Repository implementations
│   │   └── Services/                # External service integrations (11)
│   │
│   └── Dockerfile                   # Production Docker image
│
├── .github/workflows/              # CI/CD pipelines
├── LICENSE                          # MIT License
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **.NET SDK** 8.0
- **SQL Server** (local or cloud instance)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/SumitVadhava/Talenex.git
cd Talenex
```

### 2. Backend Setup

```bash
cd server/Talenex.API

# Restore NuGet packages
dotnet restore

# Update appsettings.json with your configuration (see Environment Variables below)

# Apply database migrations
dotnet ef database update --project ../Talenex.infrastructure

# Run the API server
dotnet run
```

The API will start on `http://localhost:10000`. Swagger docs are available at `/swagger`.

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create a .env file with your keys (see Environment Variables below)

# Start the dev server
npm run dev
```

The app will start on `http://localhost:5173`.

---

## 🔐 Environment Variables

### Client (`client/.env`)

```env
# Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key

# API
VITE_API_URL=http://localhost:10000/api
VITE_HUB_URL=http://localhost:10000/swaphub

# Chat
VITE_STREAM_API_KEY=your_stream_api_key

# Video Calls
VITE_ZEGO_APP_ID=your_zego_app_id
VITE_ZEGO_SERVER_SECRET=your_zego_server_secret

# Payments
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

### Server (`server/Talenex.API/appsettings.json`)

```jsonc
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=TalenexDB;...",
  },
  "Clerk": {
    "Authority": "https://your-clerk-domain",
    "SecretKey": "sk_test_..."
  },
  "Jwt": {
    "Key": "your-256-bit-secret-key",
    "Issuer": "Talenex.API",
    "Audience": "Talenex.Client",
    "ExpiresInMinutes": "add minutes here"
  },
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "Username": "your-email@gmail.com",
    "Password": "your-app-password",
    "From": "your-email@gmail.com"
  },
  "ZegoCloud": {
    "AppId": "your_zego_app_id",
    "ServerSecret": "your_zego_server_secret"
  },
  "Stream": {
    "ApiKey": "your_stream_api_key",
    "ApiSecret": "your_stream_api_secret"
  },
  "Razorpay": {
    "Key": "rzp_test_...",
    "Secret": "your_razorpay_secret"
  },
  "Groq": {
    "ApiKey": "your_groq_api_key"           
  }
}
```

## 🚀 Deployment

### Frontend → Vercel
The client is configured for Vercel with SPA rewrites via `vercel.json`. Push to `main` and connect the repo to Vercel for automatic deployments.

### Backend → Render (Docker)
The server includes a production `Dockerfile` that builds a multi-stage .NET 8 image exposed on port `10000`.

```bash
# Build locally
cd server
docker build -t talenex-api .
docker run -p 10000:10000 talenex-api
```

Deploy to Render by connecting your repo and pointing to `server/Dockerfile`.

---

## 📚 API Documentation

Interactive API documentation is available via Swagger UI at:

- **Local:** `http://localhost:10000/swagger`
- **Production:** `https://talenex-server.onrender.com/swagger`

### Key API Endpoints

| Domain | Endpoint | Description |
|---|---|---|
| **Auth** | `POST /api/auth` | Authenticate via Clerk JWT & issue app token |
| **Users** | `GET /api/User/all` | List all users with includes |
| **User Details** | `GET /api/User/Details` | Get current user's full profile |
| **Skills** | `POST /api/user-skills` | Create/update user skills |
| **Swap Requests** | `POST /api/swap-request` | Create a new swap request |
| **Swap Requests** | `PATCH /api/swap-request/{id}/status` | Update swap status |
| **Chat** | `GET /api/stream/token` | Generate Stream Chat token |
| **Reviews** | `POST /api/user-reviews` | Submit a user review |
| **Payments** | `POST /api/payments/create-order` | Create Razorpay order |
| **Payments** | `POST /api/payments/verify` | Verify payment signature |
| **AI Match** | `POST /api/User/ai-match` | AI-powered partner matching |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


<p align="center">
  Built with ❤️ by <a href="https://github.com/SumitVadhava">Sumit Vadhava</a> & <a href="https://github.com/Meet1611">Meet Parmar</a>
</p>
