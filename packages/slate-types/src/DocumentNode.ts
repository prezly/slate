import BlockNode from './BlockNode';

export default interface DocumentNode {
    children: BlockNode[];
    type: 'document';
    version: string;
}
