import type { ContactInfo } from '@prezly/slate-types';
import * as React from 'react';
import { createEditor as createSlateEditor } from 'slate';
import { type RenderElementProps, Slate } from 'slate-react';

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

function contact(props: Partial<ContactInfo> & Pick<ContactInfo, 'name'>): ContactInfo {
    return {
        avatar_url: null,
        company: null,
        description: null,
        email: null,
        facebook: null,
        mobile: null,
        phone: null,
        twitter: null,
        website: null,
        ...props,
    };
}

const suggestions: Suggestion<ContactInfo>[] = [
    { id: '00000000-00000000-00000000-00000001', value: contact({ name: 'Frodo Baggins' }) },
    { id: '00000000-00000000-00000000-00000002', value: contact({ name: 'Aragorn' }) },
    { id: '00000000-00000000-00000000-00000003', value: contact({ name: 'Samwise Gamgee' }) },
    { id: '00000000-00000000-00000000-00000004', value: contact({ name: 'Merry Brandybuck' }) },
    { id: '00000000-00000000-00000000-00000005', value: contact({ name: 'Legolas' }) },
    { id: '00000000-00000000-00000000-00000006', value: contact({ name: 'Pippin Took' }) },
    { id: '00000000-00000000-00000000-00000007', value: contact({ name: 'Gandalf' }) },
    { id: '00000000-00000000-00000000-00000008', value: contact({ name: 'Boromir' }) },
    { id: '00000000-00000000-00000000-00000009', value: contact({ name: 'Arwen' }) },
    { id: '00000000-00000000-00000000-00000010', value: contact({ name: 'Galadriel' }) },
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
            removable
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
