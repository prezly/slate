import ElementNode, { isElementNode } from './ElementNode';
import InlineNode from './InlineNode';
import TextNode from './TextNode';

export const HEADING_1_NODE_TYPE = 'heading-one';
export const HEADING_2_NODE_TYPE = 'heading-two';

export default interface HeadingNode
    extends ElementNode<typeof HEADING_1_NODE_TYPE | typeof HEADING_2_NODE_TYPE> {
    children: (InlineNode | TextNode)[];
}

export const isHeadingNode = (value: any): value is HeadingNode => {
    return (
        isElementNode(value) &&
        (value.type === HEADING_1_NODE_TYPE || value.type === HEADING_2_NODE_TYPE)
    );
};
