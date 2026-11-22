import { useState, useEffect } from "react";
import { X, Upload, Check, Image as ImageIcon } from "lucide-react";
import { uploadGalleryImage } from "./cloudinary";
import ImageWithFallback from "../components/ImageWithFallback";

export default function ImageEditModal({
  isOpen,
  item,
  sectionId,
  sectionName,
  onClose,
  onSave,
}) {
  const isReview = sectionId === "reviews";
  const isService = sectionId === "nails" || sectionId === "hair-services";
  const isHairService = sectionId === "hair-services";
  const [title, setTitle] = useState(() => item?.title || "");
  const [tag, setTag] = useState(
    () => item?.tag || (isService || isReview ? "" : sectionName || "Studio Work")
  );
  const [meta, setMeta] = useState(
    () => item?.meta || (isService || isReview ? "" : "New Upload")
  );
  const [duration, setDuration] = useState(() => item?.duration || "");
  const [imageUrl, setImageUrl] = useState(
    () => item?.image || (isService ? "/logo.png" : "")
  );
  const [localPreview, setLocalPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const imagePreview = localPreview || imageUrl;
  useEffect(() => {
    if (!localPreview) return;
    return () => URL.revokeObjectURL(localPreview);
  }, [localPreview]);

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

  const handleFilePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const input = e.currentTarget;
    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    ) {
      setUploadError("Choose a JPG, PNG, WEBP, or GIF image under 10 MB.");
      input.value = "";
      return;
    }

    setLocalPreview(URL.createObjectURL(file));
    setImageUrl("");
    setIsUploading(true);
    setUploadError("");
    try {
      const uploadedImageUrl = await uploadGalleryImage(file);
      setImageUrl(uploadedImageUrl);
      setLocalPreview("");
    } catch (error) {
      console.error("Could not upload gallery image.", error);
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) return;
    if (!title.trim()) {
      setUploadError(isReview ? "Add the client's name before saving." : "Add a title before saving.");
      return;
    }
    if (isReview && !tag.trim()) {
      setUploadError("Add the service for this review.");
      return;
    }
    if (isReview && !meta.trim()) {
      setUploadError("Add the client's review before saving.");
      return;
    }
    if (isService && !tag.trim()) {
      setUploadError("Add the service price before saving.");
      return;
    }
    if (!imageUrl && !isService) {
      setUploadError("Upload an image to Cloudinary before saving.");
      return;
    }
    const savedItem = {
      id: item ? item.id : `img-${Date.now()}`,
      title: title.trim(),
      tag: tag.trim() || "Studio",
      meta: meta.trim() || "Updated",
      status: item ? item.status : "visible",
      image: imageUrl || "/logo.png",
    };
    if (isReview) {
      savedItem.name = title.trim();
      savedItem.service = tag.trim();
      savedItem.quote = meta.trim();
    }
    if (isService) savedItem.price = tag.trim();
    if (isHairService) savedItem.duration = duration.trim();
    onSave(savedItem);
    onClose();
  };

  return (
    <div
      onClick={isUploading ? undefined : onClose}
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
            disabled={isUploading}
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
              {imagePreview ? (
                <ImageWithFallback
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/70">
                  <ImageIcon className="w-8 h-8" aria-hidden="true" />
                  <span className="text-sm">No image selected</span>
                </div>
              )}

              <label className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-[#1E1C19]/85 hover:bg-[#1E1C19] backdrop-blur-md text-white text-[12.5px] font-medium px-3.5 py-2 rounded-[3px] border border-white/15 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Choose Photo</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFilePick}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading && (
                  <span className="absolute inset-0 flex items-center justify-center bg-[#1E1C19]/75 text-sm font-medium text-white">
                    Uploading to Cloudinary…
                  </span>
                )}
              </label>
            </div>
          </div>

          {uploadError && (
            <p role="alert" className="text-[13px] text-red-700">
              {uploadError}
            </p>
          )}

          {/* Title Input */}
          <div>
            <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
              {isReview
                ? "Client Name *"
                : isService
                  ? "Service Name *"
                  : "Title / Caption *"}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isReview
                  ? "e.g. Komal Singla"
                  : isService
                    ? "e.g. Hair Colour"
                    : "e.g. Pearl Chrome Almond Extensions"
              }
              className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Two-Column Tag & Subtitle */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
                {isReview ? "Service *" : isService ? "Price *" : "Badge / Tag"}
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder={
                  isReview
                    ? "e.g. Balayage & Gel Extensions"
                    : isService
                      ? "e.g. from ₹900"
                      : "e.g. Gel Extensions"
                }
                className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-3.5 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
                {isReview
                  ? "Review / Description *"
                  : isService
                    ? "Description"
                    : "Duration / Note"}
              </label>
              {isReview || isService ? (
                <textarea
                  required={isReview}
                  rows={isReview ? 4 : 3}
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                  placeholder={
                    isReview
                      ? "Write the client's review or service description"
                      : "Describe the service"
                  }
                  className="w-full resize-y bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-3.5 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
                />
              ) : (
                <input
                  type="text"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                  placeholder="e.g. 90 min"
                  className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-3.5 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
                />
              )}
            </div>
          </div>

          {isHairService && (
            <div>
              <label className="block text-[12px] font-medium text-[#2F2C29] mb-1.5">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 45 min"
                className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Save & Cancel Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="flex-1 bg-white border border-[#2F2C29]/20 text-[#2F2C29] text-[14px] font-medium py-3 rounded-[3px] hover:bg-[#E1D9CC]/40 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || (!imageUrl && !isService)}
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