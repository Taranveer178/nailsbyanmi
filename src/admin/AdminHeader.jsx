import { ArrowLeft, LogOut, Plus, Sparkles } from "lucide-react";

export default function AdminHeader({ onBackToSite, onOpenAddModal, onSignOut, syncStatus }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1E1C19] text-[#F6F5F1] border-b border-white/10">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-3">
        {/* Left: Back Button + Studio Admin Title */}
        <div className="flex items-center gap-3 min-w-0">
          {onBackToSite && (
            <button
              type="button"
              onClick={onBackToSite}
              aria-label="Back to website"
              className="w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-[3px] bg-white/10 hover:bg-white/15 text-white flex items-center justify-center gap-2 text-[13px] font-medium transition-colors shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Live Site</span>
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DFD6C7] shrink-0" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#DFD6C7] font-medium truncate">
                Glam By Anmi · Admin
              </span>
            </div>
            <h1 className="text-[16px] sm:text-[19px] font-medium text-white leading-tight truncate">
              Studio Image Manager
            </h1>
          </div>
        </div>

        {/* Right: Quick Add Photo CTA */}
        <div className="flex shrink-0 items-center gap-2">
          <span
            role="status"
            className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium ${
              syncStatus === "connected" ? "text-emerald-200" : "text-[#DFD6C7]"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${syncStatus === "connected" ? "bg-emerald-300" : "bg-amber-300"}`} />
            {syncStatus === "connected" ? "Live" : syncStatus === "error" ? "Offline" : "Syncing"}
          </span>
          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign out"
            title="Sign out"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] bg-white/10 text-white transition-colors hover:bg-white/15 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 bg-[#F6F5F1] hover:bg-white active:scale-[0.98] text-[#1E1C19] text-[13px] sm:text-[13.5px] font-semibold px-3.5 sm:px-5 py-2.5 rounded-[3px] transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.25]" />
            <span>Add Image</span>
          </button>
        </div>
      </div>
    </header>
  );
}