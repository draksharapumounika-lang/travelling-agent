import React, { useState } from 'react';
import { X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { TripPlan, ItineraryDay } from '../types/travel';

interface TweakDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  trip: TripPlan;
  onDayUpdated: (updatedDay: ItineraryDay) => void;
}

const QUICK_TWEAK_TEMPLATES = [
  'Rainy day backup: Replace outdoor activities with world-class indoor museums, art galleries & covered food halls',
  'Make it more relaxing: Slower morning start, leisure café brunch, and scenic sunset view',
  'Budget-friendly swap: Prioritize free architectural walks, local parks & authentic street food stalls',
  'Family & kid-friendly: Add engaging interactive exhibits, animal parks & accessible dining',
  'Romantic dinner & hidden wine bar: Upgrade evening with an intimate, lantern-lit ambiance',
];

export const TweakDayModal: React.FC<TweakDayModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  trip,
  onDayUpdated,
}) => {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const currentDay = trip.itinerary.find((d) => d.dayNumber === dayNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tweak-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripContext: trip,
          dayNumber,
          tweakInstruction: instruction.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update day itinerary');
      }

      const updatedDay: ItineraryDay = await response.json();
      onDayUpdated(updatedDay);
      onClose();
    } catch (err: any) {
      console.error('Error tweaking day:', err);
      setError('Could not update day. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            DAY {dayNumber}
          </span>
          <span className="text-xs text-slate-400">Customization Studio</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
          Tweak Day {dayNumber} Itinerary
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-4">
          Current Theme: <span className="text-slate-200">{currentDay?.theme || 'Day Exploration'}</span>
        </p>

        {/* Quick templates */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Quick Modification Ideas:
          </span>
          <div className="space-y-1.5">
            {QUICK_TWEAK_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInstruction(tmpl)}
                className="w-full text-left text-xs p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all flex items-start gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{tmpl}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Custom Adjustment Instructions:
            </label>
            <textarea
              rows={3}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. We want to spend the morning thrift shopping and eating ramen, followed by sunset drinks with live acoustic music..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-600 outline-none focus:border-rose-500"
            />
          </div>

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!instruction.trim() || isLoading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Re-sequencing Day {dayNumber}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Update Day Itinerary</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
