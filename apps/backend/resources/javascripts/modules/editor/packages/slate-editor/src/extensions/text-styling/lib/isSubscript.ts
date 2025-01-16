export function isSubscript(element: HTMLElement): boolean {
    const verticalAlign = element.style.getPropertyValue('vertical-align');

    return element.tagName === 'SUB' || verticalAlign === 'sub';
}
