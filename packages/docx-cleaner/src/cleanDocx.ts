import cleanBrElements from './cleanBrElements';
import cleanEmptyElements from './cleanEmptyElements';
import cleanEmptyParagraphs from './cleanEmptyParagraphs';
import cleanFontElements from './cleanFontElements';
import cleanFootnotes from './cleanFootnotes';
import cleanImageElements from './cleanImageElements';
import cleanLinkElements from './cleanLinkElements';
import cleanListElements from './cleanListElements';
import cleanQuotes from './cleanQuotes';
import cleanSpans from './cleanSpans';
import cleanTextNodes from './cleanTextNodes';
import isDocxContent from './isDocxContent';
import postCleanHtml from './postCleanHtml';
import preCleanHtml from './preCleanHtml';

const parser = new DOMParser();

const cleanDocx = (html: string, rtf: string): string => {
    const document = parser.parseFromString(preCleanHtml(html), 'text/html');
    const { body } = document;

    if (!rtf && !isDocxContent(body)) {
        return html;
    }

    cleanFootnotes(body);
    cleanImageElements(document, rtf, body);
    cleanEmptyElements(body);
    cleanEmptyParagraphs(body);
    cleanQuotes(body);
    cleanSpans(body);
    cleanTextNodes(body);
    cleanBrElements(body);
    cleanLinkElements(body);
    cleanFontElements(body);
    cleanListElements(body);

    return postCleanHtml(body.innerHTML);
};

export default cleanDocx;
