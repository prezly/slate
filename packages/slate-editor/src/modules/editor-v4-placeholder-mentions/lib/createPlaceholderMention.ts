import { PlaceholderKey, PlaceholderNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';

const createPlaceholderMention = (key: PlaceholderKey): PlaceholderNode => ({
    children: [{ text: '' }],
    key,
    type: PLACEHOLDER_NODE_TYPE,
});

export default createPlaceholderMention;
