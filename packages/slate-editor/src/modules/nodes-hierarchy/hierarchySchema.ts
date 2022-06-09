import {
    ATTACHMENT_NODE_TYPE,
    BOOKMARK_NODE_TYPE,
    CONTACT_NODE_TYPE,
    COVERAGE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    EMBED_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    HTML_NODE_TYPE,
    IMAGE_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
    STORY_BOOKMARK_NODE_TYPE,
    STORY_EMBED_NODE_TYPE,
    VIDEO_NODE_TYPE,
} from '@prezly/slate-types';

import { LOADER_NODE_TYPE } from '#extensions/loader';

import { rootNodeOnly } from './normilizers';
import type { NodesHierarchySchema } from './types';

import { IMAGE_CANDIDATE_NODE_TYPE } from '#extensions/image/constants';

/*eslint sort-keys-fix/sort-keys-fix: "error"*/
export const hierarchySchema: NodesHierarchySchema = {
    [ATTACHMENT_NODE_TYPE]: [rootNodeOnly],
    [BOOKMARK_NODE_TYPE]: [rootNodeOnly],
    [CONTACT_NODE_TYPE]: [rootNodeOnly],
    [COVERAGE_NODE_TYPE]: [rootNodeOnly],
    [DIVIDER_NODE_TYPE]: [rootNodeOnly],
    [EMBED_NODE_TYPE]: [rootNodeOnly],
    [GALLERY_NODE_TYPE]: [rootNodeOnly],
    [HEADING_1_NODE_TYPE]: [rootNodeOnly],
    [HEADING_2_NODE_TYPE]: [rootNodeOnly],
    [HTML_NODE_TYPE]: [rootNodeOnly],
    [IMAGE_CANDIDATE_NODE_TYPE]: [rootNodeOnly],
    [IMAGE_NODE_TYPE]: [rootNodeOnly],
    [LOADER_NODE_TYPE]: [rootNodeOnly],
    [PARAGRAPH_NODE_TYPE]: [rootNodeOnly],
    [QUOTE_NODE_TYPE]: [rootNodeOnly],
    [STORY_BOOKMARK_NODE_TYPE]: [rootNodeOnly],
    [STORY_EMBED_NODE_TYPE]: [rootNodeOnly],
    [VIDEO_NODE_TYPE]: [rootNodeOnly],
};
