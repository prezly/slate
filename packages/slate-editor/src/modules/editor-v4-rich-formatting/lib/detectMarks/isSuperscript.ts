function isSuperscript(element: HTMLElement): boolean {
    const verticalAlign = element.style.getPropertyValue('vertical-align');

    if (verticalAlign) {
        return verticalAlign === 'super';
    }

    return element.tagName === 'SUP';
}

export default isSuperscript;
