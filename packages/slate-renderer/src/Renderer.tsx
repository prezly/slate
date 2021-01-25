import { ElementNode, isElementNode, isTextNode, TextNode } from '@prezly/slate-types';
import React, { Fragment, FunctionComponent } from 'react';

import defaultOptions from './defaultOptions';
import { Options } from './types';

type Node = ElementNode | TextNode;

interface Props {
    nodes: Node | Node[];
    options?: Options;
}

const Renderer: FunctionComponent<Props> = ({ nodes, options: userOptions = {} }) => {
    const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
    const options = { ...defaultOptions, ...userOptions };

    return (
        <>
            {nodesArray.map((node, index) => {
                if (isTextNode(node)) {
                    const TextRenderer = options.text;
                    return <TextRenderer key={index} {...node} />;
                }

                if (isElementNode(node)) {
                    const { children, type } = node;
                    const NodeRenderer = options[type as keyof Options];

                    if (NodeRenderer) {
                        return (
                            // @ts-ignore
                            <NodeRenderer key={index} node={node}>
                                {/* @ts-ignore */}
                                <Render nodes={children} />
                            </NodeRenderer>
                        );
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

export default Renderer;
