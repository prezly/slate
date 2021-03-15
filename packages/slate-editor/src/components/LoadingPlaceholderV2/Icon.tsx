import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import SvgIcon from '../SvgIcon';

interface Props {
    className?: string;
    icon: BrowserSpriteSymbol;
}

const Icon: FunctionComponent<Props> = ({ className, icon }) => (
    <SvgIcon className={classNames('loading-placeholder-v2__icon', className)} icon={icon} />
);

export default Icon;
