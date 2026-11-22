import { useState } from "react";

const LOGO_IMAGE = "/logo.png";

export default function ImageWithFallback({
  src,
  component: ImageComponent = "img",
  style,
  onError,
  ...props
}) {
  const [failedSource, setFailedSource] = useState(null);
  const isUsingFallback = !src || failedSource === src;
  const imageSource = isUsingFallback || !src ? LOGO_IMAGE : src;

  const handleError = (event) => {
    onError?.(event);
    if (src && src !== LOGO_IMAGE) setFailedSource(src);
  };

  return (
    <ImageComponent
      {...props}
      src={imageSource}
      onError={handleError}
      style={
        isUsingFallback
          ? { ...style, objectFit: "contain", backgroundColor: "#fff" }
          : style
      }
    />
  );
}
