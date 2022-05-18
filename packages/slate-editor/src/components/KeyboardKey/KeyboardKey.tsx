import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import './KeyboardKey.scss';

interface Props {
    children: ReactNode;
    className?: string;
}

export const KeyboardKey: FunctionComponent<Props> = ({ children, className }) => (
    <kbd className={classNames('keyboard-key', className)}>{children}</kbd>
);
