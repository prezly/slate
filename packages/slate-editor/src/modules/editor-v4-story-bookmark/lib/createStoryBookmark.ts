import type { StoryBookmarkNode } from '@prezly/slate-types';
import { STORY_BOOKMARK_NODE_TYPE, StoryBookmarkLayout } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type RequiredProps = Pick<StoryBookmarkNode, 'story'>;
type OptionalProps = Omit<StoryBookmarkNode, 'type' | 'children'>;

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
        layout: StoryBookmarkLayout.VERTICAL,
        new_tab: true,
        show_thumbnail: true,
        uuid: uuidV4(),
        ...props,
        children: [{ text: '' }],
        type: STORY_BOOKMARK_NODE_TYPE, // disallowed to override type
    });
}
