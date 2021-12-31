function isSubscript(element: HTMLElement): boolean {
    const verticalAlign = element.style.getPropertyValue('vertical-align');

    if (verticalAlign) {
        return verticalAlign === 'sub';
    }

    return element.tagName === 'SUB';
}

export default isSubscript;
