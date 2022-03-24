import type { StoryEmbedNode } from '@prezly/slate-types';
import { isStoryEmbedNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateStoryEmbed(
    editor: Editor,
    properties: Partial<Pick<StoryEmbedNode, 'appearance' | 'position'>>,
): void {
    Transforms.setNodes<StoryEmbedNode>(editor, properties, { match: isStoryEmbedNode });
}
