import { isGoogleDocsWrapper } from '#lib';

export function detectMark(
    element: HTMLElement,
    hasMark: (element: HTMLElement) => boolean,
): boolean {
    if (isGoogleDocsWrapper(element)) {
        return false;
    }

    return hasMark(element);
}
