import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { BOOKMARK_NODE_TYPE, isBookmarkNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { WebBookmarkElement } from './components';
import { WEB_BOOKMARK_EXTENSION_ID } from './constants';
import { normalizeRedundantWebBookmarkAttributes, parseSerializedElement } from './lib';

interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
}

export const WebBookmarkExtension = ({
    withNewTabOption = true,
}: WebBookmarkExtensionParameters): Extension => ({
    id: WEB_BOOKMARK_EXTENSION_ID,
    deserialize: {
        element: {
            [BOOKMARK_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isBookmarkNode,
    isVoid: isBookmarkNode,
    normalizers: [normalizeRedundantWebBookmarkAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isBookmarkNode(element)) {
            return (
                <>
                    <WebBookmarkElement
                        attributes={attributes}
                        element={element}
                        withNewTabOption={withNewTabOption}
                    >
                        {children}
                    </WebBookmarkElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [BOOKMARK_NODE_TYPE],
});
