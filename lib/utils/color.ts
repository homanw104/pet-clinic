/**
 * Functions that convert color values between different formats.
 */

/**
 * Turn "#FFFFFF" into "rgba(255, 255, 255, 1)".
 * @param hex strings like "#FFFFFF" (or without #)
 * @param alpha optional, specify alpha value from 0 ~ 1, default to 1
 */
export function hexToRGBA(hex: string, alpha = 1) {
  // Remove the '#' symbol and ensure the hex string is 6 characters long
  const trimmedHex = hex.replace("#", "").padStart(6, "0");

  // Convert each pair of hex characters to decimal values
  const r = parseInt(trimmedHex.slice(0, 2), 16);
  const g = parseInt(trimmedHex.slice(2, 4), 16);
  const b = parseInt(trimmedHex.slice(4, 6), 16);

  // Construct the rgba color string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
