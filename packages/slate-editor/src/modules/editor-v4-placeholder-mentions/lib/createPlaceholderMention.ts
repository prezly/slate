import { PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import { PlaceholderMentionElementType } from '../types';

const createPlaceholderMention = (
    key: PlaceholderMentionElementType['key'],
): PlaceholderMentionElementType => ({
    children: [{ text: '' }],
    key,
    type: PLACEHOLDER_NODE_TYPE,
});

export default createPlaceholderMention;
