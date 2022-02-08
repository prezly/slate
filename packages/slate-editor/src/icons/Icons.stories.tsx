import * as React from 'react';

import * as icons from './';

export default {
    title: 'Icons',
};

export function Icons() {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr [col-start])',
                columnGap: 10,
                rowGap: 15,
            }}
        >
            {Object.entries(icons).map(([name, Icon]) => (
                <div
                    key={name}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <Icon />
                    <span>{name}</span>
                </div>
            ))}
        </div>
    );
}
