const BOLD_FONT_WEIGHTS = ['bold', 'bolder', '600', '700', '800', '900', '950'];

export function isBold(element: HTMLElement): boolean {
    const fontWeight = element.style.getPropertyValue('font-weight');

    return (
        element.tagName === 'B' ||
        element.tagName === 'STRONG' ||
        BOLD_FONT_WEIGHTS.includes(fontWeight)
    );
}
