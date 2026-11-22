import { useState } from "react";
import { Pencil, EyeOff, Eye, Trash2, Check, X } from "lucide-react";
import ImageWithFallback from "../components/ImageWithFallback";

export default function ImageCard({ item, onEdit, onToggleRemove, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isHidden = item.status === "hidden";

  return (
    <div
      className={`bg-white border rounded-[3px] overflow-hidden flex flex-col justify-between transition-all ${
        isHidden
          ? "border-[#2F2C29]/15 opacity-75"
          : "border-[#2F2C29]/12 shadow-[0_10px_28px_-14px_rgba(47,44,41,0.1)]"
      }`}
    >
      {/* Image Thumbnail Preview */}
      <div className="relative w-full aspect-[4/3] bg-[#2F2C29] overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover object-center transition-all duration-300 ${
            isHidden ? "grayscale opacity-60" : ""
          }`}
        />

        {/* Status Pill */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="bg-[#1E1C19]/80 backdrop-blur-md text-[#F6F5F1] text-[10.5px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-[2px]">
            {item.tag}
          </span>

          <span
            className={`text-[10.5px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-[2px] ${
              isHidden
                ? "bg-amber-900/90 text-amber-100"
                : "bg-[#F6F5F1]/95 text-[#1E1C19]"
            }`}
          >
            {isHidden ? "Hidden" : "Live"}
          </span>
        </div>
      </div>

      {/* Card Title & Info */}
      <div className="p-4 flex-1">
        <span className="block text-[11px] font-medium text-[#8A755F] uppercase tracking-wider mb-1">
          {item.meta}
        </span>
        <h3 className="text-[16px] font-medium text-[#2F2C29] leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>

      {/* Thumb-Friendly Action Bar: Edit | Remove | Delete */}
      <div className="px-3 pb-3 pt-1">
        {confirmDelete ? (
          <div className="bg-red-50 border border-red-200 rounded-[3px] p-2.5 flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-red-900">
              Delete permanently?
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold px-2.5 py-1.5 rounded-[2px] cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="inline-flex items-center gap-1 bg-white border border-[#2F2C29]/20 text-[#2F2C29] text-[12px] font-medium px-2.5 py-1.5 rounded-[2px] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>No</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {/* EDIT BUTTON */}
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="inline-flex items-center justify-center gap-1.5 bg-[#2F2C29] hover:bg-[#1E1C19] active:scale-[0.98] text-[#F6F5F1] text-[12.5px] font-medium py-2.5 px-2 rounded-[3px] transition-all cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            {/* REMOVE / RESTORE TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => onToggleRemove(item.id)}
              className={`inline-flex items-center justify-center gap-1.5 border text-[12.5px] font-medium py-2.5 px-2 rounded-[3px] transition-all active:scale-[0.98] cursor-pointer ${
                isHidden
                  ? "bg-[#E1D9CC] border-[#8A755F] text-[#2F2C29]"
                  : "bg-[#F6F5F1] hover:bg-[#E1D9CC]/70 border-[#2F2C29]/15 text-[#2F2C29]"
              }`}
            >
              {isHidden ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#8A755F]" />
                  <span>Restore</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#6E6961]" />
                  <span>Remove</span>
                </>
              )}
            </button>

            {/* DELETE BUTTON */}
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center justify-center gap-1.5 bg-red-50/80 hover:bg-red-100 active:scale-[0.98] border border-red-200 text-red-700 text-[12.5px] font-medium py-2.5 px-2 rounded-[3px] transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}