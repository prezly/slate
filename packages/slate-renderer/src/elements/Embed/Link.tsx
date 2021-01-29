import { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

import './Link.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: never;
    node: EmbedNode;
}
const Link: FunctionComponent<Props> = ({ className, node, ...props }) => {
    const { oembed, url } = node;

    return (
        <a
            className={classNames('prezly-slate-embed-link', className)}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            {...props}
        >
            {oembed.title && <span className="prezly-slate-embed-link__title">{oembed.title}</span>}

            <span className="prezly-slate-embed-link__url">{url}</span>
        </a>
    );
};

export default Link;
