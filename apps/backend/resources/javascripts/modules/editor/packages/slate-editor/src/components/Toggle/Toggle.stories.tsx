import * as React from 'react';

import { Toggle } from '#components';

export default {
    title: 'Components/Toggle',
};

export function Base() {
    return (
        <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 20 }}>
            <Toggle name="toggle_base" />
        </div>
    );
}

export function Disabled() {
    return (
        <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 20 }}>
            <Toggle disabled name="toggle_disabled" />
        </div>
    );
}
