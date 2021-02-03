const GOOGLE_DOCS_ID_PREFIX = 'docs-internal-guid';

const isGoogleDocsWrapper = (element: HTMLElement): boolean =>
    element.id.startsWith(GOOGLE_DOCS_ID_PREFIX);

export default isGoogleDocsWrapper;
