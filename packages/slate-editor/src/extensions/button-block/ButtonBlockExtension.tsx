import { createDeserializeElement, type Extension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

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
    info?: Array<string | { text: string; href: string } | { text: string; onClick: () => void }>;
}

export function ButtonBlockExtension({
    withNewTabOption = true,
    info = [],
}: ButtonBlockExtensionConfiguration): Extension {
    return {
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
    };
}
