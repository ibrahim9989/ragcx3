import React from "react";

interface BackgroundGradientProps {
  className?: string;
  height?: string;
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  className = "",
  height = "100vh",
  ...props
}) => {
  // Define the gradient colors - dark purple to black gradient
  const fallbackBackground = `linear-gradient(180deg, #301B57 0%, #1F0F45 10%, #14092F 40%, #000000 100%)`;

  const gradientStyle = {
    backgroundImage: fallbackBackground,
    backgroundBlendMode: "normal" as const,
    opacity: "1",
    height: height,
    zIndex: "0",
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full overflow-hidden pointer-events-none ${className}`}
      style={gradientStyle}
      {...props}
    ></div>
  );
};

export default BackgroundGradient;
