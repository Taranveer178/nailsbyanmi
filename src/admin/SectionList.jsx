import { ChevronRight, Images } from "lucide-react";

export default function SectionList({
  sections,
  activeSectionId,
  onSelectSection,
}) {
  return (
    <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
      {/* MOBILE: Horizontal Swipeable Section Pills */}
      <div className="lg:hidden bg-[#DFD6C7]/55 border-b border-[#2F2C29]/10 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6E6961]">
            Select Website Section
          </span>
          <span className="text-[11px] text-[#8A755F] font-medium">
            {sections.length} sections
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {sections.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#1E1C19] text-[#F6F5F1] shadow-sm"
                    : "bg-white text-[#2F2C29] border border-[#2F2C29]/12 hover:border-[#2F2C29]/30"
                }`}
              >
                <span
                  className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-[2px] ${
                    isActive
                      ? "bg-[#8A755F] text-white"
                      : "bg-[#E1D9CC] text-[#2F2C29]"
                  }`}
                >
                  {sec.number}
                </span>
                <span>{sec.name}</span>
                <span
                  className={`text-[11px] ${
                    isActive ? "text-white/75" : "text-[#7A7165]"
                  }`}
                >
                  ({sec.items.length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP: Sticky Sidebar Section List */}
      <div className="hidden lg:block sticky top-24 bg-white border border-[#2F2C29]/12 rounded-[3px] overflow-hidden shadow-[0_12px_30px_-15px_rgba(47,44,41,0.08)]">
        <div className="px-5 py-4 bg-[#DFD6C7]/55 border-b border-[#2F2C29]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Images className="w-4 h-4 text-[#8A755F]" />
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#2F2C29]">
              Website Sections
            </h2>
          </div>
          <span className="text-[11.5px] font-medium text-[#6E6961]">
            {sections.length} total
          </span>
        </div>

        <nav className="divide-y divide-[#2F2C29]/10">
          {sections.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`w-full px-5 py-4 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#1E1C19] text-[#F6F5F1]"
                    : "bg-white hover:bg-[#F6F5F1] text-[#2F2C29]"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded-[2px] shrink-0 ${
                      isActive
                        ? "bg-[#8A755F] text-white"
                        : "bg-[#E1D9CC] text-[#2F2C29]"
                    }`}
                  >
                    {sec.number}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[14.5px] font-medium leading-snug truncate">
                      {sec.name}
                    </p>
                    <p
                      className={`text-[12px] mt-0.5 truncate ${
                        isActive ? "text-white/70" : "text-[#7A7165]"
                      }`}
                    >
                      {sec.items.length}{" "}
                      {sec.items.length === 1 ? "image" : "images"}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive
                      ? "text-[#DFD6C7] translate-x-0.5"
                      : "text-[#8A755F]/60"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}