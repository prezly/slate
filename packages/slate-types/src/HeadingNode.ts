import InlineNode from './InlineNode';

export default interface HeadingNode {
    children: InlineNode[];
    type: 'heading-one' | 'heading-two';
}
