import TextNode from './TextNode';

export default interface LinkNode {
    children: TextNode[];
    href: string;
    type: 'link';
}
