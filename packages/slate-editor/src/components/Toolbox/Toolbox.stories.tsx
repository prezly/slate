import * as React from 'react';

import * as Toolbox from './index';

export default {
    title: 'Components/Toolbox',
};

export function Base() {
    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Web bookmark settings</Toolbox.Header>
            </Toolbox.Panel>
        </div>
    );
}
