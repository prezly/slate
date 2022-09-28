import * as React from 'react';

import { SearchInput } from './SearchInput';
import type { Suggestion } from './types';

export default {
    title: 'Components/SearchInput',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 30, width: 500 }}>
                <Story />
            </div>
        ),
    ],
};

const suggestions: Suggestion<string>[] = [
    { id: 'zero', value: 'Zero', disabled: true },
    { id: 'one', value: 'One' },
    { id: 'two', value: 'Two' },
    { id: 'three', value: 'Three' },
    { id: 'four', value: 'Four' },
    { id: 'five', value: 'Five' },
    { id: 'six', value: 'Six' },
    { id: 'seven', value: 'Seven' },
    { id: 'eight', value: 'Eight' },
    { id: 'nine', value: 'Nine' },
    { id: 'ten', value: 'Ten' },
];

async function getSuggestions(query: string) {
    await delay(500 + Math.random() * 500);
    return suggestions.filter(({ value }) => value.toLowerCase().includes(query.toLowerCase()));
}

export function Base() {
    const [query, setQuery] = React.useState('');

    return (
        <SearchInput<string>
            query={query}
            onChange={setQuery}
            getSuggestions={getSuggestions}
            renderSuggestion={({ active, value }) => (
                <>
                    {value} {active && '(active)'}
                </>
            )}
        />
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
