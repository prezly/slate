import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Cross } from '../../icons';

import './CloseButtonV2.scss';

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
        <Cross height={16} width={16} />
    </button>
);

export default CloseButtonV2;
