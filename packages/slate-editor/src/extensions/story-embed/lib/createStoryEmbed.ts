import type { StoryEmbedNode } from '@prezly/slate-types';
import {
    STORY_EMBED_NODE_TYPE,
    StoryEmbedAppearance,
    StoryEmbedHeaderFooter,
    StoryEmbedPosition,
} from '@prezly/slate-types';

type RequiredProps = Pick<StoryEmbedNode, 'story'>;
type OptionalProps = Omit<StoryEmbedNode, 'type' | 'story'>;

function withoutExtraAttributes<T extends StoryEmbedNode>(node: T): StoryEmbedNode {
    const { type, story, appearance, header_footer, position, children, ...extra } = node;
    if (Object.keys(extra).length === 0) {
        return node;
    }
    return { type, story, appearance, header_footer, position, children };
}

export function createStoryEmbed(props: RequiredProps & Partial<OptionalProps>): StoryEmbedNode {
    return withoutExtraAttributes({
        appearance: StoryEmbedAppearance.FULL,
        position: StoryEmbedPosition.CENTER,
        header_footer: StoryEmbedHeaderFooter.NONE,
        ...props,
        children: [{ text: '' }],
        type: STORY_EMBED_NODE_TYPE, // disallowed to override type
    });
}
