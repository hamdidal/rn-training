ailogogenerator
Demo Hexa – AI Logo & Art Generator (Expo React Native)

⸻

📋 Overview

ailogogenerator is a training/demo mobile app that simulates the Hexa AI Logo & Art Generator. Built with Expo (managed workflow) and Firebase, it showcases:
	•	✏️ Input Screen: Collects user prompts.
	•	🔄 Status Chip: “Processing” for 30–60 s, then switches to “Done.”
	•	🎨 Output Screen: Displays a mock-generated image.

This repo is structured and documented following best practices to aid learning and future integration with real AI backends.

⸻

🚀 Quick Start
	1.	Clone & install

git clone https://github.com/your-org/ailogogenerator.git
cd ailogogenerator
npm install   # or yarn install


	2.	Configure Firebase
	•	Create a Firebase project.
	•	Copy your GoogleService-Info.plist / google-services.json into /ios and /android as needed.
	•	In firebaseConfig.ts, replace placeholders with your Firebase credentials.
	3.	Run locally

npm run start
npm run android   # or ios / web


	4.	Simulate logo generation
	•	Enter text or options on the Input screen.
	•	Tap Generate; watch the status chip.
	•	Once Done, tap the chip to view the Output screen.

⸻

📁 Project Structure

ailogogenerator/
├── assets/               # Fonts, images, icons
├── src/
│   ├── components/       # Reusable UI pieces (Button, Chip, etc.)
│   ├── navigation/       # React Navigation stacks
│   ├── screens/          # InputScreen.tsx, OutputScreen.tsx
│   ├── services/         # Firebase + mock API functions
│   ├── styles/           # Shared style constants
│   └── utils/            # Helpers (timers, random delays)
├── App.tsx               # Entry point
├── package.json  
└── tsconfig.json  



⸻

🔧 Scripts

"scripts": {
  "start": "expo start",          // start Metro bundler
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
}



⸻

🛠️ Tech Stack & Dependencies
	•	Expo (SDK 53)
	•	React Native 0.79
	•	TypeScript for type safety
	•	React Navigation v7
	•	Firebase (Auth, Firestore, Functions)
	•	expo-linear-gradient, expo-clipboard, react-native-progress, react-native-svg, @expo-google-fonts/manrope

⸻

✅ Best Practices Illustrated
	1.	Modular Code
	•	Separate screens, components, services.
	2.	Type Safety
	•	Strongly typed with TypeScript and @types/*.
	3.	Async Flow
	•	Simulated back-end via timer in frontend, easily swap for real Cloud Function.
	4.	State Management
	•	Hooks (useState, useEffect) and context as needed.
	5.	Clean Git History
	•	Frequent, descriptive commits (feature branches → PRs).
	6.	Documentation
	•	This README, in-code JSDoc comments.

⸻

📚 Learning & Training Notes
	•	Frontend Simulation: Use setTimeout with a random value to mock AI processing.
	•	Future AI Integration: Swap mock service with an actual Firebase Function (python / Node.js) for real-time inference.
	•	UI/UX: Status chip color changes, touch feedback, consistent padding & typography (Manrope).
	•	Scalability: Component-driven design simplifies adding new screens (e.g., history, settings).

—
Happy coding and learning! 🚀
