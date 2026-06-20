import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Google Gen AI Client
// It automatically picks up the GEMINI_API_KEY from environment variables.
const ai = new GoogleGenAI({});

// Endpoint to generate a recipe
app.post('/generate-recipe', async (req, res) => {
  const { ingredients, cuisine } = req.body;

  if (!ingredients || typeof ingredients !== 'string' || ingredients.trim() === '') {
    return res.status(400).json({ error: 'Please enter at least one ingredient.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return res.status(500).json({
      error: 'Google Gemini API Key is not configured. Please add your key to the backend/.env file.'
    });
  }

  try {
    const prompt = `Create a realistic and delicious recipe utilizing these ingredients: "${ingredients}".
Preferred Cuisine Type: ${cuisine || 'Any'}.

Guidelines:
1. Try to incorporate the provided ingredients as much as possible.
2. You can add common pantry items (salt, oil, water, basic spices) if needed.
3. Keep the recipe realistic, safe, and delicious.`;

    // Call Gemini API with structured JSON output schema
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            recipeName: {
              type: 'STRING',
              description: 'The name of the generated recipe, creative and appealing.'
            },
            preparationTime: {
              type: 'STRING',
              description: 'Total preparation and cooking time, e.g., "25 minutes" or "1 hour".'
            },
            ingredients: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'List of ingredients with exact quantities, e.g., "200g Paneer, cubed", "2 Tomatoes, finely chopped".'
            },
            instructions: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'Detailed step-by-step cooking instructions in order.'
            },
            estimatedCalories: {
              type: 'STRING',
              description: 'Estimated total calorie count for the dish, e.g., "350 kcal" or "420 calories per serving".'
            }
          },
          required: ['recipeName', 'preparationTime', 'ingredients', 'instructions', 'estimatedCalories']
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Received empty response from Gemini API.');
    }

    const recipeData = JSON.parse(responseText);
    res.json(recipeData);

  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({
      error: 'Failed to generate recipe. Please try again later.',
      details: error.message
    });
  }
});

// Redirect /api/generate-recipe to /generate-recipe for compatibility
app.post('/api/generate-recipe', (req, res) => {
  res.redirect(307, '/generate-recipe');
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`[Server] Running on port ${port}`);
  console.log(`[Server] Endpoint POST http://localhost:${port}/generate-recipe is active`);
});
