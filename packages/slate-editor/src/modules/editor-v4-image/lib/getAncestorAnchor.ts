function getAncestorAnchor(element: HTMLElement): HTMLAnchorElement | null {
    if (element.parentElement === null) {
        return null;
    }

    if (element.nodeName === 'A') {
        return element as HTMLAnchorElement;
    }

    return getAncestorAnchor(element.parentElement);
}

export default getAncestorAnchor;
