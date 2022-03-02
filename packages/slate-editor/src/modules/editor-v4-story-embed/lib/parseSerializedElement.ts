import type { StoryEmbedNode } from '@prezly/slate-types';
import { validateStoryEmbedNode } from '@prezly/slate-types';

import { createStoryEmbed } from './createStoryEmbed';

export function parseSerializedElement(serialized: string): StoryEmbedNode | undefined {
    const parsed = JSON.parse(serialized);

    if (validateStoryEmbedNode(parsed)) {
        return createStoryEmbed(parsed);
    }

    return undefined;
}
