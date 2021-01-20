import ElementNode, { isElementNode } from './ElementNode';
import InlineNode, { isInlineNode } from './InlineNode';

export const HEADING_1_NODE_TYPE = 'heading-one';
export const HEADING_2_NODE_TYPE = 'heading-two';

export default interface HeadingNode extends ElementNode {
    children: InlineNode[];
    type: typeof HEADING_1_NODE_TYPE | typeof HEADING_2_NODE_TYPE;
}

export const isHeadingNode = (value: any): value is HeadingNode => {
    return (
        isElementNode(value) &&
        [HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE].includes(value.type) &&
        Array.isArray(value.children) &&
        value.children.every(isInlineNode)
    );
};
