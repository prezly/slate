import { MentionElementType } from '../../modules/editor-v4-mentions';

import { PLACEHOLDER_MENTION_TYPE } from './constants';

export type PlaceholderMentionType = typeof PLACEHOLDER_MENTION_TYPE;

export interface Placeholder {
    key: string;
    text: string;
}

export interface PlaceholderMentionElementType extends MentionElementType<PlaceholderMentionType> {
    key: Placeholder['key'];
}

export interface PlaceholderMentionsExtensionParameters {
    placeholders: Placeholder[];
}
