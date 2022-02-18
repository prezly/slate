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
                gridTemplateColumns: 'repeat( auto-fit, minmax(180px, 1fr) )',
                columnGap: 10,
                rowGap: 15,
                background: 'rgba(27, 27, 54, 0.4)',
            }}
        >
            {Object.entries(icons).map(([name, Icon]) => (
                <div
                    key={name}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Icon fill="gray" color="#F9CA7B" />
                    <span>{name}</span>
                </div>
            ))}
        </div>
    );
}
