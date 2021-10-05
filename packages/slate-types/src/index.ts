export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

import { BlockNode, InlineNode, TextNode } from './nodes';

export declare interface AdditionalCustomTypes {
    [key: string]: unknown;
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: AdditionalCustomTypes['Element'] | BlockNode | InlineNode;
        Text: AdditionalCustomTypes['Text'] | TextNode;
    }
}
