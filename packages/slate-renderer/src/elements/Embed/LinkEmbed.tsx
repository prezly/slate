import { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

import './LinkEmbed.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: never;
    node: EmbedNode;
}
const LinkEmbed: FunctionComponent<Props> = ({ className, node, ...props }) => {
    const { oembed, url } = node;

    return (
        <a
            className={classNames('prezly-slate-link-embed', className)}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            {...props}
        >
            {oembed.title && <span className="prezly-slate-link-embed__title">{oembed.title}</span>}

            <span className="prezly-slate-link-embed__url">{url}</span>
        </a>
    );
};

export default LinkEmbed;
