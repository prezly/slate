import React, { Component } from 'react';

import type { Props as BasePortalV2Props } from './BasePortalV2';
import { BasePortalV2 } from './BasePortalV2';

interface Props extends Omit<BasePortalV2Props, 'getBoundingClientRect'> {
    element: HTMLElement | undefined | null;
}

export class ElementPortalV2 extends Component<Props> {
    getBoundingClientRect = () => {
        return this.props.element?.getBoundingClientRect() || null;
    };

    render() {
        const { children, ...props } = this.props;
        return (
            <BasePortalV2 {...props} getBoundingClientRect={this.getBoundingClientRect}>
                {children}
            </BasePortalV2>
        );
    }
}
