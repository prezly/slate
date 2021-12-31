function isSlackLineBreak(element: Element): boolean {
    return (
        element instanceof HTMLElement &&
        element.dataset.stringifyType === 'paragraph-break' &&
        element.classList.contains('c-mrkdwn__br')
    );
}

function normalizeSlackLineBreaks(document: Document): Document {
    const { body } = document;

    for (const child of body.children) {
        if (isSlackLineBreak(child)) {
            const lineBreak = document.createElement('br');
            if (child.parentNode) {
                child.parentNode.replaceChild(lineBreak, child);
            }
        }
    }

    return document;
}

export default normalizeSlackLineBreaks;
