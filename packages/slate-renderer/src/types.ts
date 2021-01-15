import { BlockNode, ElementNode, InlineNode, TextNode } from '@prezly/slate-types';
import { ReactNode } from 'react';

export type Node = BlockNode | InlineNode;

export interface Options {
    renderElement?: (element: ElementNode) => ReactNode | undefined;
    renderText?: (text: TextNode) => ReactNode | undefined;
}
