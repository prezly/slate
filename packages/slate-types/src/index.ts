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
        Editor: unknown extends AdditionalCustomTypes['Editor']
            ? BaseEditor & ReactEditor
            : BaseEditor & ReactEditor & AdditionalCustomTypes['Editor'];
        Element: unknown extends AdditionalCustomTypes['Element']
            ? BlockNode | InlineNode
            : BlockNode | InlineNode | AdditionalCustomTypes['Element'];
        Text: unknown extends AdditionalCustomTypes['Text']
            ? TextNode
            : TextNode | AdditionalCustomTypes['Text'];
    }
}
