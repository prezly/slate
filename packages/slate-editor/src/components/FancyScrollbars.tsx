import React, { Component } from 'react';
import type { ScrollbarProps } from 'react-custom-scrollbars-2';
import { Scrollbars } from 'react-custom-scrollbars-2';

import styles from './FancyScrollbars.module.scss';

type Props = Omit<ScrollbarProps, 'ref'>;

const DEFAULT_MARGIN = 16;

export class FancyScrollbars extends Component<Props> {
    public container: HTMLDivElement | null = null;
    private scrollbars: Scrollbars | null = null;

    private setScrollbarsRef = (instance: Scrollbars) => {
        this.scrollbars = instance;
        this.container = instance?.container || null;
    };

    public ensureVisible(child: HTMLElement, margin: number = DEFAULT_MARGIN): void {
        const parent = getScrollParent(child);

        if (!parent || !this.container) return;

        if (!this.container.contains(parent)) return;

        if (!this.container.contains(child)) {
            console.warn('Child is required to be a descendant of the Scrollbars container.');
            return;
        }

        const childHeight = child.getBoundingClientRect().height;
        const parentHeight = parent.getBoundingClientRect().height;

        const isChildAboveVisibleArea = child.offsetTop < parent.scrollTop;
        const isChildBelowVisibleArea =
            child.offsetTop + childHeight > parent.scrollTop + parentHeight;

        if (isChildAboveVisibleArea) {
            const y = child.offsetTop - margin;
            this.scrollbars?.scrollTop(y);
            return;
        }

        if (isChildBelowVisibleArea) {
            const y = child.offsetTop + childHeight + margin - parentHeight;
            this.scrollbars?.scrollTop(y);
            return;
        }
    }

    renderThumbHorizontal = (props: Record<string, any>) => (
        <div {...props} className={styles.hThumb} />
    );

    renderThumbVertical = (props: Record<string, any>) => (
        <div {...props} className={styles.vThumb} />
    );

    renderTrackHorizontal = (props: Record<string, any>) => (
        <div {...props} className={styles.hTrack} />
    );

    renderTrackVertical = (props: Record<string, any>) => (
        <div {...props} className={styles.vTrack} />
    );

    render() {
        const { children, ...props } = this.props;

        return (
            <Scrollbars
                renderThumbHorizontal={this.renderThumbHorizontal}
                renderThumbVertical={this.renderThumbVertical}
                renderTrackHorizontal={this.renderTrackHorizontal}
                renderTrackVertical={this.renderTrackVertical}
                {...props}
                ref={this.setScrollbarsRef}
            >
                {children}
            </Scrollbars>
        );
    }
}

function getScrollParent(element: HTMLElement): HTMLElement | null {
    if (element == null) {
        return null;
    }

    if (element.scrollHeight > element.clientHeight) {
        return element;
    }

    if (element.parentElement) {
        return getScrollParent(element.parentElement);
    }

    return null;
}
