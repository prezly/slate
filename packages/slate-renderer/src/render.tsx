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
                    const renderNode = options[type];

                    if (renderNode) {
                        const nodeWithChildren = { ...node, children: render(children) };
                        // @ts-ignore
                        return <Fragment key={index}>{renderNode(nodeWithChildren)}</Fragment>;
                    }
                }

                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        `[@prezly/slate-renderer] Unknown node type encountered: ${node.type}`,
                    );
                }

                return <Fragment key={index} />;
            })}
        </>
    );
};

export default render;
