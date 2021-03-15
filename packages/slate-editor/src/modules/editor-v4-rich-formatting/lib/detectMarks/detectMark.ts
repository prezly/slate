import { isGoogleDocsWrapper } from '@prezly/slate-commons';

const detectMark = (element: HTMLElement, hasMark: (element: HTMLElement) => boolean): boolean => {
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
};

export default detectMark;
