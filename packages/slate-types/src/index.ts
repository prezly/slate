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
        Editor: AdditionalCustomTypes['Editor'] extends unknown
            ? BaseEditor & ReactEditor
            : BaseEditor & ReactEditor & AdditionalCustomTypes['Editor'];
        Element: AdditionalCustomTypes['Element'] extends unknown
            ? BlockNode | InlineNode
            : BlockNode | InlineNode | AdditionalCustomTypes['Element'];
        Text: AdditionalCustomTypes['Text'] extends unknown
            ? TextNode
            : TextNode | AdditionalCustomTypes['Text'];
    }
}
