import React, { Component } from 'react';

import BasePortal from './BasePortal';
import { PortalProps } from './types';

interface Props extends PortalProps {
    element: HTMLElement;
}

class ElementPortal extends Component<Props> {
    getElementRect = () => this.props.element.getBoundingClientRect();

    render() {
        return <BasePortal {...this.props} getElementRect={this.getElementRect} />;
    }
}

export default ElementPortal;
