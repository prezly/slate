import React, { type ComponentType } from 'react';

import type { Suggestion } from '../../../components/SearchInput/types';

import { SearchInputPlaceholder } from './SearchInputPlaceholder';

export default {
    title: 'Extensions/Placeholders/components/SearchInputPlaceholder',
    decorators: [
        (Story: ComponentType) => (
            <div style={{ width: 680 }}>
                <Story />
            </div>
        ),
    ],
};

const suggestions: Suggestion<string>[] = [
    { id: '1', value: 'Frodo Baggins' },
    { id: '2', value: 'Aragorn' },
    { id: '3', value: 'Samwise Gamgee' },
    { id: '4', value: 'Merry Brandybuck' },
    { id: '5', value: 'Legolas' },
    { id: '6', value: 'Pippin Took' },
    { id: '7', value: 'Gandalf' },
    { id: '8', value: 'Boromir' },
    { id: '9', value: 'Arwen' },
    { id: '10', value: 'Galadriel' },
];

async function getSuggestions(query: string) {
    await delay(500 + Math.random() * 500);
    return suggestions.filter(({ value }) => value.toLowerCase().includes(query.toLowerCase()));
}

export function Default() {
    return (
        <SearchInputPlaceholder<string>
            title="Newsroom Contact"
            description="Select a Contact to insert"
            getSuggestions={getSuggestions}
            onSelect={(value) => console.log('Selected', value)}
            placeholder="Search for contacts"
        ></SearchInputPlaceholder>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
