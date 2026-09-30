import React, { useState, useEffect } from 'react';
import { TripPlan, TripPlanRequest, ItineraryDay } from './types/travel';
import { SAMPLE_TRIPS } from './data/sampleTrips';
import { Header } from './components/Header';
import { TripPlannerForm } from './components/TripPlannerForm';
import { TripView } from './components/TripView';
import { AgentChatDrawer } from './components/AgentChatDrawer';
import { TweakDayModal } from './components/TweakDayModal';
import { SavedTripsModal } from './components/SavedTripsModal';
import { Sparkles, Loader2, Compass, AlertCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'wanderlust_ai_saved_trips_v1';

export default function App() {
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(null);
  const [isPlanning, setIsPlanning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [tweakingDayNumber, setTweakingDayNumber] = useState<number | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Initialize saved trips and default trip from localStorage or sample
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: TripPlan[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedTrips(parsed);
          setCurrentTrip(parsed[0]);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }

    // Default seed with sample trips
    setSavedTrips(SAMPLE_TRIPS);
    setCurrentTrip(SAMPLE_TRIPS[0]);
  }, []);

  // Save trips to localStorage whenever updated
  const persistTrips = (trips: TripPlan[]) => {
    setSavedTrips(trips);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  // Generate a brand new trip using Gemini AI
  const handleGenerateTrip = async (request: TripPlanRequest) => {
    setIsLoading(true);
    setErrorBanner(null);

    // Multi-step loading feedback
    setLoadingStep('Consulting local neighborhood transit & geography...');
    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Curating authentic dining spots & Michelin guides...');
    }, 2800);
    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Sequencing morning, afternoon & night activities...');
    }, 5500);
    const stepTimer3 = setTimeout(() => {
      setLoadingStep('Calculating cost breakdowns & packing essentials...');
    }, 8500);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.details || 'Failed to craft your trip plan.');
      }

      const newTrip: TripPlan = await response.json();
      setCurrentTrip(newTrip);

      // Save to saved trips list
      const nextSaved = [newTrip, ...savedTrips.filter((t) => t.id !== newTrip.id)];
      persistTrips(nextSaved);

      setIsPlanning(false);
    } catch (error: any) {
      console.error('Trip generation error:', error);
      setErrorBanner(
        error?.message || 'We encountered a momentary delay with the travel model. Please try again.'
      );
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // Update trip state (e.g. notes or packing items)
  const handleUpdateTrip = (updated: TripPlan) => {
    setCurrentTrip(updated);
    const nextSaved = savedTrips.map((t) => (t.id === updated.id ? updated : t));
    persistTrips(nextSaved);
  };

  // Tweak specific day handler
  const handleDayUpdated = (updatedDay: ItineraryDay) => {
    if (!currentTrip) return;
    const updatedTrip: TripPlan = {
      ...currentTrip,
      itinerary: currentTrip.itinerary.map((d) =>
        d.dayNumber === updatedDay.dayNumber ? updatedDay : d
      ),
    };
    handleUpdateTrip(updatedTrip);
  };

  const handleDeleteTrip = (id: string) => {
    const next = savedTrips.filter((t) => t.id !== id);
    persistTrips(next);
    if (currentTrip?.id === id) {
      setCurrentTrip(next.length > 0 ? next[0] : null);
    }
  };

  const handleImportTrip = (trip: TripPlan) => {
    const next = [trip, ...savedTrips.filter((t) => t.id !== trip.id)];
    persistTrips(next);
    setCurrentTrip(trip);
    setIsPlanning(false);
  };

  const handleSelectSample = (sample: TripPlan) => {
    setCurrentTrip(sample);
    setIsPlanning(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        onNewTrip={() => setIsPlanning(true)}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        savedCount={savedTrips.length}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        hasActiveTrip={!!currentTrip}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Error notification banner */}
        {errorBanner && (
          <div className="max-w-4xl mx-auto px-4 pt-4 no-print">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorBanner}</span>
              </div>
              <button
                onClick={() => setErrorBanner(null)}
                className="text-xs font-semibold hover:underline ml-4"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Loading overlay when crafting trip */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[3px] shadow-2xl shadow-rose-500/30 mb-6 animate-pulse">
              <div className="w-full h-full bg-slate-950 rounded-[21px] flex items-center justify-center">
                <Compass className="w-10 h-10 text-amber-400 animate-spin" />
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Designing Your Bespoke Itinerary
            </h2>
            <p className="text-sm sm:text-base text-amber-300 font-mono mb-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
              <span>{loadingStep || 'Connecting with Gemini travel intelligence...'}</span>
            </p>
            <p className="text-xs text-slate-400 max-w-md">
              Balancing walking distances, booking reservation windows, insider photo viewpoints, and authentic neighborhood dining.
            </p>
          </div>
        )}

        {/* View Switcher: Planning Form vs Active Trip View */}
        {isPlanning || !currentTrip ? (
          <TripPlannerForm
            onGenerate={handleGenerateTrip}
            isLoading={isLoading}
            onSelectSample={handleSelectSample}
          />
        ) : (
          <TripView
            trip={currentTrip}
            onTweakDay={(dayNum) => setTweakingDayNumber(dayNum)}
            onOpenChat={() => setIsChatOpen(true)}
            onPrint={handlePrint}
            onUpdateTrip={handleUpdateTrip}
          />
        )}
      </main>

      {/* Floating AI Concierge Button on mobile when drawer is closed */}
      {currentTrip && !isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 sm:hidden p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xl shadow-rose-500/30 flex items-center justify-center group no-print active:scale-95 transition-transform"
          title="Open AI Concierge"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* AI Concierge Chat Drawer */}
      <AgentChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        trip={currentTrip}
      />

      {/* Tweak Day Modal */}
      {tweakingDayNumber !== null && currentTrip && (
        <TweakDayModal
          isOpen={tweakingDayNumber !== null}
          onClose={() => setTweakingDayNumber(null)}
          dayNumber={tweakingDayNumber}
          trip={currentTrip}
          onDayUpdated={handleDayUpdated}
        />
      )}

      {/* Saved Trips Modal */}
      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        activeTripId={currentTrip?.id || null}
        onSelectTrip={(trip) => {
          setCurrentTrip(trip);
          setIsPlanning(false);
        }}
        onDeleteTrip={handleDeleteTrip}
        onImportTrip={handleImportTrip}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="font-serif font-bold text-slate-300">Wanderlust AI</span>
            <span>— Bespoke Travel Agent powered by Google Gemini</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Real-time itineraries</span>
            <span>•</span>
            <span>Local culinary discoveries</span>
            <span>•</span>
            <span>Budget transparency</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
