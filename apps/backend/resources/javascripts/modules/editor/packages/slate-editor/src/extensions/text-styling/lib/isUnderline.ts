export function isUnderline(element: HTMLElement): boolean {
    const textDecoration = element.style.getPropertyValue('text-decoration');

    return element.tagName === 'U' || textDecoration.includes('underline');
}
