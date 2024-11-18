import type { StoryEmbedNode } from '@prezly/slate-types';
import { isStoryEmbedNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function updateStoryEmbed(
    editor: SlateEditor,
    properties: Partial<Pick<StoryEmbedNode, 'appearance' | 'position' | 'header_footer'>>,
): void {
    editor.setNodes<StoryEmbedNode>(properties, { match: isStoryEmbedNode });
}
