import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import './KeyboardKey.scss';

interface Props {
    className?: string;
}

const KeyboardKey: FunctionComponent<Props> = ({ children, className }) => (
    <kbd className={classNames('keyboard-key', className)}>{children}</kbd>
);

export default KeyboardKey;
