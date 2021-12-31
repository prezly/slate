import { isGoogleDocsWrapper } from '@prezly/slate-commons';

/**
 * Google Docs adds an extra <br class="Apple-interchange-newline"> at the end of HTML
 * in clipboard. We don't want to covert it to an empty paragraph/line, so we remove it.
 */
function normalizeGoogleDocsAppleNewline(document: Document): boolean {
    const br = document.querySelector('br.Apple-interchange-newline');

    if (!br) {
        return false;
    }

    br.remove();
    return true;
}

function normalizeGoogleDocsAppleNewlines(document: Document): Document {
    const [firstChild] = document.body.childNodes;

    if (!firstChild || !(firstChild instanceof HTMLElement) || !isGoogleDocsWrapper(firstChild)) {
        return document;
    }

    while (normalizeGoogleDocsAppleNewline(document));
    return document;
}

export default normalizeGoogleDocsAppleNewlines;
