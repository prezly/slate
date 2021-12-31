const GOOGLE_DOCS_ID_PREFIX = 'docs-internal-guid';

function isGoogleDocsWrapper(element: HTMLElement): boolean {
    return element.id.startsWith(GOOGLE_DOCS_ID_PREFIX);
}

export default isGoogleDocsWrapper;
