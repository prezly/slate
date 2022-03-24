import classNames from 'classnames';
import React from 'react';

import { Caption } from './Caption';
import styles from './Toolbox.module.scss';

interface SectionProps {
    caption?: string;
    noPadding?: boolean;
    paddingBottom?: '3';
}

export function Section(props: React.PropsWithChildren<SectionProps>) {
    return (
        <div
            className={classNames(styles.section, {
                [styles['section--no-padding']]: props.noPadding,
            })}
        >
            {props.caption && (
                <div
                    className={classNames(styles['section-header-wrapper'], {
                        [styles['section-header-wrapper--padding-bottom-3']]:
                            props.paddingBottom === '3',
                    })}
                >
                    <Caption>{props.caption}</Caption>
                </div>
            )}

            {props.children}
        </div>
    );
}
