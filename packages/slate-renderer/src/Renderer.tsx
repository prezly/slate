import { isElementNode } from '@prezly/slate-types';
import React, { Fragment, FunctionComponent } from 'react';
import { Descendant, Text } from 'slate';

import defaultOptions from './defaultOptions';
import { stringifyNode } from './lib';
import { Options } from './types';

interface Props {
    nodes: Descendant | Descendant[];
    options?: Options;
}

const Renderer: FunctionComponent<Props> = ({ nodes, options: userOptions = {} }) => {
    const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
    const options = { ...defaultOptions, ...userOptions };

    return (
        <>
            {nodesArray.map((node, index) => {
                if (Text.isText(node)) {
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
                                <Renderer nodes={children} options={options} />
                            </NodeRenderer>
                        );
                    }
                }

                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        `[@prezly/slate-renderer] Unknown node type encountered: ${stringifyNode(node)}`,
                    );
                }

                return <Fragment key={index} />;
            })}
        </>
    );
};

export default Renderer;
