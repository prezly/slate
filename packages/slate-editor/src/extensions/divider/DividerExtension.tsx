import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { DIVIDER_NODE_TYPE, isDividerNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { DividerElement } from './components';
import { DIVIDER_EXTENSION_ID } from './constants';
import { createDivider, normalizeRedundantDividerAttributes, parseSerializedElement } from './lib';

export const DividerExtension = (): Extension => ({
    deserialize: {
        element: {
            [DIVIDER_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            HR: (element) => {
                if (element.getAttribute('data-is-slate')) {
                    return undefined;
                }

                return createDivider();
            },
        },
    },
    id: DIVIDER_EXTENSION_ID,
    isVoid: isDividerNode,
    normalizers: [normalizeRedundantDividerAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isDividerNode(element)) {
            return (
                <DividerElement attributes={attributes} element={element}>
                    {children}
                </DividerElement>
            );
        }

        return undefined;
    },
    rootTypes: [DIVIDER_NODE_TYPE],
});
