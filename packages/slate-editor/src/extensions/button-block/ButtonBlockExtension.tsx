import { createDeserializeElement, type Extension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { ButtonBlockNode } from './ButtonBlockNode';
import { normalizeRedundantButtonBlockAttributes, parseSerializedButtonBlockElement } from './lib';

export const EXTENSION_ID = 'ButtonBlockExtension';

export interface ButtonBlockExtensionConfiguration {
    withNewTabOption?: boolean;
}

export function ButtonBlockExtension({
    withNewTabOption = false,
}: ButtonBlockExtensionConfiguration): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [ButtonBlockNode.Type]: createDeserializeElement(parseSerializedButtonBlockElement),
            }),
        },
        normalizeNode: normalizeRedundantButtonBlockAttributes,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (ButtonBlockNode.isButtonBlockNode(element)) {
                return (
                    <pre {...attributes}>
                        {JSON.stringify({ element, withNewTabOption })}
                        {children}
                    </pre>
                );
            }

            return undefined;
        },
        isVoid: ButtonBlockNode.isButtonBlockNode,
    };
}
