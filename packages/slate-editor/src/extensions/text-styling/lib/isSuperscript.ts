export function isSuperscript(element: HTMLElement): boolean {
    const verticalAlign = element.style.getPropertyValue('vertical-align');

    return element.tagName === 'SUP' || verticalAlign === 'super';
}
