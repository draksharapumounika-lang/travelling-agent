import React, { useState } from 'react';
import {
  TripPlan,
  ItineraryDay,
  ActivityItem,
  DiningItem
} from '../types/travel';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Sparkles,
  Coffee,
  Utensils,
  Moon,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Bookmark,
  Share2,
  Printer,
  Edit3,
  Luggage,
  Compass,
  ChevronRight,
  Info,
  Check,
  Plus,
  HelpCircle,
  Layers,
  Heart
} from 'lucide-react';

interface TripViewProps {
  trip: TripPlan;
  onTweakDay: (dayNumber: number) => void;
  onOpenChat: () => void;
  onPrint: () => void;
  onUpdateTrip: (updated: TripPlan) => void;
}

export const TripView: React.FC<TripViewProps> = ({
  trip,
  onTweakDay,
  onOpenChat,
  onPrint,
  onUpdateTrip,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'stays' | 'packing' | 'guide'>('itinerary');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | 'all'>('all');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});
  const [newCustomItem, setNewCustomItem] = useState('');
  const [editingNotesDay, setEditingNotesDay] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  // Toggle activity completion
  const toggleCompleted = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle packing checklist item
  const togglePacked = (item: string) => {
    setPackedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  // Add custom packing item
  const handleAddPackingItem = (categoryIndex: number) => {
    if (!newCustomItem.trim()) return;
    const updated = { ...trip };
    updated.packingList[categoryIndex].items.push(newCustomItem.trim());
    onUpdateTrip(updated);
    setNewCustomItem('');
  };

  // Save notes for a specific day
  const handleSaveNotes = (dayNum: number) => {
    const updated = { ...trip };
    const day = updated.itinerary.find((d) => d.dayNumber === dayNum);
    if (day) {
      day.userNotes = noteDraft;
      onUpdateTrip(updated);
    }
    setEditingNotesDay(null);
  };

  const handleShare = () => {
    const shareText = `Explore this bespoke itinerary for ${trip.destination}: "${trip.title}" (${trip.daysCount} days, ${trip.budgetTier} tier).`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${shareText}\n\nOverview: ${trip.overview.summary}`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const displayedDays =
    selectedDayNumber === 'all'
      ? trip.itinerary
      : trip.itinerary.filter((d) => d.dayNumber === selectedDayNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Trip Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-10 mb-8">
        {/* Background glow gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-500/15 via-amber-500/10 to-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {trip.destination}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              {trip.daysCount} Days
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">
              {trip.budgetTier} Tier
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
              {trip.travelParty} Party
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
              {trip.travelStyle.replace('-', ' ')}
            </span>
          </div>

          {/* Title & Tagline */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {trip.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {trip.tagline}
          </p>

          {/* Agent Insider Advice Banner */}
          {trip.agentAdvice && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-amber-200 text-sm">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">
                  AI Travel Agent Note:
                </span>
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  {trip.agentAdvice}
                </p>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Concierge</span>
              </button>
              <button
                onClick={onPrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
                title="Print or save as PDF"
              >
                <Printer className="w-4 h-4 text-blue-400" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
                title="Copy share summary to clipboard"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>{copiedShare ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Est. Total: <span className="text-amber-400 font-bold text-sm">{trip.budgetBreakdown.currency} {trip.budgetBreakdown.totalEstimatedCost.toLocaleString()}</span> (~{trip.budgetBreakdown.currency} {trip.budgetBreakdown.costPerPerson.toLocaleString()} / person)
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar gap-2 no-print">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'itinerary'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Day-by-Day Itinerary</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'budget'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Budget & Expenses</span>
        </button>

        <button
          onClick={() => setActiveTab('stays')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'stays'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Where to Stay</span>
        </button>

        <button
          onClick={() => setActiveTab('packing')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'packing'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Luggage className="w-4 h-4" />
          <span>Smart Packing List</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'guide'
              ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Essential Guide & Etiquette</span>
        </button>
      </div>

      {/* TAB 1: ITINERARY */}
      {activeTab === 'itinerary' && (
        <div>
          {/* Day Filter Pills */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar no-print">
            <span className="text-xs text-slate-400 font-medium mr-1">Filter Day:</span>
            <button
              onClick={() => setSelectedDayNumber('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedDayNumber === 'all'
                  ? 'bg-rose-500 border-rose-500 text-white font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All {trip.daysCount} Days
            </button>
            {trip.itinerary.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDayNumber(day.dayNumber)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-all ${
                  selectedDayNumber === day.dayNumber
                    ? 'bg-rose-500 border-rose-500 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>

          {/* Days Stream */}
          <div className="space-y-8">
            {displayedDays.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-xl print-break-inside"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        DAY {day.dayNumber}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Area: {day.area}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 font-mono">
                        Est: {trip.currency} {day.estimatedDayCost}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {day.dateTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      Theme: {day.theme} • {day.transitAdvice}
                    </p>
                  </div>

                  {/* Day Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-center no-print">
                    <button
                      onClick={() => onTweakDay(day.dayNumber)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
                      title="Request changes for this day"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tweak Day with AI</span>
                    </button>
                  </div>
                </div>

                {/* Timeline Grid: Morning, Lunch, Afternoon, Dinner, Evening */}
                <div className="space-y-6">
                  {/* MORNING */}
                  <ActivityCard
                    period="Morning"
                    icon={Sun}
                    colorClass="text-amber-400"
                    badgeBg="bg-amber-500/10 border-amber-500/20 text-amber-300"
                    activity={day.morning}
                    isDone={!!completedItems[`${day.dayNumber}_morning`]}
                    onToggle={() => toggleCompleted(`${day.dayNumber}_morning`)}
                  />

                  {/* LUNCH */}
                  <DiningCard
                    period="Lunch"
                    dining={day.lunch}
                    currency={trip.currency}
                  />

                  {/* AFTERNOON */}
                  <ActivityCard
                    period="Afternoon"
                    icon={Sun}
                    colorClass="text-rose-400"
                    badgeBg="bg-rose-500/10 border-rose-500/20 text-rose-300"
                    activity={day.afternoon}
                    isDone={!!completedItems[`${day.dayNumber}_afternoon`]}
                    onToggle={() => toggleCompleted(`${day.dayNumber}_afternoon`)}
                  />

                  {/* DINNER */}
                  <DiningCard
                    period="Dinner"
                    dining={day.dinner}
                    currency={trip.currency}
                  />

                  {/* EVENING */}
                  <ActivityCard
                    period="Evening & Night"
                    icon={Moon}
                    colorClass="text-indigo-400"
                    badgeBg="bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                    activity={day.evening}
                    isDone={!!completedItems[`${day.dayNumber}_evening`]}
                    onToggle={() => toggleCompleted(`${day.dayNumber}_evening`)}
                  />
                </div>

                {/* Hidden Gem Callout */}
                {day.hiddenGem && (
                  <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/25 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                          Day {day.dayNumber} Secret Gem:
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {day.hiddenGem.name}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {day.hiddenGem.description}
                      </p>
                      <p className="text-xs text-emerald-400/90 mt-1 font-medium">
                        Why Tourists Miss It: {day.hiddenGem.whySpecial}
                      </p>
                    </div>
                  </div>
                )}

                {/* Day Notes Section */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 no-print">
                  {editingNotesDay === day.dayNumber ? (
                    <div>
                      <textarea
                        rows={2}
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add personal notes, booking references, or ticket confirmation codes for this day..."
                        className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none focus:border-rose-500"
                      />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <button
                          onClick={() => setEditingNotesDay(null)}
                          className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(day.dayNumber)}
                          className="px-3 py-1 bg-rose-500 text-white rounded-lg text-xs font-medium"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div>
                        {day.userNotes ? (
                          <span className="text-slate-300 font-medium">
                            📝 Note: {day.userNotes}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">No custom notes added for Day {day.dayNumber}.</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesDay(day.dayNumber);
                          setNoteDraft(day.userNotes || '');
                        }}
                        className="text-slate-400 hover:text-white underline text-[11px]"
                      >
                        {day.userNotes ? 'Edit Note' : '+ Add Note'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BUDGET & EXPENSES */}
      {activeTab === 'budget' && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Total Estimated Spend
              </span>
              <div className="text-3xl font-serif font-bold text-amber-400">
                {trip.budgetBreakdown.currency}{' '}
                {trip.budgetBreakdown.totalEstimatedCost.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Optimized for {trip.daysCount} days & {trip.budgetTier} tier
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Estimated Cost Per Person
              </span>
              <div className="text-3xl font-serif font-bold text-rose-400">
                {trip.budgetBreakdown.currency}{' '}
                {trip.budgetBreakdown.costPerPerson.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Based on {trip.travelParty} travel party
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Average Daily Spend
              </span>
              <div className="text-3xl font-serif font-bold text-indigo-400">
                {trip.budgetBreakdown.currency}{' '}
                {Math.round(
                  trip.budgetBreakdown.totalEstimatedCost / trip.daysCount
                ).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Per day across entire party</p>
            </div>
          </div>

          {/* Category Breakdown list */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-white mb-6">
              Category Breakdown & Money-Saving Secrets
            </h3>

            <div className="space-y-6">
              {trip.budgetBreakdown.categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-300">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {cat.name}
                        </h4>
                        <p className="text-xs text-slate-400">{cat.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-amber-300">
                        {trip.budgetBreakdown.currency} {cat.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {cat.percentage}% of total
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full"
                      style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                    />
                  </div>

                  {/* Saving Tip */}
                  {cat.savingTip && (
                    <div className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        <strong>Agent Saving Tip:</strong> {cat.savingTip}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHERE TO STAY */}
      {activeTab === 'stays' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Recommended Neighborhoods & Accommodations
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Carefully chosen to match your {trip.budgetTier} budget and minimize daily transit time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trip.neighborhoodsAndStays.map((stay, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-white">
                        {stay.neighborhoodName}
                      </h4>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {stay.priceRange}
                      </span>
                    </div>

                    <div className="inline-block px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 mb-3">
                      Vibe: {stay.vibe}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {stay.whyStayHere}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Ideal Stay Type:</span>
                      <span className="font-medium text-slate-200">
                        {stay.recommendedStayType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Safety & Transit:</span>
                      <span className="font-medium text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {stay.safetyRating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SMART PACKING LIST */}
      {activeTab === 'packing' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Destination-Specific Smart Packing Checklist
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Customized for {trip.destination} climate, terrain, and itinerary activities.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              {Object.values(packedItems).filter(Boolean).length} items packed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trip.packingList.map((category, catIdx) => (
              <div
                key={catIdx}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800"
              >
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-rose-400" />
                  <span>{category.category}</span>
                </h4>

                <div className="space-y-2">
                  {category.items.map((item, itemIdx) => {
                    const isPacked = !!packedItems[item];
                    return (
                      <div
                        key={itemIdx}
                        onClick={() => togglePacked(item)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                          isPacked
                            ? 'bg-emerald-500/10 text-slate-400 line-through'
                            : 'hover:bg-slate-900 text-slate-200'
                        }`}
                      >
                        {isPacked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        )}
                        <span className="text-xs sm:text-sm">{item}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Add custom item form */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 no-print">
                  <input
                    type="text"
                    placeholder={`+ Add item to ${category.category}...`}
                    value={newCustomItem}
                    onChange={(e) => setNewCustomItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPackingItem(catIdx);
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-600 outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddPackingItem(catIdx)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ESSENTIAL GUIDE & ETIQUETTE */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">
              Essential Destination Guide & Etiquette
            </h3>

            {/* Overview text */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Destination Overview & Sequencing</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {trip.overview.summary}
              </p>
            </div>

            {/* Weather & Best time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-sm font-bold text-amber-300 mb-1 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Best Time to Visit</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {trip.overview.bestTimeToVisit}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-sm font-bold text-cyan-300 mb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Expected Weather & Clothing</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {trip.overview.expectedWeather}
                </p>
              </div>
            </div>

            {/* Cultural Etiquette */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-sm font-bold text-rose-300 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Cultural Etiquette & Local Customs</span>
              </h4>
              <ul className="space-y-2">
                {trip.overview.culturalEtiquette.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Money, Transit & Emergency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-300 mb-1 uppercase tracking-wider">
                  Currency & Tipping
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {trip.overview.localCurrencyAndTipping}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-indigo-300 mb-1 uppercase tracking-wider">
                  Transit & Navigation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {trip.overview.transportationTips}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-rose-300 mb-1 uppercase tracking-wider">
                  Safety & Emergency
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {trip.overview.safetyAndEmergency}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Activity card component
const ActivityCard: React.FC<{
  period: string;
  icon: any;
  colorClass: string;
  badgeBg: string;
  activity: ActivityItem;
  isDone: boolean;
  onToggle: () => void;
}> = ({ period, icon: Icon, colorClass, badgeBg, activity, isDone, onToggle }) => {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isDone
          ? 'bg-slate-950/30 border-slate-800/40 opacity-70'
          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${badgeBg}`}
          >
            {period}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {activity.time} • {activity.duration}
          </span>
        </div>

        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white no-print"
          title={isDone ? 'Mark as to-do' : 'Mark as done'}
        >
          {isDone ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-medium">Completed</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-600" />
              <span className="text-[11px]">Check off</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-2.5">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span>{activity.activity}</span>
        </h3>
        <p className="text-xs text-rose-400 font-medium flex items-center gap-1 mt-0.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{activity.location}</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-300 font-mono">{activity.costEstimate}</span>
        </p>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {activity.description}
        </p>

        {activity.insiderTip && (
          <div className="mt-2.5 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Insider Secret:</strong> {activity.insiderTip}
            </span>
          </div>
        )}

        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {activity.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Dining recommendation card component
const DiningCard: React.FC<{
  period: 'Lunch' | 'Dinner';
  dining: DiningItem;
  currency: string;
}> = ({ period, dining, currency }) => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <Utensils className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              {period} Spot:
            </span>
            <span className="text-sm font-bold text-white">
              {dining.restaurantName}
            </span>
            <span className="text-xs font-mono px-1.5 py-0.2 rounded bg-slate-900 text-amber-400 border border-slate-800">
              {dining.priceRange}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            <strong>Must-Try Dish:</strong> {dining.specialtyDish} ({dining.cuisine})
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Area: {dining.area} • {dining.tip}
          </p>
        </div>
      </div>
    </div>
  );
};
