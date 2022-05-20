import type { HtmlNode } from '@prezly/slate-types';
import { HTML_NODE_TYPE } from '@prezly/slate-types';

export function createHtmlBlock({ content }: Pick<HtmlNode, 'content'>): HtmlNode {
    return {
        type: HTML_NODE_TYPE,
        content,
        children: [{ text: '' }],
    };
}
