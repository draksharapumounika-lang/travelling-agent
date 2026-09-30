import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  Heart,
  Utensils,
  Camera,
  Trees,
  Landmark,
  ShoppingBag,
  Moon,
  Coffee,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Loader2,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  TripPlanRequest,
  BudgetTier,
  TravelParty,
  TravelStyle
} from '../types/travel';
import { SAMPLE_TRIPS } from '../data/sampleTrips';
import { TripPlan } from '../types/travel';

interface TripPlannerFormProps {
  onGenerate: (data: TripPlanRequest) => void;
  isLoading: boolean;
  onSelectSample: (trip: TripPlan) => void;
}

const POPULAR_DESTINATIONS = [
  { name: 'Tokyo & Kyoto, Japan', vibe: 'Temples & Cyberpunk' },
  { name: 'Amalfi Coast, Italy', vibe: 'Clifftop Glamour' },
  { name: 'Reykjavik & South Coast, Iceland', vibe: 'Glaciers & Auroras' },
  { name: 'Swiss Alps (Zermatt & Lucerne)', vibe: 'Peaks & Fondue' },
  { name: 'Costa Rica (Arenal & Manuel Antonio)', vibe: 'Rainforest & Pura Vida' },
  { name: 'Oaxaca, Mexico', vibe: 'Culinary & Mezcal' },
  { name: 'Cape Town & Winelands, South Africa', vibe: 'Coastlines & Vineyards' },
  { name: 'Santorini & Milos, Greece', vibe: 'Cycladic Sunsets' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
  { code: 'CHF', symbol: 'CHF', label: 'CHF' },
];

const BUDGET_TIERS: {
  id: BudgetTier;
  label: string;
  desc: string;
  icon: string;
  costGuideline: string;
}[] = [
  {
    id: 'backpacker',
    label: 'Backpacker / Budget',
    desc: 'Hostels, local transit, street food & free landmarks',
    icon: '🎒',
    costGuideline: '$40 - $80 / day',
  },
  {
    id: 'moderate',
    label: 'Comfort & Balanced',
    desc: 'Boutique stays, casual trattorias, key excursions',
    icon: '✨',
    costGuideline: '$120 - $250 / day',
  },
  {
    id: 'upscale',
    label: 'Upscale / Premium',
    desc: '4-star design hotels, fine dining, private tours',
    icon: '🍸',
    costGuideline: '$300 - $600 / day',
  },
  {
    id: 'luxury',
    label: 'Ultra-Luxury',
    desc: '5-star grand resorts, Michelin stars & VIP access',
    icon: '👑',
    costGuideline: '$800+ / day',
  },
];

const TRAVEL_PARTIES: { id: TravelParty; label: string; icon: string }[] = [
  { id: 'solo', label: 'Solo Traveler', icon: '👤' },
  { id: 'couple', label: 'Couple / Romance', icon: '💑' },
  { id: 'family', label: 'Family with Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Friends Group', icon: '🎉' },
];

const TRAVEL_STYLES: { id: TravelStyle; label: string; icon: string; desc: string }[] = [
  { id: 'balanced', label: 'Balanced & Thoughtful', icon: '⚖️', desc: 'Mix of iconic landmarks and leisurely café time' },
  { id: 'fast-paced', label: 'Fast-Paced Explorer', icon: '⚡', desc: 'Maximize sights and cover maximum ground' },
  { id: 'slow-leisurely', label: 'Slow & Immersive', icon: '☕', desc: 'Unrushed mornings, deep local neighborhood walks' },
  { id: 'luxury-comfort', label: 'Luxury & Indulgent', icon: '🥂', desc: 'Pampering, world-class dining and scenic transfers' },
  { id: 'off-the-beaten-path', label: 'Hidden Gems', icon: '🧭', desc: 'Secret courtyards, local secrets, low tourist footfall' },
  { id: 'adventure-nature', label: 'Active Nature & Outdoor', icon: '🏔️', desc: 'Hiking, coastal treks, wildlife and trails' },
  { id: 'culinary-focused', label: 'Foodie & Culinary Focus', icon: '🍜', desc: 'Markets, tastings, wine and iconic dishes' },
  { id: 'cultural-deep-dive', label: 'History & Cultural Arts', icon: '🏛️', desc: 'Museums, ancient shrines, architecture and crafts' },
];

const INTEREST_TAGS = [
  { name: 'Culinary & Street Food', icon: Utensils },
  { name: 'History & Ancient Sites', icon: Landmark },
  { name: 'Nature & Scenic Hikes', icon: Trees },
  { name: 'Art Galleries & Museums', icon: Camera },
  { name: 'Local Markets & Shopping', icon: ShoppingBag },
  { name: 'Cocktail Bars & Nightlife', icon: Moon },
  { name: 'Cafés & Specialty Coffee', icon: Coffee },
  { name: 'Romantic Sunsets & Views', icon: Heart },
];

const DIETARY_OPTIONS = [
  'No Restrictions',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Halal',
  'Kosher',
  'Gluten-Free / Celiac-Friendly',
  'Dairy-Free',
];

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  onGenerate,
  isLoading,
  onSelectSample,
}) => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(5);
  const [useExactDates, setUseExactDates] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelMonth, setTravelMonth] = useState('Upcoming Spring / Autumn');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('moderate');
  const [targetBudget, setTargetBudget] = useState<string>('');
  const [currency, setCurrency] = useState('USD');
  const [party, setParty] = useState<TravelParty>('couple');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('balanced');
  const [interests, setInterests] = useState<string[]>([
    'Culinary & Street Food',
    'History & Ancient Sites',
    'Romantic Sunsets & Views',
  ]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>(['No Restrictions']);
  const [mobility, setMobility] = useState('Standard walking (10k-15k steps/day)');
  const [specialNotes, setSpecialNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter((i) => i !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const toggleDietary = (opt: string) => {
    if (opt === 'No Restrictions') {
      setSelectedDietary(['No Restrictions']);
      return;
    }
    const filtered = selectedDietary.filter((d) => d !== 'No Restrictions');
    if (filtered.includes(opt)) {
      const next = filtered.filter((d) => d !== opt);
      setSelectedDietary(next.length === 0 ? ['No Restrictions'] : next);
    } else {
      setSelectedDietary([...filtered, opt]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setErrorMessage('Please enter a destination to start planning.');
      return;
    }
    setErrorMessage('');

    onGenerate({
      destination: destination.trim(),
      days,
      startDate: useExactDates ? startDate : undefined,
      endDate: useExactDates ? endDate : undefined,
      travelMonth: !useExactDates ? travelMonth : undefined,
      budgetTier,
      targetBudget: targetBudget ? Number(targetBudget) : undefined,
      currency,
      party,
      travelStyle,
      interests,
      dietary: selectedDietary.filter((d) => d !== 'No Restrictions'),
      mobility,
      specialNotes: specialNotes.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Intro */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored AI Travel Designer</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Where shall we whisk you away to?
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Share your dream destination, budget, style, and travel desires. Our AI travel agent designs an exquisite, geographically sequenced day-by-day journey.
        </p>

        {/* Quick Sample Itineraries Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/60">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Or explore our pre-curated signature itineraries:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SAMPLE_TRIPS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-xs font-medium text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <span className="text-amber-400">✨</span>
                <span>{sample.destination}</span>
                <span className="text-[11px] text-slate-500 group-hover:text-amber-300 font-mono">
                  ({sample.daysCount}d)
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Planning Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative"
      >
        {/* Glow ambient accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Section 1: Destination */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            1. Destination or Region
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 pointer-events-none" />
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="e.g. Kyoto & Tokyo, Japan, Amalfi Coast, Swiss Alps, Costa Rica..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-base font-medium outline-none transition-all shadow-inner"
            />
          </div>

          {errorMessage && (
            <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              {errorMessage}
            </p>
          )}

          {/* Destination suggestion chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-xs text-slate-400 py-1 mr-1">Inspirations:</span>
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                type="button"
                key={dest.name}
                onClick={() => setDestination(dest.name)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  destination === dest.name
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-medium'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Duration & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Days selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-200">
                2. Trip Duration
              </label>
              <span className="text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {days} {days === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <input
                type="range"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
                <span>1 Day</span>
                <span>Weekend (3d)</span>
                <span>1 Week (7d)</span>
                <span>10 Days</span>
                <span>2 Weeks (14d)</span>
              </div>
            </div>
          </div>

          {/* Dates or Season */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-200">
                3. Travel Dates / Season
              </label>
              <button
                type="button"
                onClick={() => setUseExactDates(!useExactDates)}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
              >
                {useExactDates ? 'Switch to Flexible Season' : 'Specify Exact Calendar Dates'}
              </button>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
              {useExactDates ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-rose-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-rose-500 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:border-rose-500 outline-none"
                  >
                    <option value="Spring (March - May)">🌸 Spring (March - May) - Blossoms & mild weather</option>
                    <option value="Summer (June - August)">☀️ Summer (June - August) - Long days & coastlines</option>
                    <option value="Autumn (September - November)">🍁 Autumn (September - November) - Foliage & harvest</option>
                    <option value="Winter (December - February)">❄️ Winter (December - February) - Snow, festive & lights</option>
                    <option value="Flexible upcoming months">✨ Flexible / Any Upcoming Season</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Budget Tier & Currency */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <label className="text-sm font-semibold text-slate-200">
              4. Budget Level & Target Spend
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-amber-300 focus:border-rose-500 outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BUDGET_TIERS.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setBudgetTier(tier.id)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all relative ${
                  budgetTier === tier.id
                    ? 'bg-gradient-to-b from-amber-500/10 to-rose-500/10 border-amber-500/80 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{tier.icon}</span>
                  <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {tier.costGuideline}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{tier.label}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{tier.desc}</p>
                {budgetTier === tier.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                )}
              </div>
            ))}
          </div>

          {/* Optional exact target budget */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-slate-400">Optional Total Budget Cap:</span>
            <div className="relative w-44">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                {CURRENCIES.find((c) => c.code === currency)?.symbol || '$'}
              </span>
              <input
                type="number"
                value={targetBudget}
                onChange={(e) => setTargetBudget(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:border-rose-500 outline-none"
              />
            </div>
            <span className="text-[11px] text-slate-500">
              (AI calculates realistic category breakdown accordingly)
            </span>
          </div>
        </div>

        {/* Section 4: Travel Party & Travel Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Party */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              5. Who is Traveling?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {TRAVEL_PARTIES.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setParty(p.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                    party === p.id
                      ? 'bg-rose-500/15 border-rose-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-xs">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              6. Preferred Travel Style
            </label>
            <div className="relative">
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-rose-500 outline-none"
              >
                {TRAVEL_STYLES.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.icon} {style.label} - {style.desc}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Current Vibe: {TRAVEL_STYLES.find((s) => s.id === travelStyle)?.desc}
            </p>
          </div>
        </div>

        {/* Section 5: Traveler Interests */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            7. What Interests You Most? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {INTEREST_TAGS.map((interest) => {
              const Icon = interest.icon;
              const isSelected = interests.includes(interest.name);
              return (
                <button
                  type="button"
                  key={interest.name}
                  onClick={() => toggleInterest(interest.name)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-rose-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-rose-400' : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate">{interest.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-rose-400 ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Section: Dietary, Mobility & Bucket List Notes */}
        <div className="mb-8 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-amber-400">⚡</span>
              <span>Dietary, Mobility & Bucket-List Requests (Optional)</span>
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              {/* Dietary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Dietary Preferences:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DIETARY_OPTIONS.map((opt) => {
                    const isSelected = selectedDietary.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleDietary(opt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-medium'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobility */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Walking & Mobility Pace:
                </label>
                <select
                  value={mobility}
                  onChange={(e) => setMobility(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-rose-500"
                >
                  <option value="Leisurely / Wheelchair & stroller accessible">
                    Leisurely / Wheelchair & Stroller Accessible (flat paths, elevators)
                  </option>
                  <option value="Standard walking (10k-15k steps/day)">
                    Standard Walking (10,000 - 15,000 steps/day, moderate stairs)
                  </option>
                  <option value="High endurance hiker (20k+ steps, steep inclines)">
                    High Endurance Hiker (20,000+ steps, steep inclines & trails)
                  </option>
                </select>
              </div>

              {/* Special notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Special Bucket-List Desires & Notes:
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Celebrating our 5th anniversary, would love one special rooftop view, passionate about artisanal pottery, avoid very spicy foods..."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:via-rose-400 hover:to-indigo-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Crafting Your Bespoke {days}-Day Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Generate Complete Bespoke Trip Plan</span>
                <ArrowRight className="w-5 h-5 text-rose-200" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            Powered by Gemini AI • Structured day-by-day plans, local dining, budgets & insider secrets
          </p>
        </div>
      </form>
    </div>
  );
};
