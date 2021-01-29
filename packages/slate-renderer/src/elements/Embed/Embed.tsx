import { EmbedNode, OEmbedInfoType } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Embed.scss';
import IframelyEmbed from './IframelyEmbed';
import Link from './Link';

interface Props extends HTMLAttributes<HTMLElement> {
    children?: never;
    node: EmbedNode;
    showAsScreenshot?: boolean;
}
const Embed: FunctionComponent<Props> = ({ className, node, showAsScreenshot, ...props }) => {
    const { oembed, url } = node;

    const commonProps = {
        className: classNames('prezly-slate-embed', className, {
            'prezly-slate-embed--link': oembed.type === OEmbedInfoType.LINK,
            'prezly-slate-embed--video': oembed.type === OEmbedInfoType.VIDEO,
        }),
        title: oembed.title || url,
        ...props,
    };

    if (oembed.type === OEmbedInfoType.LINK) {
        return <Link {...commonProps} node={node} />;
    }

    return (
        <div {...commonProps}>
            {showAsScreenshot && (
                <img
                    alt={oembed.title}
                    className="prezly-slate-embed__screenshot"
                    src={oembed.screenshot_url}
                />
            )}

            {!showAsScreenshot && <IframelyEmbed node={node} />}
        </div>
    );
};

export default Embed;
