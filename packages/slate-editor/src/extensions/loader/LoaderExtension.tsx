import type { Extension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { LoaderElement } from './components';
import { isLoaderElement, normalizeRedundantLoaderAttributes } from './lib';
import type { LoaderParameters } from './types';
import { withLoaders } from './withLoaders';

export const EXTENSION_ID = 'LoaderExtension';

export const LoaderExtension = ({
    onOperationEnd,
    onOperationStart,
}: LoaderParameters): Extension => ({
    id: EXTENSION_ID,
    isRichBlock: isLoaderElement,
    isVoid: isLoaderElement,
    normalizeNode: normalizeRedundantLoaderAttributes,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isLoaderElement(element)) {
            return (
                <LoaderElement
                    attributes={attributes}
                    element={element}
                    onMount={onOperationStart}
                    onUnmount={onOperationEnd}
                >
                    {children}
                </LoaderElement>
            );
        }

        return undefined;
    },
    withOverrides: withLoaders,
});
