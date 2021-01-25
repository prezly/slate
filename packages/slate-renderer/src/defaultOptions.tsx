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

import DefaultRenderText from './DefaultRenderText';
import {
    Attachment,
    BulletedList,
    Contact,
    Divider,
    Document,
    Heading1,
    Heading2,
    Image,
    Link,
    ListItem,
    ListItemText,
    NumberedList,
    Paragraph,
    Quote,
} from './elements';
import { Options } from './types';
import './styles.scss';

const defaultOptions: Required<Options> = {
    [ATTACHMENT_NODE_TYPE]: Attachment,
    [BULLETED_LIST_NODE_TYPE]: BulletedList,
    [CONTACT_NODE_TYPE]: Contact,
    [COVERAGE_NODE_TYPE]: () => <div>TODO</div>, // TODO
    [DIVIDER_NODE_TYPE]: Divider,
    [DOCUMENT_NODE_TYPE]: Document,
    [EMBED_NODE_TYPE]: () => <div>TODO</div>, // TODO
    [GALLERY_NODE_TYPE]: ({ node }) => <div>TODO</div>, // TODO
    [HEADING_1_NODE_TYPE]: Heading1,
    [HEADING_2_NODE_TYPE]: Heading2,
    [IMAGE_NODE_TYPE]: Image,
    [LINK_NODE_TYPE]: Link,
    [LIST_ITEM_NODE_TYPE]: ListItem,
    [LIST_ITEM_TEXT_NODE_TYPE]: ListItemText,
    [MENTION_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [NUMBERED_LIST_NODE_TYPE]: NumberedList,
    [PARAGRAPH_NODE_TYPE]: Paragraph,
    [PLACEHOLDER_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO,
    [QUOTE_NODE_TYPE]: Quote,
    text: DefaultRenderText,
};

export default defaultOptions;
