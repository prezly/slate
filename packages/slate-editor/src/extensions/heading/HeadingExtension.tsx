import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { HeadingNode, HeadingRole } from '@prezly/slate-types';
import {
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    isHeadingNode,
    isSubtitleHeadingNode,
    isTitleHeadingNode,
} from '@prezly/slate-types';
import React from 'react';
import type { Node } from 'slate';

import { onBackspaceResetFormattingAtDocumentStart, withResetFormattingOnBreak } from '#lib';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { HeadingElement } from './components';
import { normalizeRedundantAttributes, onTabSwitchBlock, parseHeadingElement } from './lib';

export const EXTENSION_ID = 'HeadingExtension';

export function HeadingExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [HEADING_1_NODE_TYPE]: createDeserializeElement(parseHeadingElement),
                [HEADING_2_NODE_TYPE]: createDeserializeElement(parseHeadingElement),
                H1: () => ({ type: HEADING_1_NODE_TYPE }),
                H2: () => ({ type: HEADING_2_NODE_TYPE }),
                H3: () => ({ type: HEADING_2_NODE_TYPE }),
                H4: () => ({ type: HEADING_2_NODE_TYPE }),
                H5: () => ({ type: HEADING_2_NODE_TYPE }),
                H6: () => ({ type: HEADING_2_NODE_TYPE }),
            }),
        },
        normalizeNode: [normalizeRedundantAttributes],
        onKeyDown(event, editor) {
            return (
                onBackspaceResetFormattingAtDocumentStart(editor, isHeadingNode, event) ||
                onTabSwitchBlock(editor, event, isTitleSubtitleNode)
            );
        },
        renderElement({ attributes, children, element }) {
            if (isHeadingNode(element)) {
                return (
                    <HeadingElement {...attributes} element={element}>
                        {children}
                    </HeadingElement>
                );
            }
            return undefined;
        },
        withOverrides: withResetFormattingOnBreak(isHeadingNode),
    };
}

function isTitleSubtitleNode(node: Node): node is HeadingNode & { role: HeadingRole } {
    return isTitleHeadingNode(node) || isSubtitleHeadingNode(node);
}
