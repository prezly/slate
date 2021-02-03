import * as React from 'react';
import { RenderElementProps } from 'slate-react';

import { Extension, RenderElement } from '../types';

const renderElementExtensions = (extensions: Extension[], renderElementList: RenderElement[]) => (
    elementProps: RenderElementProps,
) => {
    let element;

    renderElementList.some((renderElement) => {
        element = renderElement(elementProps);
        return !!element;
    });

    if (element) {
        return element;
    }

    extensions.some(({ renderElement }) => {
        element = renderElement && renderElement(elementProps);
        return !!element;
    });

    if (element) {
        return element;
    }

    return <div {...elementProps.attributes}>{elementProps.children}</div>;
};

export default renderElementExtensions;
