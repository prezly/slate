import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './Empty.module.scss';
import { Panel } from './Panel';

interface Props extends HTMLAttributes<HTMLDivElement> {
    loading: boolean;
    query: string;
}

export function Empty({ query, loading, className, ...attributes }: Props) {
    return (
        <Panel {...attributes} className={classNames(className, styles.Empty)}>
            {loading ? 'Loading' : 'Nothing found'}
        </Panel>
    );
}
