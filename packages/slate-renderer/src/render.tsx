import { ElementNode, isElementNode, isTextNode, TextNode } from '@prezly/slate-types';
import React, { Fragment, ReactElement } from 'react';

import defaultOptions from './defaultOptions';
import { Options } from './types';

const render = (nodes: (ElementNode | TextNode)[], userOptions: Options = {}): ReactElement => {
    const options = { ...defaultOptions, ...userOptions };

    return (
        <>
            {nodes.map((node, index) => {
                if (isTextNode(node)) {
                    const renderText = options.text;
                    return <Fragment key={index}>{renderText(node)}</Fragment>;
                }

                if (isElementNode(node)) {
                    const { children, type } = node;
                    // @ts-ignore
                    const renderNode = options[type];

                    if (renderNode) {
                        const nodeWithChildren = { ...node, children: render(children) };
                        return <Fragment key={index}>{renderNode(nodeWithChildren)}</Fragment>;
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
