import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import { isEnum, isObject, isUuid, isBoolean } from './validation';

export const STORY_BOOKMARK_NODE_TYPE = 'story-bookmark';

export enum StoryBookmarkLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface StoryBookmarkNode extends ElementNode {
    type: typeof STORY_BOOKMARK_NODE_TYPE;
    uuid: string;
    story: {
        uuid: string;
    };
    show_thumbnail: boolean;
    new_tab: boolean;
    layout: StoryBookmarkLayout;
}

export function isStoryBookmarkNode(value: any): value is StoryBookmarkNode {
    return isElementNode<ElementNode>(value, STORY_BOOKMARK_NODE_TYPE);
}

export function validateStoryBookmarkNode(
    node: Partial<StoryBookmarkNode> | undefined,
): node is StoryBookmarkNode {
    return (
        isObject(node) &&
        node.type === STORY_BOOKMARK_NODE_TYPE &&
        isObject(node.story) &&
        isUuid(node.story.uuid) &&
        isUuid(node.uuid) &&
        isBoolean(node.show_thumbnail) &&
        isBoolean(node.new_tab) &&
        isEnum(node.layout, StoryBookmarkLayout)
    );
}
