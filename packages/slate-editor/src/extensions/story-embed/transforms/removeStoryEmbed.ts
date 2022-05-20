import { EditorCommands } from '@prezly/slate-commons';
import type { StoryEmbedNode } from '@prezly/slate-types';
import { isStoryEmbedNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeStoryEmbed(editor: Editor): StoryEmbedNode | null {
    return EditorCommands.removeNode<StoryEmbedNode>(editor, {
        match: isStoryEmbedNode,
    });
}
