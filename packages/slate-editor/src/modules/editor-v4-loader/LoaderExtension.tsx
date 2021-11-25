import type { Extension } from '@prezly/slate-commons';
import * as React from 'react';
import type { RenderElementProps } from 'slate-react';

import { LoaderElement } from './components';
import { LOADER_EXTENSION_ID, LOADER_TYPE } from './constants';
import { isLoaderElement, normalizeRedundantLoaderAttributes } from './lib';
import type { LoaderParameters } from './types';

const LoaderExtension = ({ onOperationEnd, onOperationStart }: LoaderParameters): Extension => ({
    id: LOADER_EXTENSION_ID,
    normalizers: [normalizeRedundantLoaderAttributes],
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
    rootTypes: [LOADER_TYPE],
    voidTypes: [LOADER_TYPE],
});

export default LoaderExtension;
