import { isElementNode, isTextNode } from '@prezly/slate-types';
import { ReactNode } from 'react';

import defaultRenderElement from './defaultRenderElement';
import defaultRenderText from './defaultRenderText';
import { Node, Options } from './types';

const render = (nodes: Node[], options: Options = {}): ReactNode => {
    const renderElement = options.renderElement || defaultRenderElement;
    const renderText = options.renderText || defaultRenderText;

    return (
        <>
            {nodes.map((node) => {
                if (isTextNode(node)) {
                    return renderText(node);
                }

                if (isElementNode(node)) {
                    return renderElement(node);
                }

                throw new Error(`Unknown node: ${JSON.stringify(node)}`);
            })}
        </>
    );
};

export default render;
