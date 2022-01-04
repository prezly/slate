import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import './KeyboardKey.scss';

interface Props {
    className?: string;
}

export const KeyboardKey: FunctionComponent<Props> = ({ children, className }) => (
    <kbd className={classNames('keyboard-key', className)}>{children}</kbd>
);
