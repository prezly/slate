const domParser = new DOMParser();

export function normalizeZeroWidthSpaces(document: Document): Document {
    const html = document.documentElement.outerHTML.replace(
        /<span data-slate-zero-width="n" data-slate-length="0">\n+<\/span>/gm,
        '',
    );

    return domParser.parseFromString(html, 'text/html');
}
