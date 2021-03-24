import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { PressContactElementType } from '../types';

import isPressContactElement from './isPressContactElement';

const removePressContact = (editor: Editor): PressContactElementType | null =>
    EditorCommands.removeNode<PressContactElementType>(editor, {
        match: isPressContactElement,
    });

export default removePressContact;
