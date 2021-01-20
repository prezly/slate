import { ElementNode, isElementNode, isTextNode, TextNode } from '@prezly/slate-types';
import React, { Fragment, ReactElement } from 'react';

import defaultOptions from './defaultOptions';
import { Options } from './types';

type Node = ElementNode | TextNode;

const render = (nodes: Node | Node[], userOptions: Options = {}): ReactElement => {
    const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
    const options = { ...defaultOptions, ...userOptions };

    return (
        <>
            {nodesArray.map((node, index) => {
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
                        // @ts-ignore
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
