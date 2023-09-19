import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { DIVIDER_NODE_TYPE, isDividerNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { DividerElement } from './components';
import { createDivider, normalizeRedundantDividerAttributes, parseSerializedElement } from './lib';

export const EXTENSION_ID = 'DividerExtension';

export function DividerExtension() {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [DIVIDER_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
                HR: (element) => {
                    if (element.getAttribute('data-is-slate')) {
                        return undefined;
                    }

                    return createDivider();
                },
            }),
        },
        isVoid: isDividerNode,
        normalizeNode: normalizeRedundantDividerAttributes,
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
    });
}
