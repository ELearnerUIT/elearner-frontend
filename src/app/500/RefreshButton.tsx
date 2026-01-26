"use client";

import { RefreshCw } from "lucide-react";

export function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/60 hover:bg-slate-700/60 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 text-slate-100 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
    >
      <RefreshCw className="h-5 w-5" />
      Reload Page
    </button>
  );
}
