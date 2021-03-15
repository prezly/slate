import { PLACEHOLDER_MENTION_TYPE } from '../constants';
import { PlaceholderMentionElementType } from '../types';

const createPlaceholderMention = (
    key: PlaceholderMentionElementType['key'],
): PlaceholderMentionElementType => ({
    children: [{ text: '' }],
    key,
    type: PLACEHOLDER_MENTION_TYPE,
});

export default createPlaceholderMention;
