import { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';

import './IframelyEmbed.scss';
import { injectOembedMarkup } from './lib';

interface Props extends HTMLAttributes<HTMLElement> {
    children?: never;
    node: EmbedNode;
}
const IframelyEmbed: FunctionComponent<Props> = ({ className, node, ...props }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { oembed } = node;

    useEffect(() => {
        if (contentRef.current && typeof window !== 'undefined') {
            injectOembedMarkup({
                oembed,
                onError: () => setIsValid(false),
                target: contentRef.current,
            });
        }
    }, [oembed]);

    return (
        <div
            className={classNames('prezly-slate-iframely-embed', className, {
                'prezly-slate-iframely-embed--error': !isValid,
            })}
            ref={contentRef}
            {...props}
        />
    );
};

export default IframelyEmbed;
