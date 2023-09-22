import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { InfoText } from '#components';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { ButtonBlockNode } from './ButtonBlockNode';
import { ButtonBlockElement } from './components';
import {
    fixDuplicateButtonBlockUuid,
    normalizeRedundantButtonBlockAttributes,
    parseSerializedButtonBlockElement,
} from './lib';

export const EXTENSION_ID = 'ButtonBlockExtension';

export interface ButtonBlockExtensionConfiguration {
    withNewTabOption?: boolean;
    info?: InfoText.StructuredContent;
}

export function ButtonBlockExtension({
    withNewTabOption = true,
    info = [],
}: ButtonBlockExtensionConfiguration) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [ButtonBlockNode.Type]: createDeserializeElement(parseSerializedButtonBlockElement),
            }),
        },
        normalizeNode: [fixDuplicateButtonBlockUuid, normalizeRedundantButtonBlockAttributes],
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (ButtonBlockNode.isButtonBlockNode(element)) {
                return (
                    <ButtonBlockElement
                        attributes={attributes}
                        element={element}
                        info={info}
                        withNewTabOption={withNewTabOption}
                    >
                        {children}
                    </ButtonBlockElement>
                );
            }

            return undefined;
        },
        isRichBlock: ButtonBlockNode.isButtonBlockNode,
        isVoid: ButtonBlockNode.isButtonBlockNode,
    });
}
