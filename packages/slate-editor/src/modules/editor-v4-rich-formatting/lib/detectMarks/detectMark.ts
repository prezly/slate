import { isGoogleDocsWrapper } from '@prezly/slate-commons';

export function detectMark(element: HTMLElement, hasMark: (element: HTMLElement) => boolean): boolean {
    if (isGoogleDocsWrapper(element)) {
        return false;
    }

    if (hasMark(element)) {
        return true;
    }

    if (element.parentElement) {
        return detectMark(element.parentElement, hasMark);
    }

    return false;
}
