export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

import { BlockNode, InlineNode, ListItemNode, ListItemTextNode, TextNode } from './nodes';

export declare interface AdditionalCustomTypes {
    [key: string]: unknown;
}

declare module 'slate' {
    type DefaultEditor = BaseEditor & ReactEditor & HistoryEditor;

    type DefaultNode = BlockNode | InlineNode | ListItemNode | ListItemTextNode;

    interface CustomTypes {
        Editor: unknown extends AdditionalCustomTypes['Editor']
            ? DefaultEditor
            : DefaultEditor & AdditionalCustomTypes['Editor'];
        Element: unknown extends AdditionalCustomTypes['Element']
            ? DefaultNode
            : DefaultNode | AdditionalCustomTypes['Element'];
        Text: unknown extends AdditionalCustomTypes['Text']
            ? TextNode
            : TextNode | AdditionalCustomTypes['Text'];
    }
}
