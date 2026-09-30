import React from 'react';
import { Compass, Sparkles, Bookmark, Printer, MessageSquare, Plus } from 'lucide-react';

interface HeaderProps {
  onNewTrip: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  onToggleChat: () => void;
  isChatOpen: boolean;
  hasActiveTrip: boolean;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewTrip,
  onOpenSaved,
  savedCount,
  onToggleChat,
  isChatOpen,
  hasActiveTrip,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onNewTrip}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-[2px] shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Wanderlust
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-rose-500 text-white font-mono uppercase tracking-wider">
                AI Agent
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Intelligent Bespoke Travel Designer
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onNewTrip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Plan a new bespoke trip"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Plan Trip</span>
          </button>

          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors"
            title="View saved itineraries"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Saved Trips</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {hasActiveTrip && (
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors"
              title="Print or export as PDF"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline">Print / PDF</span>
            </button>
          )}

          {hasActiveTrip && (
            <button
              onClick={onToggleChat}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                isChatOpen
                  ? 'bg-rose-500 text-white shadow-rose-500/30'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-95 shadow-amber-500/20'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Concierge</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
