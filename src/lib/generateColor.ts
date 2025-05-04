export function getColorByLevel(level: number): string {
  const hue = (level * 60) % 360; // rotate hues every level
  const saturation = 70;
  const lightness = 60;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}