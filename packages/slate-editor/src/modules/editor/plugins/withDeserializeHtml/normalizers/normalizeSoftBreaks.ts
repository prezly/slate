export function normalizeSoftBreaks(document: Document): Document {
    const allPreTags = document.querySelectorAll('pre');

    for (const preTag of allPreTags) {
        preTag.outerHTML = preTag.outerHTML.replaceAll('\n\n', '<br></br>');
    }

    return document;
}
