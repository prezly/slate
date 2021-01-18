import { ElementNode, isElementNode, isTextNode, TextNode } from '@prezly/slate-types';
import React, { ReactNode } from 'react';

import defaultOptions from './defaultOptions';
import { appendKeyToValidElement } from './lib';
import { Options } from './types';

const render = (nodes: (ElementNode | TextNode)[], userOptions: Options = {}): ReactNode => {
    const options = { ...defaultOptions, ...userOptions };

    return (
        <>
            {nodes.map((node, index) => {
                if (isTextNode(node)) {
                    const renderText = options.text;
                    return appendKeyToValidElement(renderText(node), index);
                }

                if (isElementNode(node)) {
                    const { children, type } = node;
                    // @ts-ignore
                    const renderNode = options[type];

                    if (renderNode) {
                        return appendKeyToValidElement(
                            renderNode({
                                ...node,
                                children: render(children),
                            }),
                            index,
                        );
                    }
                }

                throw new Error(`Unknown node "${node.type}": "${JSON.stringify(node)}"`);
            })}
        </>
    );
};

export default render;
