function getTextColorFromBackground(backgroundColor) {
  // Convert the background color to RGB
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = fullHexRegex.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Calculate the luminance of the color
  const calculateLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const factorR = 0.2126;
    const factorG = 0.7152;
    const factorB = 0.0722;

    const luminance = (r * factorR + g * factorG + b * factorB) / 255;

    return luminance;
  };

  // Get the RGB values from the background color
  const rgb = hexToRgb(backgroundColor);

  // Calculate the luminance
  const luminance = calculateLuminance(rgb);

  // Set the text color based on the luminance
  const textColor = luminance > 0.5 ? "#000000" : "#ffffff";

  return textColor;
}
