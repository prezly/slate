export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

import { TextNode } from './nodes';

export declare interface AdditionalCustomTypes {
    [key: string]: unknown;
}

interface ElementNode {
    type: string;
    children: Descendant[];
}

declare module 'slate' {
    type DefaultEditor = BaseEditor & ReactEditor;

    interface CustomTypes {
        Editor: unknown extends AdditionalCustomTypes['Editor']
            ? DefaultEditor
            : DefaultEditor & AdditionalCustomTypes['Editor'];
        Element: unknown extends AdditionalCustomTypes['Element']
            ? ElementNode
            : ElementNode & AdditionalCustomTypes['Element'];
        Text: unknown extends AdditionalCustomTypes['Text']
            ? TextNode
            : TextNode & AdditionalCustomTypes['Text'];
    }
}
