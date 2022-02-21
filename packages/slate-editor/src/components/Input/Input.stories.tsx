import * as React from 'react';

import { Input } from '#components';
import { Link } from '#icons';

export default {
    title: 'Components/Input',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 30, width: 300 }}>
                <Story />
            </div>
        ),
    ],
};

export function Base() {
    const [value, setValue] = React.useState('');

    return <Input value={value} onChange={setValue} />;
}

export function WithIcon() {
    const [value, setValue] = React.useState('');

    return <Input value={value} onChange={setValue} icon={Link} />;
}

export function WithPlaceholder() {
    const [value, setValue] = React.useState('');

    return (
        <Input
            value={value}
            onChange={setValue}
            icon={Link}
            placeholder="Paste link or search content"
        />
    );
}

export function Disabled() {
    const [value, setValue] = React.useState('');

    return (
        <Input
            value={value}
            onChange={setValue}
            icon={Link}
            disabled
            placeholder="Paste link or search content"
        />
    );
}
