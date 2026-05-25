# Visume 

Visume is a next-generation hiring platform that reimagines the recruitment process by replacing traditional paper resumes with interactive, AI-powered video profiles. Designed with a dual-sided architecture, Visume seamlessly connects candidates and recruiters through a modern, media-rich ecosystem. 

By leveraging intelligent AI screening and video-first introductions, the platform significantly reduces time-to-hire, enhances candidate expression, and empowers recruiters to make data-driven, holistic hiring decisions.

##  Project Overview

Traditional hiring is broken—resumes lack personality, and initial screening calls are incredibly time-consuming. **Visume** solves this by letting candidates record and manage high-quality "Video Resumes" directly from their browser, complete with a built-in teleprompter and media settings. 

For recruiters, Visume provides an enterprise-grade dashboard equipped with AI-matching algorithms that analyze candidate profiles and video transcripts, instantly scoring candidates against active job postings. 

##  Key Features & Functionality

###  For Candidates
* **Video Resume Studio:** Record, review, and upload video introductions. Includes advanced configuration for webcam/microphone selection and a customizable teleprompter.
* **Smart Job Discovery:** Browse open roles tailored to your profile using AI Smart Match filters.
* **Application Tracking:** Monitor the status of your applications in real-time.
* **KYC Verified Profiles:** Secure, verified user profiles to build trust with employers.
* **Granular Profile Management:** Manage everything from professional headlines, experience, and bios, to portfolio links and PDF resume backups.

###  For Recruiters
* **Command Center Dashboard:** Get a bird's-eye view of your hiring pipeline—active jobs, total applicants, upcoming interviews, and recent activity logs.
* **AI-Matched Candidates:** Visume's AI automatically scores candidates based on their video resumes and profiles, providing a precise "Match Score" (e.g., 94% fit).
* **Pipeline Management:** Move candidates seamlessly through recruitment stages using an intuitive Kanban-style tracker.
* **Company Branding:** Fully customizable company profiles, including enterprise logos, CIN, company size, and dynamic links.
* **Automated Screening:** Define default AI screening questions for specific roles to standardize the interview process.

### ️ System & Security Features
* **Authentication:** Secure login and registration powered by Firebase Auth, complete with Two-Factor Authentication (2FA) toggles.
* **Dynamic Theming:** Seamless Light and Dark mode toggles.
* **Privacy Controls:** Options to temporarily deactivate accounts or permanently delete user data and metadata.

##  Project Workflow & How it Works

1. **Onboarding & Auth:** Users sign up and select their role (`Candidate` or `Recruiter`). Firebase handles the secure authentication layer.
2. **Candidate Flow:** 
   - A candidate fills out their profile details and jumps into the Video Recorder.
   - They read from the integrated teleprompter while recording their pitch.
   - Once submitted, their profile becomes visible to companies matching their skills.
3. **Recruiter Flow:** 
   - A recruiter posts a job and sets custom AI screening questions.
   - The platform aggregates candidate video submissions.
   - The AI processes transcripts and profile metadata to generate an **AI Match Score**.
   - Recruiters shortlist the best candidates and move them through the pipeline tracker.

##  Tech Stack

* **Frontend:** React (Vite), React Router DOM for routing.
* **Styling:** Tailwind CSS (featuring a custom design system with semantic tokens like `surface-container`, `primary`, and micro-animations).
* **Backend:** Node.js / Express (handling API logic and AI processing).
* **Database/Auth:** Firebase.
* **Icons/Assets:** Google Material Symbols, Unsplash.

##  Getting Started (Local Development)

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
*Built with passion to revolutionize the future of hiring by Ashwin Kumar.*
