export function rgb(hex) {
  return hex.slice(1).match(/../g).map((channel) => parseInt(channel, 16));
}

export function mix(first, second, weight) {
  const a = rgb(first);
  return `#${rgb(second).map((b, i) => Math.round(a[i] + (b - a[i]) * weight)
    .toString(16).padStart(2, '0')).join('')}`;
}

function luminance(hex) {
  return rgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, channel, i) => sum + channel * [0.2126, 0.7152, 0.0722][i], 0);
}

export function contrast(first, second) {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// Check the actual reading surfaces together, rather than only the page ground.
export function readableColor(color, backgrounds, minimum = 4.6) {
  if (backgrounds.every((background) => contrast(color, background) >= minimum)) return color;
  const target = ['#000000', '#ffffff'].sort((a, b) =>
    Math.min(...backgrounds.map((bg) => contrast(b, bg))) -
    Math.min(...backgrounds.map((bg) => contrast(a, bg))))[0];
  for (let step = 1; step <= 100; step += 1) {
    const candidate = mix(color, target, step / 100);
    if (backgrounds.every((background) => contrast(candidate, background) >= minimum)) return candidate;
  }
  throw new Error(`No accessible color for ${color}`);
}
