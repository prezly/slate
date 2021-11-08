import { EditorCommands } from '@prezly/slate-commons';
import { EmbedNode, isEmbedNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const removeEmbed = (editor: Editor): EmbedNode | null =>
    EditorCommands.removeNode<EmbedNode>(editor, {
        match: isEmbedNode,
    });

export default removeEmbed;
