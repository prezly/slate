import InlineNode from './InlineNode';

export default interface QuoteNode {
    children: InlineNode[];
    type: 'block-quote';
}
