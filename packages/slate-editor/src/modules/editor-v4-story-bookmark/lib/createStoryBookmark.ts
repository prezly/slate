import type { StoryBookmarkNode } from '@prezly/slate-types';
import { STORY_BOOKMARK_NODE_TYPE, StoryBookmarkLayout } from '@prezly/slate-types';

type RequiredProps = Pick<StoryBookmarkNode, 'story' | 'uuid'>;
type OptionalProps = Omit<StoryBookmarkNode, keyof RequiredProps>;

function withoutExtraAttributes<T extends StoryBookmarkNode>(node: T): StoryBookmarkNode {
    const { type, story, children, layout, new_tab, show_thumbnail, uuid, ...extra } = node;
    if (Object.keys(extra).length === 0) {
        return node;
    }

    return { type, story, children, layout, new_tab, show_thumbnail, uuid };
}

export function createStoryBookmark(
    props: RequiredProps & Partial<OptionalProps>,
): StoryBookmarkNode {
    return withoutExtraAttributes({
        layout: StoryBookmarkLayout.HORIZONTAL,
        new_tab: true,
        show_thumbnail: true,
        children: [{ text: '' }],
        ...props,
        type: STORY_BOOKMARK_NODE_TYPE, // disallowed to override type
    });
}
