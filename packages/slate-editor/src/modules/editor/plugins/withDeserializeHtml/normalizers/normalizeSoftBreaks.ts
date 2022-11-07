const domParser = new DOMParser();

export function normalizeSoftBreaks(document: Document): Document {
    // First \n moves caret to the next line and second \n creates a new line
    const html = document.documentElement.outerHTML.replaceAll('\n\n', '<br></br>');
    return domParser.parseFromString(html, 'text/html');
}
