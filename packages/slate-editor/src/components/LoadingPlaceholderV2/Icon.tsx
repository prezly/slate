import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

export interface Props {
    className?: string;
    icon: FunctionComponent<HTMLAttributes<SVGElement>>;
}

const Icon: FunctionComponent<Props> = ({ className, icon: IconComponent }) => (
    <IconComponent className={classNames('loading-placeholder-v2__icon', className)} />
);

export default Icon;
