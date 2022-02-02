import * as React from 'react';

import { ExternalLink } from '../../icons';

import * as Toolbox from './index';

export default {
    title: 'Components/Toolbox',
};

export function Base() {
    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Web bookmark settings</Toolbox.Header>

                <Toolbox.Section contentPosition="center">
                    <Toolbox.Link href="#" icon={ExternalLink}>
                        View
                    </Toolbox.Link>
                </Toolbox.Section>

                <Toolbox.Section caption="Preview image">asd</Toolbox.Section>
            </Toolbox.Panel>
        </div>
    );
}
