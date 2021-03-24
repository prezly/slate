import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { isEmbedElement } from '../lib';
import { EmbedElementType } from '../types';

const removeEmbed = (editor: Editor): EmbedElementType | null =>
    EditorCommands.removeNode<EmbedElementType>(editor, {
        match: isEmbedElement,
    });

export default removeEmbed;
