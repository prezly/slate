import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { cross } from 'icons';

import SvgIcon from '../SvgIcon';

interface Props {
    className?: string;
    disabled?: boolean;
    onClick: () => void;
    title: string;
}

const CloseButtonV2: FunctionComponent<Props> = ({ className, disabled, onClick, title }) => (
    <button
        className={classNames('btn', 'btn-default', 'close-button', className)}
        disabled={disabled}
        onClick={onClick}
        title={title}
        type="button"
    >
        <SvgIcon height={16} icon={cross} width={16} />
    </button>
);

export default CloseButtonV2;
