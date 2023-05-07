import * as React from 'react';
import { useState } from 'react';

import * as Icons from '#icons';

import * as Menu from '.';

const ALIGNMENT_OPTIONS = [
    {
        icon: Icons.AlignLeft,
        label: 'Align story body to left',
        value: 'left',
    },
    {
        icon: Icons.AlignCenter,
        label: 'Center story body',
        value: 'center',
    },
    {
        icon: Icons.AlignRight,
        label: 'Align story body to right',
        value: 'right',
    },
];

const APPEARANCE_OPTIONS = [
    { label: 'Show introduction', value: 'intro' },
    { label: 'Show full story', value: 'full' },
];

export default {
    title: 'Components/Menu',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ overflow: 'hidden' }}>
                <Story />
            </div>
        ),
    ],
};

export function FloatingMenu() {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [alignment, onAlignmentChange] = useState('left');
    const [appearance, onAppearanceChange] = useState('intro');

    return (
        <div
            ref={setContainer}
            style={{
                background: 'rgba(31, 32, 35, 0.5)',
                height: 200,
                marginTop: 100,
                maxWidth: 900,
            }}
        >
            <Menu.FloatingMenu
                className="settings-menu"
                containerRef={{ current: container }}
                element={container}
            >
                <>
                    <Menu.Link href={`/stories/1`} target="_blank">
                        Edit story
                    </Menu.Link>

                    <Menu.ButtonGroup>
                        {ALIGNMENT_OPTIONS.map((option) => (
                            <Menu.Button
                                active={alignment === option.value}
                                key={option.value}
                                onMouseDown={() => onAlignmentChange(option.value)}
                                title={option.label}
                            >
                                <Menu.Icon icon={option.icon} />
                            </Menu.Button>
                        ))}
                    </Menu.ButtonGroup>

                    <Menu.Dropdown
                        id="story-appearance"
                        onChange={onAppearanceChange}
                        options={APPEARANCE_OPTIONS}
                        value={appearance}
                    />
                </>

                <Menu.ButtonGroup>
                    <Menu.Button title="Remove story" variant="danger">
                        <Menu.Icon icon={Icons.Delete} />
                    </Menu.Button>
                </Menu.ButtonGroup>
            </Menu.FloatingMenu>
        </div>
    );
}
