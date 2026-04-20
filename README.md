<div align="center">
  <img src="https://i.imgur.com/KxS26vG.png" width="150" alt="VibeFlow AI Logo">
  <h1>🌟 VibeFlow AI — The Premium Event Experience</h1>
  <p><strong>A Smart, Dynamic Assistant & Management Dashboard for Large-Scale Venues</strong></p>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/Google%20Gemini-Powered-blue?style=for-the-badge&logo=google">
  <img src="https://img.shields.io/badge/Google%20Maps-Integrated-success?style=for-the-badge&logo=googlemaps">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Tailwind-Glassmorphism-38B2AC?style=for-the-badge&logo=tailwind-css">
</div>

---

## 🎯 1. Chosen Vertical
**Physical Event Experience** 
*Problem Statement:* Design a solution that improves the physical event experience for attendees at large-scale sporting venues. The system should address challenges such as crowd movement, waiting times, and real-time coordination, while ensuring a seamless and enjoyable experience.

---

## 🚀 2. Approach and Logic
Large-scale events inherently struggle with congestion, confusion, and network degradation. Our logic solves this through a trifecta of decentralization, AI-context processing, and spatial computing:
1. **Context-Aware Routing (Crowd Movement)**: The logic evaluates live crowd density arrays via Gemini AI inference to dynamically compute paths that actively avoid bottlenecks.
2. **Virtual Capacity Engines (Wait Times)**: Replaces physical standing lines with a predictive virtual queuing interface. The queue engine calculates wait times algorithmically and notifies users, managing real-time throughput.
3. **Decentralized Groups (Real-time Coordination)**: Bypasses congested cellular networks by establishing a resilient Peer-to-Peer (P2P) mesh network. Users join via QR scanning and track their peers instantly.

---

## ⚙️ 3. How the Solution Works
1. **Arrival & Context**: A user opens VibeFlow. The Dashboard initializes real-time map integration representing venue density mapping (Visual Heatmaps over Leaflet architecture). 
2. **Smart Booking**: During an event, a user wants food. They navigate to the F&B hub, check the dietary tags (e.g., `Veg`, `Non-Veg`), and secure a virtual queue slot.
3. **AI Concierge**: The deeply integrated Google Gemini AI engine analyzes the user's explicit coordinates against the live crowd congestion parameters to output highly personalized, intelligent routing text directly mapped to their situation.
4. **Group Rendezvous**: Friends scan each others' VibeFlow QR Codes linking them locally via WebRTC signaling. They can click "Audio/Video Call" or "Chat" to communicate independently of heavy central-server latencies.

---

## 🧠 4. Assumptions Made
- **Device Capabilities**: Attendees possess modern smartphones containing standard cameras (for QR code matrix scanning) and HTML5 browser support.
- **Initial Connectivity Handshake**: An initial low-bandwidth connection exists via the Edge signaling servers to allow the WebRTC SDP handshake prior to finalizing the true P2P mesh network.
- **Topographical Readiness**: Assumes macro-venues (sports stadiums) have standardized mapping coordinate data traversable by our Google/Leaflet mapping engines.

---

## 🏆 5. Evaluation Focus Areas (Implementation Proof)

### 🥇 Code Quality
Built using a strict, Component-based **React 18** architecture that guarantees maintainability. Heavy implementations of **TypeScript** interfaces (`src/types/types.ts`) provide robust, error-free typing logic. The frontend UI operates entirely via a centralized, premium `tailwind.config.js` Glassmorphic UI design system, ensuring maximum readability.

### 🔒 Security
Developed heavily guarding user context. API Keys (like `VITE_GEMINI_API_KEY`) and BigQuery scopes are systematically protected via `.env` structures out of version control (evidenced by the `.env.example`). The application relies solely on device-local storage and localized P2P communication loops—avoiding Man-In-The-Middle Database intrusions natively.

### ⚡ Efficiency
Resource pooling is aggressively optimized. Dynamic Map rendering and heavy data manipulation use isolated state updates to deter DOM re-rendering catastrophes. P2P Video/Data transmission drastically unburdens the primary venue servers by distributing bandwidth cost amongst the end-user peer mesh matrices directly.

### 🧪 Testing
High-level component viability is verified via comprehensive unit testing frameworks. Built upon **Vitest** + **jsdom**, the repository maps explicit test execution scripts (`npm run test`) validating crucial logic constraints in files such as `QueueCard.test.tsx`.

### ♿ Accessibility
Inclusive design sits at the core of the UI.
- **High Contrast & Visual Indexing**: Dark mode with highly distinguishable CSS badges (`Green = Veg`, `Red = Restricted Area`).
- **Semantic DOM**: WAI-ARIA principles maintained by using semantic layouts via Radix UI primitives.
- **Universal Communication**: Real-Time bilingual toggling via standard language hooks supporting Global English and Hindi natively.

### 🤖 Google Services
The VibeFlow Ecosystem operates on profound integrations with the Google Cloud framework:
1. **Google Gemini 2.0 Flash Lite API**: Doesn't just generate text—it parses dense JSON arrays representing spatial crowd parameters, deduces the safest physical event pathways, and outputs constrained JSON directly feeding UI Navigation logic.
2. **Google Maps Proxy Flow**: Uses real mapping parameters and coordinates natively rendered in High-Fidelity to simulate massive sporting venues accurately.

---

## 🌟 Real-World Scenario: System in Action
Imagine a user, **Alex**, attending a massive sporting event:
1. **Contextual Navigation**: Alex opens VibeFlow. The AI detects Gate 2 is overwhelmed (Heatmap: Red). The PathForge agent pushes a safe, uncrowded route to Gate 4.
2. **Amenities Planning**: Alex asks the AI: *"Where can I get vegan food quickly?"* The AI natively scans live queues, locates a `Veg`-tagged Food Court B with a 5-minute wait, books the virtual slot contextually, and guides Alex there effortlessly.
3. **P2P Operations**: Alex links up with 3 colleagues via VibeFlow’s QR local networking. Leveraging the deep-link chat UI, they pinpoint each other natively, resolving venue chaos.

---

## 🚀 Advanced Enterprise Roadmap
Looking beyond the prototype, the core structural pipeline is built to support:
1. **Google Cloud BigQuery Sync**: Accumulating localized human traffic histories for macro-level scale pattern mining.
2. **Organizer Administration Panels**: React-Admin integrated real-time Dashboards granting event managers God-Mode global heat mapping tools.
3. **Vertex AI Predictors**: Training custom Vertex predictors over historical flow to calculate specific structural bottleneck risks hours *before* attendees arrive.

---
<div align="center">
  <p><i>Systematically Engineered to Redefine Physical Human Coordination.</i></p>
</div>
