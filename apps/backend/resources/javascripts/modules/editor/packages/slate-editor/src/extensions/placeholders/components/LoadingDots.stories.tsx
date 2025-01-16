import React, { type ComponentType } from 'react';

import { LoadingDots as Dots } from './LoadingDots';

export default {
    title: 'Extensions/Placeholders/components',
    decorators: [
        (Story: ComponentType) => (
            <div style={{ width: 680, padding: 32, fontSize: 14, fontWeight: 600 }}>
                <Story />
            </div>
        ),
    ],
};

export function LoadingDots() {
    return <Dots />;
}
