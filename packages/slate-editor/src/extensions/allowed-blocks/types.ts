import type { ElementNode } from '@prezly/slate-types';

type DefaultBlockFn = () => ElementNode;

export interface Block {
    types: string[];
    defaultBlockFn: DefaultBlockFn;
}

export interface AllowedBlocksExtensionConfiguration {
    blocks: Block[];
}
