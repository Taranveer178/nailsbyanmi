import { useState, useEffect } from "react";
import { X, Upload, Check } from "lucide-react";

const DEFAULT_PREVIEW_IMAGE =
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85";

export default function ImageEditModal({
  isOpen,
  item,
  sectionName,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState(() => item?.title || "");
  const [tag, setTag] = useState(() => item?.tag || sectionName || "Studio Work");
  const [meta, setMeta] = useState(() => item?.meta || "New Upload");
  const [imagePreview, setImagePreview] = useState(
    () => item?.image || DEFAULT_PREVIEW_IMAGE
  );

  // Lock background scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFilePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: item ? item.id : `img-${Date.now()}`,
      title: title.trim(),
      tag: tag.trim() || "Studio",
      meta: meta.trim() || "Updated",
      status: item ? item.status : "visible",
      image: imagePreview,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#1E1C19]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] max-h-[92dvh] bg-[#F6F5F1] text-[#2F2C29] rounded-t-[14px] sm:rounded-[3px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Mobile Drag Pill */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <span className="w-10 h-1 rounded-full bg-[#2F2C29]/20" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-[#2F2C29]/12 flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A755F]">
              {sectionName}
            </span>
            <h3 className="text-[18px] sm:text-[20px] font-medium text-[#2F2C29]">
              {item ? "Edit Image Details" : "Add New Image"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-[3px] border border-[#2F2C29]/20 hover:bg-[#2F2C29] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-7 overflow-y-auto overscroll-contain space-y-5"
        >
          {/* Image Preview & Upload Trigger */}
          <div>
            <label className="block text-[12px] font-medium text-[#2F2C29] mb-2">
              Photo Preview
            </label>
            <div className="relative w-full h-48 sm:h-56 rounded-[3px] overflow-hidden bg-[#2F2C29] border border-[#2F2C29]/15">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover object-center"
                />
              )}

              <label className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-[#1E1C19]/85 hover:bg-[#1E1C19] backdrop-blur-md text-white text-[12.5px] font-medium px-3.5 py-2 rounded-[3px] border border-white/15 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Choose Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFilePick}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
              Title / Caption *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pearl Chrome Almond Extensions"
              className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Two-Column Tag & Subtitle */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
                Badge / Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Gel Extensions"
                className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-3.5 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
                Duration / Note
              </label>
              <input
                type="text"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                placeholder="e.g. 90 min"
                className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-3.5 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Save & Cancel Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-[#2F2C29]/20 text-[#2F2C29] text-[14px] font-medium py-3 rounded-[3px] hover:bg-[#E1D9CC]/40 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2F2C29] hover:bg-[#8A755F] text-[#F6F5F1] text-[14px] font-medium py-3 rounded-[3px] transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}