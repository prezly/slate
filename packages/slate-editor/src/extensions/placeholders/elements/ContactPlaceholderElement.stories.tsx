import type { PressContact } from '@prezly/slate-types';
import * as React from 'react';
import { createEditor as createSlateEditor } from 'slate';
import { type RenderElementProps, Slate } from 'slate-react';
import * as uuid from 'uuid';

import { SearchInput } from '#components';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import type { Suggestion } from '../../../components/SearchInput/types';
import { PlaceholderNode } from '../PlaceholderNode';

import { ContactPlaceholderElement } from './ContactPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createSlateEditor(), () => extensions);

const placeholder: PlaceholderNode<PlaceholderNode.Type.CONTACT> = {
    type: PlaceholderNode.Type.CONTACT,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

function contact(props: Partial<PressContact> & Pick<PressContact, 'id' | 'name'>): PressContact {
    return {
        avatar_url: null,
        company: null,
        description: null,
        email: null,
        facebook: null,
        mobile: null,
        phone: null,
        twitter: null,
        uuid: uuid.v4(),
        website: null,
        ...props,
    };
}

const suggestions: Suggestion<PressContact>[] = [
    { id: '1', value: contact({ id: 1, name: 'Frodo Baggins' }) },
    { id: '2', value: contact({ id: 2, name: 'Aragorn' }) },
    { id: '3', value: contact({ id: 3, name: 'Samwise Gamgee' }) },
    { id: '4', value: contact({ id: 4, name: 'Merry Brandybuck' }) },
    { id: '5', value: contact({ id: 5, name: 'Legolas' }) },
    { id: '6', value: contact({ id: 6, name: 'Pippin Took' }) },
    { id: '7', value: contact({ id: 7, name: 'Gandalf' }) },
    { id: '8', value: contact({ id: 8, name: 'Boromir' }) },
    { id: '9', value: contact({ id: 9, name: 'Arwen' }) },
    { id: '10', value: contact({ id: 10, name: 'Galadriel' }) },
];

async function getSuggestions(query: string) {
    await delay(500 + Math.random() * 500);
    return suggestions.filter(({ value }) =>
        value.name.toLowerCase().includes(query.toLowerCase()),
    );
}

export default {
    title: 'Extensions/Placeholders/elements',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} value={[placeholder]}>
                <div style={{ width: 680, height: 400 }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function ContactPlaceholder() {
    return (
        <ContactPlaceholderElement
            attributes={attributes}
            element={placeholder}
            getSuggestions={getSuggestions}
            renderSuggestion={({ ref, active, disabled, suggestion, onSelect }) => (
                <SearchInput.Option
                    active={active}
                    disabled={disabled}
                    onClick={onSelect}
                    suggestion={suggestion}
                    forwardRef={ref}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                textAlign: 'center',
                                color: 'white',
                                lineHeight: '40px',
                                borderRadius: 6,
                                backgroundColor: '#2FA4F9',
                                marginRight: 16,
                                flexGrow: 0,
                            }}
                        >
                            {suggestion.value.name
                                .split(/\s/g)
                                .slice(0, 2)
                                .map((word) => word.substring(0, 1))
                                .join('')}
                        </div>
                        <div style={{ flexGrow: 1, fontWeight: 600, fontSize: 14 }}>
                            {suggestion.value.name}
                        </div>
                    </div>
                </SearchInput.Option>
            )}
            renderSuggestionsFooter={() => (
                <div>
                    <a href="#">+ Create a Newsroom Contact</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="#">Edit Newsroom Contacts</a>
                </div>
            )}
        >
            {''}
        </ContactPlaceholderElement>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
