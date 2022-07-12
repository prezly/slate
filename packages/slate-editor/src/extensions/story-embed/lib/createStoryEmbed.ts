import type { StoryEmbedNode } from '@prezly/slate-types';
import {
    STORY_EMBED_NODE_TYPE,
    StoryEmbedAppearance,
    StoryEmbedPosition,
} from '@prezly/slate-types';

type RequiredProps = Pick<StoryEmbedNode, 'story'>;
type OptionalProps = Omit<StoryEmbedNode, 'type' | 'story'>;

function withoutExtraAttributes<T extends StoryEmbedNode>(node: T): StoryEmbedNode {
    const { type, story, appearance, position, children, ...extra } = node;
    if (Object.keys(extra).length === 0) {
        return node;
    }
    return { type, story, appearance, position, children };
}

export function createStoryEmbed(props: RequiredProps & Partial<OptionalProps>): StoryEmbedNode {
    return withoutExtraAttributes({
        appearance: StoryEmbedAppearance.FULL,
        position: StoryEmbedPosition.CENTER,
        ...props,
        children: [{ text: '' }],
        type: STORY_EMBED_NODE_TYPE, // disallowed to override type
    });
}
