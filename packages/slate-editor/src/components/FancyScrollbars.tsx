import React, { Component } from 'react';
import type { ScrollbarProps } from 'react-custom-scrollbars-2';
import { Scrollbars } from 'react-custom-scrollbars-2';

import styles from './FancyScrollbars.module.scss';

type Props = Omit<ScrollbarProps, 'ref'>;

export class FancyScrollbars extends Component<Props> {
    public container: HTMLDivElement | null = null;

    private setScrollbarsRef = (instance: Scrollbars) => {
        this.container = instance.container;
    };

    render() {
        const { children, ...props } = this.props;

        return (
            <Scrollbars
                renderThumbHorizontal={(props) => <div {...props} className={styles.hThumb} />}
                renderThumbVertical={(props) => <div {...props} className={styles.vThumb} />}
                renderTrackHorizontal={(props) => <div {...props} className={styles.hTrack} />}
                renderTrackVertical={(props) => <div {...props} className={styles.vTrack} />}
                {...props}
                ref={this.setScrollbarsRef}
            >
                {children}
            </Scrollbars>
        );
    }
}
