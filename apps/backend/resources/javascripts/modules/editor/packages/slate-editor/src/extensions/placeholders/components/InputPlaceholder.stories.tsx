import * as React from 'react';

import { InputPlaceholder } from './InputPlaceholder';

export default {
    title: 'Extensions/Placeholders/components/InputPlaceholder',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ width: 680 }}>
                <Story />
            </div>
        ),
    ],
};

const TITLE = 'Embed';
const DESCRIPTION = 'Insert an embed URL and hit Enter';

export function Default() {
    return (
        <InputPlaceholder
            title={TITLE}
            description={DESCRIPTION}
            onSubmit={(value) => console.log(value)}
            placeholder="media.giphy.com/GIF"
            action="Add embed"
        ></InputPlaceholder>
    );
}
