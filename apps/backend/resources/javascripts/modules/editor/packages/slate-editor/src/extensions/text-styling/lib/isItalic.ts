export function isItalic(element: HTMLElement): boolean {
    const fontStyle = element.style.getPropertyValue('font-style');

    return element.tagName === 'EM' || element.tagName === 'I' || fontStyle === 'italic';
}
