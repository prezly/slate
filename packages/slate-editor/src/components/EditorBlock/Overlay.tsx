import classNames from 'classnames';
import React from 'react';

import styles from './Overlay.module.scss';

interface Props {
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

export function Overlay({ className, onClick }: Props) {
    return <div className={classNames(className, styles.Overlay)} onClick={onClick} />;
}
