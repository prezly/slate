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

import defaultRenderText from './defaultRenderText';
import {
    BulletedList,
    Heading1,
    Heading2,
    ListItem,
    ListItemText,
    NumberedList,
    Paragraph,
} from './elements';
import { Options } from './types';
import './styles.scss';

const defaultOptions: Required<Options> = {
    text: defaultRenderText,
    [ATTACHMENT_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [BULLETED_LIST_NODE_TYPE]: ({ children }) => <BulletedList>{children}</BulletedList>,
    [CONTACT_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [COVERAGE_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [DIVIDER_NODE_TYPE]: () => <hr />,
    [DOCUMENT_NODE_TYPE]: ({ children }) => <div>{children}</div>,
    [EMBED_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [GALLERY_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [HEADING_1_NODE_TYPE]: ({ children }) => <Heading1>{children}</Heading1>,
    [HEADING_2_NODE_TYPE]: ({ children }) => <Heading2>{children}</Heading2>,
    [IMAGE_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [LINK_NODE_TYPE]: ({ children, href }) => (
        <a href={href} rel="noopener noreferrer" target="_blank">
            {children}
        </a>
    ),
    [LIST_ITEM_NODE_TYPE]: ({ children }) => <ListItem>{children}</ListItem>,
    [LIST_ITEM_TEXT_NODE_TYPE]: ({ children }) => <ListItemText>{children}</ListItemText>,
    [MENTION_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [NUMBERED_LIST_NODE_TYPE]: ({ children }) => <NumberedList>{children}</NumberedList>,
    [PARAGRAPH_NODE_TYPE]: ({ children }) => <Paragraph>{children}</Paragraph>,
    [PLACEHOLDER_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [QUOTE_NODE_TYPE]: ({ children }) => <blockquote>{children}</blockquote>,
};

export default defaultOptions;
