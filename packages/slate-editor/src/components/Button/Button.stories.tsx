import * as React from 'react';

import { Button, VStack } from '#components';
import { ExternalLink } from '#icons';

export default {
    title: 'Components/Button',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ background: 'rgba(31, 32, 35, 0.5)' }}>
                <Story />
            </div>
        ),
    ],
};

export function Base() {
    return <Button>Base</Button>;
}

export function AsLink() {
    return (
        <Button type="link" href="#" variant="clear">
            Base
        </Button>
    );
}

export function WithIcon() {
    return (
        <VStack spacing="2">
            <div>
                <Button icon={ExternalLink}>Icon left</Button>
            </div>
            <div>
                <Button icon={ExternalLink} iconPosition="right">
                    Icon right
                </Button>
            </div>
            <div>
                <Button icon={ExternalLink} />
            </div>

            <div>
                <Button icon={ExternalLink} variant="secondary" round />
            </div>
        </VStack>
    );
}

export function Variants() {
    return (
        <VStack spacing="2">
            <div>
                <Button variant="primary">Primary</Button>
            </div>

            <div>
                <Button variant="primary" round>
                    Primary round
                </Button>
            </div>

            <div>
                <Button variant="secondary">Secondary</Button>
            </div>

            <div>
                <Button variant="secondary" round>
                    Secondary round
                </Button>
            </div>

            <div>
                <Button variant="clear">Clear</Button>
            </div>

            <div>
                <Button round>Round</Button>
            </div>

            <div>
                <Button variant="underlined">Underlined</Button>
            </div>
        </VStack>
    );
}

export function States() {
    return (
        <VStack spacing="2">
            <div>
                <Button variant="clear" disabled>
                    Disabled
                </Button>
            </div>
        </VStack>
    );
}
