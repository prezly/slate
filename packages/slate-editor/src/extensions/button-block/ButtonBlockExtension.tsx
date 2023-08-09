import { createDeserializeElement, type Extension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { ButtonBlockNode } from './ButtonBlockNode';
import { ButtonBlockElement } from './components';
import { normalizeRedundantButtonBlockAttributes, parseSerializedButtonBlockElement } from './lib';

export const EXTENSION_ID = 'ButtonBlockExtension';

export interface ButtonBlockExtensionConfiguration {
    withNewTabOption?: boolean;
}

export function ButtonBlockExtension({
    withNewTabOption = true,
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
                    <ButtonBlockElement
                        attributes={attributes}
                        element={element}
                        withNewTabOption={withNewTabOption}
                    >
                        {children}
                    </ButtonBlockElement>
                );
            }

            return undefined;
        },
        isVoid: ButtonBlockNode.isButtonBlockNode,
    };
}
