const BOLD_FONT_WEIGHTS = ['bold', 'bolder', '600', '700', '800', '900', '950'];

function isBold(element: HTMLElement): boolean {
    const fontWeight = element.style.getPropertyValue('font-weight');

    if (fontWeight) {
        return BOLD_FONT_WEIGHTS.includes(fontWeight);
    }

    return ['B', 'STRONG'].includes(element.tagName);
}

export default isBold;
