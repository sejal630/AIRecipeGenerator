# AI Recipe Generator

A modern, responsive, and highly aesthetic AI-powered Recipe Generator. The frontend is built with React (Vite) and styled with high-fidelity glassmorphic Vanilla CSS (including dark and light modes). The backend is built with Node.js + Express and integrates with the Google Gemini API using the official `@google/genai` SDK.

## Features

- **Fridge Ingredient Input**: Type available ingredients and press Enter or Comma to turn them into interactive tag badges.
- **Suggested Ingredients**: Quick click-to-add badges for common ingredients.
- **Cuisine Type Selector**: Choose from Indian, Chinese, Italian, Mexican, or Any Cuisine.
- **AI Recipe Generation**: Instantly creates realistic, step-by-step recipes with preparation time, estimated calories, ingredients with quantities, and instruction details.
- **Interactive Checklists**: Cross off steps as you cook so you never lose your place.
- **Light/Dark Mode Toggle**: Sleek theme transitions saved to local storage.
- **Printable Layout**: Clean print styles built-in so you can print your generated recipes.

---

## Folder Structure

```
ai-recipe-generator/
├── backend/                  # Node.js + Express Server
│   ├── .env.example          # Template for environment variables
│   ├── .env                  # Environment config (add your API key here)
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express server logic & Gemini integration
│
├── frontend/                 # React.js Frontend
│   ├── src/
│   │   ├── components/       # Loader, RecipeForm, RecipeCard
│   │   ├── App.jsx           # Application State & API Integration
│   │   ├── index.css         # Theme tokens, layout, glassmorphic card design
│   │   └── main.jsx          # React entry point
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite config with dev proxy configured
│   └── index.html            # Core entry HTML
│
└── README.md                 # Project guide
```

---

## Setup & Running Instructions

### 1. Add your Google Gemini API Key
To get a free API key, visit [Google AI Studio](https://aistudio.google.com/).
1. Open the file `backend/.env`.
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key:
   ```env
   GEMINI_API_KEY=AIzaSyD...
   PORT=5000
   ```

### 2. Start the Backend Server
Navigate to the `backend` folder and run the start script:
```bash
cd backend
npm run dev
```
The server will start on port `5000` (e.g., `http://localhost:5000`).

### 3. Start the Frontend Dev Server
Navigate to the `frontend` folder and start the dev environment:
```bash
cd frontend
npm run dev
```
Open the printed URL in your browser (usually `http://localhost:5173`).

---

## Development Notes
- The frontend includes a dev server proxy. API requests to `/generate-recipe` automatically route to `http://localhost:5000/generate-recipe`.
- No database is required. The generated recipe is held in React state for one-time display.
