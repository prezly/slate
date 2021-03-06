import {
    ATTACHMENT_NODE_TYPE,
    BULLETED_LIST_NODE_TYPE,
    CONTACT_NODE_TYPE,
    COVERAGE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    DOCUMENT_NODE_TYPE,
    EMBED_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    IMAGE_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    MENTION_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    PLACEHOLDER_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import React from 'react';

import DefaultTextRenderer from './DefaultTextRenderer';
import {
    Attachment,
    BulletedList,
    Contact,
    Divider,
    Document,
    Embed,
    Gallery,
    Heading1,
    Heading2,
    Image,
    Link,
    ListItem,
    ListItemText,
    Mention,
    NumberedList,
    Paragraph,
    Placeholder,
    Quote,
} from './elements';
import { Options } from './types';

const defaultOptions: Required<Options> = {
    [ATTACHMENT_NODE_TYPE]: Attachment,
    [BULLETED_LIST_NODE_TYPE]: BulletedList,
    [CONTACT_NODE_TYPE]: Contact,
    [COVERAGE_NODE_TYPE]: () => <span>TODO</span>, // TODO
    [DIVIDER_NODE_TYPE]: Divider,
    [DOCUMENT_NODE_TYPE]: Document,
    [EMBED_NODE_TYPE]: Embed,
    [GALLERY_NODE_TYPE]: Gallery,
    [HEADING_1_NODE_TYPE]: Heading1,
    [HEADING_2_NODE_TYPE]: Heading2,
    [IMAGE_NODE_TYPE]: Image,
    [LINK_NODE_TYPE]: Link,
    [LIST_ITEM_NODE_TYPE]: ListItem,
    [LIST_ITEM_TEXT_NODE_TYPE]: ListItemText,
    [MENTION_NODE_TYPE]: Mention,
    [NUMBERED_LIST_NODE_TYPE]: NumberedList,
    [PARAGRAPH_NODE_TYPE]: Paragraph,
    [PLACEHOLDER_NODE_TYPE]: Placeholder,
    [QUOTE_NODE_TYPE]: Quote,
    text: DefaultTextRenderer,
};

export default defaultOptions;
