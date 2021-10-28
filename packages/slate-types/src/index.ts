export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import { BaseEditor, BaseElement } from 'slate';
import { ReactEditor } from 'slate-react';

import { TextNode } from './nodes';

export interface ElementNode extends BaseElement {
    type: string;
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}
