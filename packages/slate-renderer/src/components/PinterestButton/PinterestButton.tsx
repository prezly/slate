import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent, ReactNode, useCallback } from 'react';
import { renderToString } from 'react-dom/server';
import striptags from 'striptags';

import { Pinterest } from '../../icons';
import { openWindow } from '../../lib';

import { getPinterestShareUrl } from './lib';
import './PinterestButton.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: never;
    description?: ReactNode;
    image: string;
    url?: string;
}

const PinterestButton: FunctionComponent<Props> = ({
    className,
    description,
    image,
    url,
    onClick,
    ...props
}) => {
    const pinterestShareUrl = getPinterestShareUrl({
        description: striptags(renderToString(<>{description}</>)),
        image,
        url,
    });

    const handlePinterestClick: Props['onClick'] = useCallback(
        (event) => {
            event.preventDefault();

            openWindow(pinterestShareUrl, 575, 400);

            if (onClick) {
                onClick(event);
            }
        },
        [onClick],
    );

    return (
        <a
            className={classNames('prezly-slate-pinterest-button', className)}
            href={pinterestShareUrl}
            onClick={handlePinterestClick}
            rel="noreferrer noopener"
            target="_blank"
            title="Save this Pin!"
            {...props}
        >
            <Pinterest className="prezly-slate-pinterest-button__icon" />
        </a>
    );
};

export default PinterestButton;
