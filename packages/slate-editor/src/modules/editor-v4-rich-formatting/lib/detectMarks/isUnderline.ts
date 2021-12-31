function isUnderline(element: HTMLElement): boolean {
    const textDecoration = element.style.getPropertyValue('text-decoration');

    if (textDecoration) {
        return textDecoration.includes('underline');
    }

    return element.tagName === 'U';
}

export default isUnderline;
