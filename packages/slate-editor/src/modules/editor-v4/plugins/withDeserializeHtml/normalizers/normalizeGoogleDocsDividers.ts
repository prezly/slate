import { isGoogleDocsWrapper } from '@prezly/slate-commons';

/**
 * <hr> copied from google docs have invalid structure: <p><hr /></p>
 * It gets interpreted by DOMParser as <p/><hr/></p>.
 * That's why we have to clean it up. See `google-docs-divider.html`.
 */
const normalizeGoogleDocsDivider = (document: Document): boolean => {
    const hr = document.querySelector('hr');

    if (!hr) {
        return false;
    }

    if (
        hr.parentElement &&
        hr.previousSibling &&
        hr.previousSibling.nodeName === 'P' &&
        hr.previousSibling.childNodes.length === 0 &&
        hr.nextSibling &&
        hr.nextSibling.nodeName === 'P' &&
        hr.nextSibling.childNodes.length === 0
    ) {
        hr.parentElement.removeChild(hr.nextSibling);
        hr.parentElement.removeChild(hr.previousSibling);
        return true;
    }

    return false;
};

const normalizeGoogleDocsDividers = (document: Document): Document => {
    const firstChild = document.body.childNodes[0];

    if (!firstChild || !(firstChild instanceof HTMLElement) || !isGoogleDocsWrapper(firstChild)) {
        return document;
    }

    while (normalizeGoogleDocsDivider(document));
    return document;
};

export default normalizeGoogleDocsDividers;
