import * as React from 'react';

import { Accordion } from '#components';

export default {
    title: 'Components/Accordion',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ background: 'rgba(31, 32, 35, 0.5)' }}>
                <Story />
            </div>
        ),
    ],
};

export function Default() {
    return <Accordion title="Default">Test accordion</Accordion>;
}
