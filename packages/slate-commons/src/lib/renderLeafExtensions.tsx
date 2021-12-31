import React from 'react';
import type { RenderLeafProps } from 'slate-react';

import type { Extension, RenderLeaf } from '../types';

function renderLeafExtensions(extensions: Extension[], renderLeafList: RenderLeaf[]) {
    return function (leafProps: RenderLeafProps) {
        renderLeafList.forEach((renderLeaf) => {
            // eslint-disable-next-line no-param-reassign
            leafProps.children = renderLeaf(leafProps);
        });

        extensions.forEach(({ renderLeaf }) => {
            if (!renderLeaf) {
                return;
            }

            // eslint-disable-next-line no-param-reassign
            leafProps.children = renderLeaf(leafProps);
        });

        return <span {...leafProps.attributes}>{leafProps.children}</span>;
    };
}

export default renderLeafExtensions;
