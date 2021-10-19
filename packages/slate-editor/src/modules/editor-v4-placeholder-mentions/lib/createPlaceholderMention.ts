import { PLACEHOLDER_NODE_TYPE, PlaceholderKey, PlaceholderNode } from '@prezly/slate-types';

const createPlaceholderMention = (key: PlaceholderKey): PlaceholderNode => ({
    children: [{ text: '' }],
    key,
    type: PLACEHOLDER_NODE_TYPE,
});

export default createPlaceholderMention;
