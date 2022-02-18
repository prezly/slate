import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const HTML_NODE_TYPE = 'html';

export interface HtmlNode extends ElementNode {
    type: typeof HTML_NODE_TYPE;
    content: string;
}

export function isHtmlNode(value: any): value is HtmlNode {
    return isElementNode<HtmlNode>(value, HTML_NODE_TYPE);
}
