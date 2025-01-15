import { EditorCommands } from '@prezly/slate-commons';
import type { StoryEmbedNode } from '@prezly/slate-types';
import { isStoryEmbedNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removeStoryEmbed(editor: SlateEditor): StoryEmbedNode | null {
    return EditorCommands.removeNode<StoryEmbedNode>(editor, {
        match: isStoryEmbedNode,
    });
}
