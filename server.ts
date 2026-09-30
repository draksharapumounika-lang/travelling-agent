import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to sanitize and extract JSON from model output
function cleanAndParseJSON(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return JSON.parse(cleaned);
}

// Structured prompt for generating a complete Trip Plan
app.post('/api/plan-trip', async (req, res) => {
  try {
    const {
      destination,
      days = 5,
      startDate,
      endDate,
      travelMonth,
      budgetTier = 'moderate',
      targetBudget,
      currency = 'USD',
      party = 'couple',
      travelStyle = 'balanced',
      interests = [],
      dietary = [],
      mobility = 'Standard walking',
      specialNotes = '',
    } = req.body;

    if (!destination || typeof destination !== 'string') {
      return res.status(400).json({ error: 'Destination is required' });
    }

    const calculatedDays = Math.min(Math.max(Number(days) || 3, 1), 14);

    const prompt = `
You are an expert luxury & bespoke travel agent specializing in crafting world-class, highly personalized travel itineraries.
Plan an unforgettable, realistic, and meticulously organized ${calculatedDays}-day trip to "${destination}".

User Specifications:
- Destination: ${destination}
- Duration: ${calculatedDays} days
- Travel Dates/Season: ${startDate ? `${startDate} to ${endDate}` : travelMonth || 'Flexible upcoming season'}
- Budget Tier: ${budgetTier} (Target budget: ${targetBudget ? `${targetBudget} ${currency}` : 'Optimized for ' + budgetTier})
- Currency: ${currency}
- Traveling Party: ${party}
- Preferred Travel Style: ${travelStyle}
- Traveler Interests: ${interests.length > 0 ? interests.join(', ') : 'Must-see landmarks, authentic local food, hidden spots'}
- Dietary Preferences/Restrictions: ${dietary.length > 0 ? dietary.join(', ') : 'None specified'}
- Mobility: ${mobility}
- Special Requests / Notes: ${specialNotes || 'None'}

Return ONLY a valid JSON object matching the following structure exactly (no extra markdown outside the JSON):
{
  "title": "Inspiring and evocative trip title",
  "tagline": "A compelling 1-sentence summary of the experience",
  "destination": "${destination}",
  "daysCount": ${calculatedDays},
  "budgetTier": "${budgetTier}",
  "currency": "${currency}",
  "travelParty": "${party}",
  "travelStyle": "${travelStyle}",
  "datesLabel": "${startDate ? `${startDate} - ${endDate}` : travelMonth || `${calculatedDays} Days Adventure`}",
  "overview": {
    "summary": "Engaging 2-3 paragraph overview of what makes this itinerary special, cultural context, and why the sequence was chosen.",
    "bestTimeToVisit": "Best months and seasonal highlights",
    "expectedWeather": "Expected temperatures, clothing advice, and seasonal conditions",
    "localCurrencyAndTipping": "Tipping culture, cash vs card acceptance, ATMs",
    "culturalEtiquette": [
      "Key cultural do's and don'ts 1",
      "Key cultural do's and don'ts 2",
      "Key cultural do's and don'ts 3",
      "Key cultural do's and don'ts 4"
    ],
    "transportationTips": "How to navigate locally (metro, taxis, high-speed rail, passes to buy in advance)",
    "safetyAndEmergency": "Safety tips, emergency numbers, trusted hospital areas or tourist police"
  },
  "budgetBreakdown": {
    "totalEstimatedCost": 1500,
    "currency": "${currency}",
    "costPerPerson": 750,
    "categories": [
      {
        "name": "Accommodation",
        "amount": 600,
        "percentage": 40,
        "description": "Boutique hotels or recommended stays",
        "savingTip": "Pro tip on booking neighborhood or timing"
      },
      {
        "name": "Food & Dining",
        "amount": 400,
        "percentage": 27,
        "description": "Local eateries, cafes, and standout dinners",
        "savingTip": "How to eat like a local and save"
      },
      {
        "name": "Activities & Admissions",
        "amount": 250,
        "percentage": 16,
        "description": "Museum tickets, guided experiences, entrance fees",
        "savingTip": "Passes or free museum day tips"
      },
      {
        "name": "Local Transportation",
        "amount": 150,
        "percentage": 10,
        "description": "Metro cards, regional trains, occasional ride shares",
        "savingTip": "Transit card passes advice"
      },
      {
        "name": "Contingency & Souvenirs",
        "amount": 100,
        "percentage": 7,
        "description": "Buffer fund, snacks, artisanal keepsakes",
        "savingTip": "Best authentic markets to shop"
      }
    ]
  },
  "itinerary": [
    // Array of EXACTLY ${calculatedDays} objects, one for each day
    {
      "dayNumber": 1,
      "dateTitle": "Day 1: Arrival & Historic Quarter Discovery",
      "theme": "Introduction & Iconic Heritage",
      "area": "Neighborhood or district name",
      "transitAdvice": "Walking & 1 short metro ride",
      "estimatedDayCost": 120,
      "morning": {
        "time": "09:00 AM",
        "activity": "Activity name",
        "location": "Exact landmark/place name",
        "duration": "2.5 hours",
        "description": "Detailed, vivid description of what the traveler will see and do.",
        "insiderTip": "Insider trick (e.g. enter through side gate, visit at 9am to avoid queues).",
        "costEstimate": "${currency} 15 or Free",
        "tags": ["Culture", "Must-See"]
      },
      "lunch": {
        "restaurantName": "Authentic restaurant or cafe name",
        "cuisine": "Cuisine type",
        "specialtyDish": "Must-order signature dish",
        "priceRange": "$$",
        "area": "District name",
        "tip": "Ordering or reservation recommendation"
      },
      "afternoon": {
        "time": "02:00 PM",
        "activity": "Activity name",
        "location": "Exact location",
        "duration": "2 hours",
        "description": "Engaging description of the afternoon exploration.",
        "insiderTip": "Insider advice.",
        "costEstimate": "${currency} 20",
        "tags": ["Walk", "Scenic"]
      },
      "dinner": {
        "restaurantName": "Dinner restaurant name",
        "cuisine": "Cuisine type",
        "specialtyDish": "Recommended dish & beverage",
        "priceRange": "$$$",
        "area": "District name",
        "tip": "Atmosphere tip or reservation advice"
      },
      "evening": {
        "time": "08:30 PM",
        "activity": "Evening stroll, viewpoint, or night venue",
        "location": "Exact location",
        "duration": "1.5 hours",
        "description": "Vivid description of the evening vibe.",
        "insiderTip": "Best view spot or drink recommendation.",
        "costEstimate": "${currency} 10",
        "tags": ["Nightlife", "Viewpoint"]
      },
      "hiddenGem": {
        "name": "Secret courtyard, micro-roastery, or overlooked viewpoint",
        "description": "What it is",
        "whySpecial": "Why most tourists miss it"
      }
    }
  ],
  "neighborhoodsAndStays": [
    {
      "neighborhoodName": "Neighborhood Name",
      "vibe": "Character & ambiance in 5-8 words",
      "whyStayHere": "Why this area is ideal for this trip style",
      "recommendedStayType": "Boutique hotel, ryokan, or design apartment",
      "priceRange": "${currency} 150-250 / night",
      "safetyRating": "Very safe & pedestrian friendly"
    },
    {
      "neighborhoodName": "Alternative Neighborhood",
      "vibe": "Character description",
      "whyStayHere": "Why it suits different travelers",
      "recommendedStayType": "Stay style",
      "priceRange": "${currency} 100-180 / night",
      "safetyRating": "Safe & vibrant"
    }
  ],
  "packingList": [
    {
      "category": "Clothing & Footwear",
      "items": ["Specific clothing item 1", "Item 2", "Item 3", "Item 4"]
    },
    {
      "category": "Electronics & Adapters",
      "items": ["Plug adapter type", "Power bank", "Specific gear"]
    },
    {
      "category": "Documents & Money",
      "items": ["Passport validity rules", "Credit card tips", "Local transit cards"]
    },
    {
      "category": "Health & Comfort",
      "items": ["Medications", "Sun/bug protection", "Comfort essentials"]
    }
  ],
  "agentAdvice": "A personal note from the AI travel agent offering 2-3 insider secrets and reassurance."
}

Ensure all ${calculatedDays} days are generated fully without truncation. Maintain realistic travel times and geographic clustering so activities are logically close to each other.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an award-winning bespoke luxury & experiential travel designer. You craft realistic, geographically sensible, and inspiring itineraries. Output strictly valid JSON.',
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '';
    const parsedData = cleanAndParseJSON(text);

    // Assign a unique id and timestamp
    const fullTripPlan = {
      id: 'trip_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      ...parsedData,
    };

    res.json(fullTripPlan);
  } catch (error: any) {
    console.error('Error generating trip plan:', error);
    res.status(500).json({
      error: 'Failed to generate trip plan',
      details: error?.message || 'Unknown error',
    });
  }
});

// Interactive AI Travel Agent Chat Concierge
app.post('/api/travel-chat', async (req, res) => {
  try {
    const { messages, tripContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const currentTripSnippet = tripContext
      ? `
CURRENT ITINERARY CONTEXT:
Destination: ${tripContext.destination}
Duration: ${tripContext.daysCount} days
Budget Tier: ${tripContext.budgetTier} (${tripContext.currency})
Party: ${tripContext.travelParty}
Travel Style: ${tripContext.travelStyle}
Overview: ${tripContext.overview?.summary || ''}
Days summary:
${tripContext.itinerary
  ?.map(
    (d: any) =>
      `Day ${d.dayNumber}: ${d.dateTitle} (${d.theme}) - Morning: ${d.morning?.activity}, Lunch: ${d.lunch?.restaurantName}, Afternoon: ${d.afternoon?.activity}, Dinner: ${d.dinner?.restaurantName}`
  )
  .join('\n')}
`
      : 'No trip context loaded yet.';

    const systemInstruction = `
You are the dedicated AI Travel Agent and personal travel concierge for Wanderlust AI.
You are warm, knowledgeable, hyper-attentive, and deeply cultured about worldwide travel.
You have immediate access to the traveler's active itinerary.

Your goals:
1. Answer any question about the destination, logistics, booking tips, visa advice, dining recommendations, packing, weather, scams to avoid, and hidden spots.
2. If the user asks to modify a day, recommend specific alternative spots with timings and neighborhood info.
3. Suggest 2-3 quick follow-up action prompts at the end under a structured tag [SUGGESTIONS: "Option 1", "Option 2", "Option 3"].
4. Keep answers crisp, beautifully formatted with bullet points, and inspiring.
`;

    const chatContents = messages.map((m: any) => ({
      role: m.role === 'agent' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Add context to the latest message or as a lead-in
    const promptWithContext = `
[Context: ${currentTripSnippet}]

Please respond to the user's latest query as their dedicated travel concierge.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: promptWithContext }] },
        ...chatContents,
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || '';

    // Extract quick action suggestions if present
    let cleanedText = replyText;
    let actionSuggestions: string[] = [];
    const suggestionsMatch = replyText.match(/\[SUGGESTIONS:\s*(.*?)\]/s);
    if (suggestionsMatch && suggestionsMatch[1]) {
      try {
        cleanedText = replyText.replace(suggestionsMatch[0], '').trim();
        // Extract quoted strings
        const matches = suggestionsMatch[1].match(/"([^"]+)"/g);
        if (matches) {
          actionSuggestions = matches.map((s) => s.replace(/"/g, ''));
        }
      } catch (e) {
        // fallback
      }
    }

    if (actionSuggestions.length === 0) {
      actionSuggestions = [
        'Recommend top sunset viewpoints',
        'Suggest rainy day alternatives',
        'What are the best street food spots?',
      ];
    }

    res.json({
      content: cleanedText,
      actionSuggestions: actionSuggestions.slice(0, 3),
    });
  } catch (error: any) {
    console.error('Error in travel chat:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error?.message || 'Unknown error',
    });
  }
});

// Tweak or regenerate a specific day
app.post('/api/tweak-day', async (req, res) => {
  try {
    const { tripContext, dayNumber, tweakInstruction } = req.body;

    const dayObj = tripContext?.itinerary?.find(
      (d: any) => d.dayNumber === dayNumber
    );

    const prompt = `
You are an expert travel agent. The traveler wants to modify Day ${dayNumber} of their trip to ${
      tripContext.destination
    }.

Current Day ${dayNumber} Itinerary:
Title: ${dayObj?.dateTitle}
Theme: ${dayObj?.theme}
Morning: ${dayObj?.morning?.activity}
Lunch: ${dayObj?.lunch?.restaurantName}
Afternoon: ${dayObj?.afternoon?.activity}
Dinner: ${dayObj?.dinner?.restaurantName}
Evening: ${dayObj?.evening?.activity}

Traveler's requested change: "${tweakInstruction}"
Currency: ${tripContext?.currency || 'USD'}
Budget Tier: ${tripContext?.budgetTier || 'moderate'}

Generate an updated Day ${dayNumber} object in valid JSON matching this schema exactly:
{
  "dayNumber": ${dayNumber},
  "dateTitle": "Updated Day ${dayNumber} Title",
  "theme": "Theme reflecting user request",
  "area": "Neighborhood or district",
  "transitAdvice": "Transit advice",
  "estimatedDayCost": 120,
  "morning": {
    "time": "09:30 AM",
    "activity": "Activity name",
    "location": "Location",
    "duration": "2 hours",
    "description": "Engaging description",
    "insiderTip": "Insider tip",
    "costEstimate": "${tripContext?.currency || 'USD'} 15",
    "tags": ["Tag1", "Tag2"]
  },
  "lunch": {
    "restaurantName": "Restaurant name",
    "cuisine": "Cuisine",
    "specialtyDish": "Dish",
    "priceRange": "$$",
    "area": "Neighborhood",
    "tip": "Tip"
  },
  "afternoon": {
    "time": "02:00 PM",
    "activity": "Activity name",
    "location": "Location",
    "duration": "2 hours",
    "description": "Engaging description",
    "insiderTip": "Insider tip",
    "costEstimate": "${tripContext?.currency || 'USD'} 20",
    "tags": ["Tag1", "Tag2"]
  },
  "dinner": {
    "restaurantName": "Restaurant name",
    "cuisine": "Cuisine",
    "specialtyDish": "Dish",
    "priceRange": "$$$",
    "area": "Neighborhood",
    "tip": "Tip"
  },
  "evening": {
    "time": "08:30 PM",
    "activity": "Activity name",
    "location": "Location",
    "duration": "1.5 hours",
    "description": "Engaging description",
    "insiderTip": "Insider tip",
    "costEstimate": "${tripContext?.currency || 'USD'} 10",
    "tags": ["Tag1", "Tag2"]
  },
  "hiddenGem": {
    "name": "Secret spot",
    "description": "Description",
    "whySpecial": "Why it is special"
  }
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsedDay = cleanAndParseJSON(response.text || '');
    res.json(parsedDay);
  } catch (error: any) {
    console.error('Error tweaking day:', error);
    res.status(500).json({
      error: 'Failed to update day itinerary',
      details: error?.message || 'Unknown error',
    });
  }
});

// Production or Dev Vite mounting
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Wanderlust AI Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
