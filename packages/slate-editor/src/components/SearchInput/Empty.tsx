import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './Empty.module.scss';
import { Panel } from './Panel';
import type { Props } from './types';

interface Props extends Props.Empty, HTMLAttributes<HTMLDivElement> {}

export function Empty({ query, loading, className, ...attributes }: Props) {
    return (
        <Panel {...attributes} className={classNames(className, styles.Empty)}>
            {loading ? 'Loading' : 'Nothing found'}
        </Panel>
    );
}
