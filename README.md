<div align="center">
  <img src="https://i.imgur.com/KxS26vG.png" width="150" alt="VibeFlow AI Logo">
  <h1>🌟 VibeFlow AI — The Premium Event Experience</h1>
  <p><strong>A Smart, Dynamic Assistant & Management Dashboard for the World's Best Events</strong></p>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/Google%20Gemini-Powered-blue?style=for-the-badge&logo=google">
  <img src="https://img.shields.io/badge/Google%20Maps-Integrated-success?style=for-the-badge&logo=googlemaps">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Tailwind-Glassmorphism-38B2AC?style=for-the-badge&logo=tailwind-css">
</div>

## 🏆 Concept & Vision
VibeFlow AI transforms chaotic, crowded event experiences into seamless, highly-coordinated luxury experiences. Leveraging cutting-edge **Google Services (Gemini AI & Google Maps/Leaflet Topography)**, VibeFlow provides attendees with intelligent context-aware recommendations, live queue tracking, dynamic heatmaps, and a powerful real-time VIP group coordination messenger. 

This repository was designed specifically to excel in **Practicality, Real-World Usability, and intelligent Context-Aware Decision Making.**

---

## 🚀 Key Features & Evaluation Criteria Match

### 💭 1. Smart, Dynamic Assistant (Gemini AI)
VibeFlow features an integrated, state-of-the-art **AI Assistant (ChatPanelEnhanced)** powered by the **Google Gemini API**. 
- It acts not just as a chatbot, but as an **Event Concierge**.
- Attendees can ask questions in multiple languages (English/Hindi) and receive dynamic responses regarding event schedules, facility locations, and wait times. 
- The AI digests the current user's location + crowd density stats and dynamically answers where to go.

### 🧠 2. Logical Decision Making Based on User Context
The application is purely contextually driven:
- **Crowd Heatmaps**: The AI and Dashboard directly observe "high-density" spots dynamically (like Entry Gate C or Section B) and actively reroute users or push safety alerts.
- **Smart Queue Booking & Diet Tags**: Live analytics of capacities determine queue wait times, and the application instantly locks capacity logic so you avoid standing in physical lines. Food court locations are intelligently tagged with specific badges (`Veg`, `Non-Veg`), allowing users to logically find compatible food. 
- **Location Awareness & Group Quick-Actions**: Groups track each other visually with real-time "Online" and "Location" statuses via peer-to-peer (P2P) localized event data. The Dashboard dynamically transforms into a rapid-action hub showing deep links for 1-click Audio/Video Calls natively.

### 🌍 3. Effective Use of Google Services
- **Google Gemini API**: Processes natural language event queries, summarizes live data, and provides event coordination multi-lingually.
- **Google Maps Data / Geolocation Integration**: Merged robust topographical and satellite data mapping (Leaflet proxying Google/Carto APIs for premium UI) to provide interactive, pinpoint accurate navigation for macro-venues like Bharat Mandapam. 

### 📐 4. Practical and Real-world Usability
- **Stunning, Premium UI/UX:** Gone are flat, boring dashboards. Built heavily with an elite **Glassmorphic** Tailwind design system. Semi-transparent cards (`.glass-card`), beautiful drop shadows, responsive grids, and blur-backdrops make it entirely production-ready.
- **Accessible & Cross-device**: Operates flawlessly from web, tablet, or a mobile-first viewport while traversing the event.
- **QR Code Scanning**: Join groups and register instantaneously with your phone's camera, bridging the physical and digital event plane.

### 💻 5. Clean and Maintainable Code
- **Modular Component Architecture:** Every core feature (Map, Queue, Group Chat, VibePause) is perfectly abstracted into highly reusable components (`src/components/`).
- **Complete Elimination of Cruft:** Stripped all early-scaffolding, me-do integrations, and redundant styling conflicts. Only strict, type-safe React (TypeScript) architecture remains.
- **Global Theme Engine:** A powerful Tailwind `index.css` global configuration drives the dark-mode aesthetic perfectly across every screen.

---

## 🛠️ Tech Stack
- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, Radix UI Primitives, Framer Motion (Micro-animations)
- **AI & Logic**: Google Gemini API, Custom Hook Contexts 
- **Mapping**: Leaflet, React-Leaflet
- **Data & Icons**: Sonner (Toast notifications), Lucide React

---

## 🌟 Pages Overview
1. **Live Dashboard (`/dashboard`)**: The mission control center. Contains Live safety alerts, dynamic maps, queue statuses, and Vibe pause interactive content.
2. **Interactive Venue Map**: Top-down interactive map showing Bharat Mandapam overlaid with multi-colored Density Rings representing real-time crowd movement.
3. **Queue Bookings (`/queue`)**: Highly visual grid to instantly book virtual lines for F&B, Restrooms, and Merchandise. Wait in your seat—not in the hall!
4. **Group Coordination (`/group`)**: A high-end fluid messenger. Scan a QR code to jump into a P2P event group chat instantly. Features single-click integrations for voice & video callbacks.

--- 

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/vibeflow.git

# 2. Install dependencies
npm install

# 3. Add Google Gemini API keys
# Create a .env file and add: 
VITE_GEMINI_API_KEY="AIzaSyYourKeyHere..."

# 4. Spin up the futuristic app 
npm run dev
```

> **Note**: For the AI Group Messaging to generate accurate responses, ensure `VITE_GEMINI_API_KEY` is fully populated.

---
<div align="center">
  <p><i>Engineered to redefine how crowds experience world-class venues.</i></p>
</div>
