export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import { ElementNode, TextNode } from './nodes';

declare module 'slate' {
    interface CustomTypes {
        Element: ElementNode;
        Text: TextNode;
    }
}
