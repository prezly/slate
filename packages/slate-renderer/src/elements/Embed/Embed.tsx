import { EmbedNode, OEmbedInfoType } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';

import './Embed.scss';
import { injectOembedMarkup } from './lib';
import Link from './Link';

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
    const contentRef = useRef<HTMLDivElement>(null);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { oembed, url } = node;
    const isUsingScreenshots = showAsScreenshot && oembed.type !== 'link';

    useEffect(() => {
        if (!isUsingScreenshots && contentRef.current && typeof window !== 'undefined') {
            injectOembedMarkup({
                oembed,
                onError: () => setIsValid(false),
                target: contentRef.current,
            });
        }
    }, [oembed, isUsingScreenshots]);

    const commonProps = {
        className: classNames('prezly-slate-embed', className, {
            'prezly-slate-embed--error': !isValid,
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

            {!showAsScreenshot && <div className="prezly-slate-embed__iframely" ref={contentRef} />}
        </div>
    );
};

export default Embed;
