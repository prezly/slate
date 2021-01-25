import { ElementNode, isElementNode, isTextNode, TextNode } from '@prezly/slate-types';
import React, { Fragment, FunctionComponent } from 'react';

import defaultOptions from './defaultOptions';
import { Options, Render } from './types';

type Node = ElementNode | TextNode;

interface Props {
    nodes: Node | Node[];
    options?: Options;
}

const Render: FunctionComponent<Props> = ({ nodes, options: userOptions = {} }) => {
    const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
    const options = { ...defaultOptions, ...userOptions };

    return (
        <>
            {nodesArray.map((node, index) => {
                if (isTextNode(node)) {
                    const RenderText = options.text;
                    return <RenderText key={index} {...node} />;
                }

                if (isElementNode(node)) {
                    const { children, type } = node;
                    const RenderNode = options[type as keyof Options];

                    if (RenderNode) {
                        return (
                            // @ts-ignore
                            <RenderNode key={index} node={node}>
                                {/* @ts-ignore */}
                                <Render nodes={children} />
                            </RenderNode>
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

export default Render;
