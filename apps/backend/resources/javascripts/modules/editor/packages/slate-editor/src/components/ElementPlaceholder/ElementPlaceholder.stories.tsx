import * as React from 'react';

import { ChickenNoSignalIllustration } from '#icons';

import { ElementPlaceholder } from './';

export default {
    title: 'Components/ElementPlaceholder',
};

export function WithSubtitle() {
    return (
        <div style={{ width: 700 }}>
            <ElementPlaceholder
                onClick={() => console.log('Click')}
                illustration={<ChickenNoSignalIllustration />}
                title="The selected Prezly Story is no longer available"
                subtitle="Click to select another a bookmark of one of your stories"
            />
        </div>
    );
}

export function NoSubtitle() {
    return (
        <div style={{ width: 700 }}>
            <ElementPlaceholder
                onClick={() => console.log('Click')}
                illustration={<ChickenNoSignalIllustration />}
                title="The selected Prezly Story is no longer available"
            />
        </div>
    );
}
