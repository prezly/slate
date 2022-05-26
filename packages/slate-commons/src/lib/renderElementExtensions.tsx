import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import type { Extension, RenderElement } from '../types';

export function renderElementExtensions(
    extensions: Extension[],
    renderElementList: RenderElement[],
    editor: Editor
) {
    return function (elementProps: RenderElementProps) {
        let element;

        renderElementList.some((renderElement) => {
            element = renderElement(elementProps);
            return !!element;
        });

        if (element) {
            return element;
        }

        extensions.some(({ renderElement }) => {
            element = renderElement && renderElement(elementProps, editor);
            return !!element;
        });

        if (element) {
            return element;
        }

        return <div {...elementProps.attributes}>{elementProps.children}</div>;
    };
}
