import React, { FunctionComponent } from 'react';

import BasePortalV2, { Props as BasePortalV2Props } from './BasePortalV2';

interface Props extends Omit<BasePortalV2Props, 'getBoundingClientRect'> {
    element: HTMLElement | undefined | null;
}

/**
 * It's not the same as `ElementPortal` beacuse it uses `react-popper` internally,
 * which supports positioning only outside of the target `element`.
 */
const ElementPortalV2: FunctionComponent<Props> = ({ element, ...props }) => (
    <BasePortalV2
        {...props}
        getBoundingClientRect={() => (element ? element.getBoundingClientRect() : null)}
    />
);

export default ElementPortalV2;
