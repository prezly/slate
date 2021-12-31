function isItalic(element: HTMLElement): boolean {
    const fontStyle = element.style.getPropertyValue('font-style');

    if (fontStyle) {
        return fontStyle === 'italic';
    }

    return ['EM', 'I'].includes(element.tagName);
}

export default isItalic;
