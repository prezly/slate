import { Campaign } from '@prezly/sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import { isEnum, isObject, isUuid } from './validation';

export const STORY_EMBED_NODE_TYPE = 'story-embed';

export type StoryEmbedAppearance = Campaign.StoryAppearance;
export const StoryEmbedAppearance = Campaign.StoryAppearance;
export type StoryEmbedPosition = Campaign.StoryAlignment;
export const StoryEmbedPosition = Campaign.StoryAlignment;

export interface StoryEmbedNode extends ElementNode {
    type: typeof STORY_EMBED_NODE_TYPE;
    story: {
        uuid: string;
    };
    appearance: Campaign.StoryAppearance;
    position: Campaign.StoryAlignment;
}

export function isStoryEmbedNode(value: any): value is StoryEmbedNode {
    return isElementNode<ElementNode>(value, STORY_EMBED_NODE_TYPE);
}

export function validateStoryEmbedNode(
    node: Partial<StoryEmbedNode> | undefined,
): node is StoryEmbedNode {
    return (
        isObject(node) &&
        node.type === STORY_EMBED_NODE_TYPE &&
        isObject(node.story) &&
        isUuid(node.story.uuid) &&
        isEnum(node.appearance, Campaign.StoryAppearance) &&
        isEnum(node.position, Campaign.StoryAlignment)
    );
}
