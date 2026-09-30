export type BudgetTier = 'backpacker' | 'moderate' | 'upscale' | 'luxury';
export type TravelParty = 'solo' | 'couple' | 'family' | 'friends';
export type TravelStyle =
  | 'balanced'
  | 'fast-paced'
  | 'slow-leisurely'
  | 'luxury-comfort'
  | 'off-the-beaten-path'
  | 'cultural-deep-dive'
  | 'culinary-focused'
  | 'adventure-nature';

export interface TripPlanRequest {
  destination: string;
  days: number;
  startDate?: string;
  endDate?: string;
  travelMonth?: string;
  budgetTier: BudgetTier;
  targetBudget?: number;
  currency: string;
  party: TravelParty;
  travelStyle: TravelStyle;
  interests: string[];
  dietary?: string[];
  mobility?: string;
  specialNotes?: string;
}

export interface ActivityItem {
  time: string;
  activity: string;
  location: string;
  duration: string;
  description: string;
  insiderTip: string;
  costEstimate: string;
  tags: string[];
}

export interface DiningItem {
  restaurantName: string;
  cuisine: string;
  specialtyDish: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  area: string;
  tip: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateTitle: string;
  theme: string;
  area: string;
  transitAdvice: string;
  estimatedDayCost: number;
  morning: ActivityItem;
  lunch: DiningItem;
  afternoon: ActivityItem;
  dinner: DiningItem;
  evening: ActivityItem;
  hiddenGem?: {
    name: string;
    description: string;
    whySpecial: string;
  };
  userNotes?: string;
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
  description: string;
  savingTip: string;
}

export interface StayRecommendation {
  neighborhoodName: string;
  vibe: string;
  whyStayHere: string;
  recommendedStayType: string;
  priceRange: string;
  safetyRating: string;
}

export interface PackingCategory {
  category: string;
  items: string[];
}

export interface TripPlan {
  id: string;
  createdAt: string;
  title: string;
  tagline: string;
  destination: string;
  daysCount: number;
  budgetTier: BudgetTier;
  currency: string;
  travelParty: TravelParty;
  travelStyle: TravelStyle;
  datesLabel: string;
  overview: {
    summary: string;
    bestTimeToVisit: string;
    expectedWeather: string;
    localCurrencyAndTipping: string;
    culturalEtiquette: string[];
    transportationTips: string;
    safetyAndEmergency: string;
  };
  budgetBreakdown: {
    totalEstimatedCost: number;
    currency: string;
    costPerPerson: number;
    categories: BudgetCategory[];
  };
  itinerary: ItineraryDay[];
  neighborhoodsAndStays: StayRecommendation[];
  packingList: PackingCategory[];
  agentAdvice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  actionSuggestions?: string[];
}
