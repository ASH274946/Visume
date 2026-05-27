# Visume

Visume is a next-generation hiring platform that reimagines the recruitment process by replacing traditional paper resumes with interactive, AI-powered video profiles. Designed with a dual-sided architecture, Visume seamlessly connects candidates and recruiters through a modern, media-rich ecosystem.

By leveraging intelligent AI screening and video-first introductions, the platform significantly reduces time-to-hire, enhances candidate expression, and empowers recruiters to make data-driven, holistic hiring decisions.

## Project Overview

Traditional hiring is broken—resumes lack personality, and initial screening calls are incredibly time-consuming. **Visume** solves this by letting candidates record and manage high-quality "Video Resumes" directly from their browser, complete with a built-in teleprompter and media settings.

For recruiters, Visume provides an enterprise-grade dashboard equipped with AI-matching algorithms that analyze candidate profiles and video transcripts, instantly scoring candidates against active job postings.

## Key Features & Functionality

### 💬 Real-Time Messaging & Notifications

* **Dual-Role Segregation:** Seamlessly switch between Candidate and Recruiter roles using the same account, with completely isolated, role-specific chat inboxes and notification pipelines.
* **Instant Communication:** Integrated chat module allowing recruiters to initiate conversations directly from candidate profile cards or applicant lists.
* **Smart Notification Sync:** Real-time push notifications alert you to new messages. Actively viewing a chat intelligently intercepts and clears incoming notifications to keep your dashboard clutter-free.
* **Dynamic Contextual UI:** The messaging interface automatically adapts to your role, displaying company names for candidates and job titles for recruiters.

### For Candidates

* **Video & Document Resume Library:** Upload, manage, and delete multiple video and PDF/document resumes from a centralized "My Library" dashboard.
* **Default Resume Showcasing:** Candidates can easily star and set a specific Document and Video resume as their "Default," ensuring recruiters see the best, curated version of their profile.
* **Comprehensive Job Applications:** Apply to jobs with both your customized Video and Document resumes directly from the discovery page.
* **Real-time Pipeline Sync:** Watch your application status change instantly! As recruiters move you through their hiring pipeline (Applied ➡️ Shortlisted ➡️ Interview ➡️ Hired), your dashboard updates in real-time.
* **Interactive Interview Scheduling:** Candidates shortlisted for an interview unlock a dynamic "Schedule Interview" modal, allowing them to coordinate next steps directly from their profile.
* **Video Resume Studio:** Record, review, and upload video introductions with advanced configuration for webcam/microphone selection and a customizable teleprompter.
* **Smart Job Discovery:** Browse open roles tailored to your profile using AI Smart Match filters.
* **Granular Profile Management:** Manage everything from professional headlines, experience, and bios, to portfolio links.

### For Recruiters

* **Command Center Dashboard:** Get a bird's-eye view of your hiring pipeline—active jobs, total applicants, upcoming interviews, and recent activity logs.
* **Curated Profile Viewing:** When finding candidates, recruiters are presented with the candidate's chosen "Default" video and document resumes via a custom-designed, theme-matching media player.
* **Pipeline Management:** Move candidates seamlessly through recruitment stages using an intuitive Kanban-style tracker that instantly notifies candidates.
* **AI-Matched Candidates:** Visume's AI automatically scores candidates based on their video resumes and profiles, providing a precise "Match Score" (e.g., 94% fit).
* **Direct Outreach:** Initiate chats with promising candidates instantly from their profile cards or the job applicant tracking view.
* **Company Branding:** Fully customizable company profiles, including enterprise logos, CIN, company size, and dynamic links.
* **Automated Screening:** Define default AI screening questions for specific roles to standardize the interview process.

### 🛡️ System & Security Features

* **Authentication:** Secure login and registration powered by Firebase Auth.
* **Dynamic Theming:** Seamless Light and Dark mode toggles with customized component styling (like our custom HTML5 video player).
* **Real-Time Data Sync:** Powered by Firestore's real-time listeners for instant pipeline updates, chat delivery, and notification badges.
* **Privacy Controls:** Options to temporarily deactivate accounts or permanently delete user data and metadata.

## Project Structure

```text
Visume/
├── backend/                  # Node.js & Express server for AI processing and video handling
│   ├── src/
│   │   ├── controllers/      # Route logic
│   │   ├── routes/           # Express API endpoints
│   │   └── server.js         # Entry point
│   └── package.json
└── frontend/                 # React frontend built with Vite
    ├── src/
    │   ├── assets/           # Images, icons, global styles (index.css)
    │   ├── components/       # Reusable UI components (Sidebar, TopBar, Modals, CustomVideoPlayer)
    │   ├── contexts/         # React Contexts (AuthContext, UploadContext, ThemeContext)
    │   ├── pages/            # Main views (CandidateDashboard, HiringPipeline, CandidateProfile, etc.)
    │   ├── App.jsx           # Application routing
    │   ├── firebase.js       # Firebase configuration & initialization
    │   └── main.jsx          # React DOM rendering
    ├── tailwind.config.js    # Custom design system with semantic color tokens
    └── package.json
```

## Tech Stack

* **Frontend:** React (Vite), React Router DOM for routing.
* **Styling:** Tailwind CSS (featuring a custom design system with semantic tokens like `surface-container`, `primary`, and micro-animations).
* **Backend:** Node.js / Express (handling API logic and AI processing).
* **Database/Auth/Storage:** Firebase (Firestore, Authentication).
* **Icons/Assets:** Google Material Symbols, Unsplash.

## Getting Started (Local Development)

To run Visume locally, you need two terminal instances—one for the frontend and one for the backend.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ASH274946/Visume.git
   cd Visume
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open your browser:** Navigate to `http://localhost:5173`.

---
*Built with passion to revolutionize the future of hiring.*
