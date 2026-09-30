import React, { useRef } from 'react';
import {
  X,
  Bookmark,
  Calendar,
  DollarSign,
  Trash2,
  Download,
  Upload,
  ArrowRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TripPlan } from '../types/travel';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: TripPlan[];
  activeTripId: string | null;
  onSelectTrip: (trip: TripPlan) => void;
  onDeleteTrip: (id: string) => void;
  onImportTrip: (trip: TripPlan) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  activeTripId,
  onSelectTrip,
  onDeleteTrip,
  onImportTrip,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedTrips, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `wanderlust_trips_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          parsed.forEach((t) => onImportTrip(t));
        } else if (parsed && parsed.destination && parsed.itinerary) {
          onImportTrip(parsed);
        }
      } catch (err) {
        alert('Invalid trip JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Saved Itineraries
            </h3>
            <p className="text-xs text-slate-400">
              {savedTrips.length} {savedTrips.length === 1 ? 'trip' : 'trips'} stored in your browser
            </p>
          </div>
        </div>

        {/* Trips list */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {savedTrips.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No saved trips yet. Plan your first adventure above!
            </div>
          ) : (
            savedTrips.map((trip) => {
              const isActive = trip.id === activeTripId;
              return (
                <div
                  key={trip.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-rose-500/10 border-rose-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm sm:text-base">
                        {trip.destination}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
                        {trip.daysCount} Days
                      </span>
                      <span className="text-[11px] text-slate-400 capitalize">
                        ({trip.budgetTier})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {trip.title}
                    </p>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Est. Total: {trip.currency} {trip.budgetBreakdown.totalEstimatedCost.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onSelectTrip(trip);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <span>{isActive ? 'Active' : 'Open Trip'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteTrip(trip.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions: Import / Export */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAll}
              disabled={savedTrips.length === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export Trips Backup (JSON)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Import Trips</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
