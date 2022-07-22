export function normalizeUselessBodyTags(document: Document): Document {
    for (const el of document.body.querySelectorAll('style')) {
        el.remove();
    }

    return document;
}
