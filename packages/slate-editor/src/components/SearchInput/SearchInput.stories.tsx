import * as React from 'react';

import { SearchInput } from './SearchInput';
import type { Suggestion } from './types';

export default {
    title: 'Components/SearchInput',
    decorators: [
        (Story: React.ComponentType) => (
            <div
                style={{
                    background: 'rgba(27, 27, 54, 0.96)',
                    padding: 30,
                    width: 500,
                    height: 400,
                }}
            >
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
    { id: 'eleven', value: 'Eleven', disabled: true },
    { id: 'twelve', value: 'Twelve' },
    { id: 'thirteen', value: 'Thirteen' },
    { id: 'fourteen', value: 'Fourteen' },
    { id: 'fifteen', value: 'Fifteen' },
    { id: 'sixteen', value: 'Sixteen' },
    { id: 'seventeen', value: 'Seventeen' },
    { id: 'eighteen', value: 'Eighteen' },
    { id: 'nineteen', value: 'Nineteen' },
    { id: 'twenty', value: 'Twenty' },
    { id: 'twenty-one', value: 'Twenty One', disabled: true },
    { id: 'twenty-two', value: 'Twenty Two' },
    { id: 'twenty-three', value: 'Twenty Three' },
    { id: 'twenty-four', value: 'Twenty Four' },
    { id: 'twenty-five', value: 'Twenty Five' },
    { id: 'twenty-six', value: 'Twenty Six' },
    { id: 'twenty-seven', value: 'Twenty Seven' },
    { id: 'twenty-eight', value: 'Twenty Eight' },
    { id: 'twenty-nine', value: 'Twenty Nine' },
    { id: 'thirty', value: 'Thirty' },
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
            onSelect={(suggestion) => console.log('Selected', suggestion)}
            getSuggestions={getSuggestions}
        />
    );
}

export function WithFooter() {
    const [query, setQuery] = React.useState('');

    return (
        <SearchInput<string>
            query={query}
            onChange={setQuery}
            onSelect={(suggestion) => console.log('Selected', suggestion)}
            getSuggestions={getSuggestions}
            components={{
                Suggestions: (props) => (
                    <SearchInput.Suggestions
                        {...props}
                        footer={
                            <div>
                                <a href="#">Log new Coverage</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#">Edit Coverage</a>
                            </div>
                        }
                    />
                ),
            }}
        />
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
