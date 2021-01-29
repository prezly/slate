import { EmbedNode, OEmbedInfoType } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Embed.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: EmbedNode;
    showAsScreenshot?: boolean;
}
const Embed: FunctionComponent<Props> = ({
    children,
    className,
    node,
    showAsScreenshot,
    ...props
}) => {
    const { oembed, url } = node;

    return (
        <a
            className={classNames('prezly-slate-embed', className, {
                'prezly-slate-embed--link': oembed.type === OEmbedInfoType.LINK,
                'prezly-slate-embed--video': oembed.type === OEmbedInfoType.VIDEO,
            })}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            title={oembed.title || url}
            {...props}
        >
            {oembed.type === OEmbedInfoType.LINK && (
                <span className="prezly-slate-embed__link">
                    {oembed.title && (
                        <span className="prezly-slate-embed__link-title">{oembed.title}</span>
                    )}

                    <span className="prezly-slate-embed__link-url">{url}</span>
                </span>
            )}

            {oembed.type !== OEmbedInfoType.LINK && (
                <>
                    {showAsScreenshot && (
                        <img
                            alt={oembed.title}
                            className="prezly-slate-embed__screenshot"
                            src={oembed.screenshot_url}
                        />
                    )}

                    {!showAsScreenshot && <div>TODO</div>}
                </>
            )}
        </a>
    );
};

export default Embed;
