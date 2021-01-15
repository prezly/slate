import InlineNode from './InlineNode';

export default interface ParagraphNode {
    children: InlineNode[];
    type: 'paragraph';
}
