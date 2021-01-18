import { ElementNode, isElementNode, isTextNode, TextNode } from '@prezly/slate-types';
import React, { ReactElement } from 'react';

import defaultOptions from './defaultOptions';
import { appendKeyToValidElement } from './lib';
import { Options } from './types';

const render = (nodes: (ElementNode | TextNode)[], userOptions: Options = {}): ReactElement => {
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

                return (
                    <div key={index}>
                        <h3>Unknown node "{node.type}"</h3>
                        <pre>{`${JSON.stringify(node, null, 4)}`}</pre>
                    </div>
                );
            })}
        </>
    );
};

export default render;
