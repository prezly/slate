import { ParagraphType } from '@prezly/slate-commons';
import { Element } from 'slate';

export interface ParagraphElementType extends Element {
    type: ParagraphType;
}
