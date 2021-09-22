export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

import { BlockNode } from './nodes';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: BlockNode;
    }
}
