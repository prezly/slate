import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent, ReactNode, useCallback } from 'react';
import { renderToString } from 'react-dom/server';
import striptags from 'striptags';

import { Pinterest } from '../../icons';
import { openWindow } from '../../lib';

import { getPinterestShareUrl } from './lib';
import './PinterestButton.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: never;
    description?: ReactNode;
    image?: string;
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
    const handlePinterestClick: Props['onClick'] = useCallback(
        (event) => {
            const descriptionString = striptags(renderToString(<>{description}</>));
            const pinterestShareUrl = getPinterestShareUrl(descriptionString, url, image);
            openWindow(pinterestShareUrl, 575, 400);

            if (onClick) {
                onClick(event);
            }
        },
        [onClick],
    );

    return (
        <button
            className={classNames('prezly-slate-pinterest-button', className)}
            onClick={handlePinterestClick}
            title="Pin"
            type="button"
            {...props}
        >
            <Pinterest className="prezly-slate-pinterest-button__icon" />
        </button>
    );
};

export default PinterestButton;
