export function getClampedRatioInPercent(width: number, maxWidth: number) {
    return Math.min(100, (width / maxWidth) * 100);
}

export function getClampedWidthInPercent(
    width: number,
    maxWidth: number,
    maxWidthInPercent: number,
) {
    return Math.min(maxWidthInPercent, getClampedRatioInPercent(width, maxWidth));
}

export function increaseWidth(width: number, delta: number, minWidth: number, maxWidth: number) {
    return Math.min(maxWidth, Math.max(minWidth, width + delta));
}
