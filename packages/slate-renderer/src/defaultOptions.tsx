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
import { Options } from './types';
import './styles.scss';

const defaultOptions: Required<Options> = {
    text: defaultRenderText,
    [ATTACHMENT_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [BULLETED_LIST_NODE_TYPE]: ({ children }) => <ul>{children}</ul>,
    [CONTACT_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [COVERAGE_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [DIVIDER_NODE_TYPE]: () => <hr />,
    [DOCUMENT_NODE_TYPE]: ({ children }) => <div>{children}</div>,
    [EMBED_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [GALLERY_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [HEADING_1_NODE_TYPE]: ({ children }) => <h1 className="heading-1">{children}</h1>,
    [HEADING_2_NODE_TYPE]: ({ children }) => <h2>{children}</h2>,
    [IMAGE_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [LINK_NODE_TYPE]: ({ children, href }) => (
        <a href={href} rel="noopener noreferrer" target="_blank">
            {children}
        </a>
    ),
    [LIST_ITEM_NODE_TYPE]: ({ children }) => <li>{children}</li>,
    [LIST_ITEM_TEXT_NODE_TYPE]: ({ children }) => <div>{children}</div>,
    [MENTION_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [NUMBERED_LIST_NODE_TYPE]: ({ children }) => <ol>{children}</ol>,
    [PARAGRAPH_NODE_TYPE]: ({ children }) => <p>{children}</p>,
    [PLACEHOLDER_NODE_TYPE]: ({ children }) => <div>{children}</div>, // TODO
    [QUOTE_NODE_TYPE]: ({ children }) => <blockquote>{children}</blockquote>,
};

export default defaultOptions;
