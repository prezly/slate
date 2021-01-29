import { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, ImgHTMLAttributes } from 'react';

import './Screenshot.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    children?: never;
    node: EmbedNode;
}
const Screenshot: FunctionComponent<Props> = ({ className, node, ...props }) => {
    const { oembed } = node;

    return (
        <img
            alt={oembed.title}
            className={classNames('prezly-slate-screenshot', className)}
            src={oembed.screenshot_url}
            {...props}
        />
    );
};

export default Screenshot;
