import type { ContactInfo } from '@prezly/slate-types';
import { useState } from 'react';
import React from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderContact } from '#icons';
import { useFunction } from '#lib';

import { InlineContactForm } from '#modules/components';

import { createContactNode } from '../../../press-contacts';
import type { Props as PlaceholderElementProps } from '../../components/PlaceholderElement';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../../lib';
import type { PlaceholderNode } from '../../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../../PlaceholdersManager';

import { FormFrame } from './FormFrame';

enum Mode {
    FORM = 'form',
    SEARCH = 'search',
}

export function InlineContactPlaceholderElement({
    children,
    element,
    getSuggestions,
    removable,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: InlineContactPlaceholderElement.Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const [mode, setMode] = useState(Mode.SEARCH);
    const [contact, setContact] = useState<ContactInfo | null>(null);

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((_: string, contact: ContactInfo) => {
        setMode(Mode.FORM);
        setContact(contact);
    });

    const handleSubmit = useFunction((contact: ContactInfo) => {
        replacePlaceholder(editor, element, createContactNode({ contact, reference: null }));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<ContactInfo>
            {...props}
            element={element}
            // Core
            format="card"
            icon={PlaceholderContact}
            title="Click to insert a contact"
            description="Add a contact to your story"
            // Input
            getSuggestions={getSuggestions}
            renderEmpty={renderEmpty}
            renderFrame={
                mode === Mode.FORM
                    ? () => (
                          <FormFrame isSelected={isSelected}>
                              <InlineContactForm
                                  contact={contact}
                                  onClose={() => setMode(Mode.SEARCH)}
                                  onSubmit={handleSubmit}
                              />
                          </FormFrame>
                      )
                    : undefined
            }
            renderSuggestion={
                renderSuggestion
                    ? (props) =>
                          renderSuggestion({
                              ...props,
                              onSelect: () => handleSelect('', props.suggestion.value),
                          })
                    : undefined
            }
            renderSuggestions={(props) => (
                <SearchInput.Suggestions
                    activeElement={props.activeElement}
                    query={props.query}
                    suggestions={props.suggestions}
                    footer={renderSuggestionsFooter?.(props)}
                >
                    {props.children}
                </SearchInput.Suggestions>
            )}
            inputTitle="Contact"
            inputDescription="Select a contact to insert or create a new one"
            inputPlaceholder="Search for contacts"
            onSelect={handleSelect}
            removable={removable}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace InlineContactPlaceholderElement {
    export interface Props
        extends Omit<
                BaseProps<ContactInfo>,
                | 'onSelect'
                | 'icon'
                | 'title'
                | 'description'
                | 'inputTitle'
                | 'inputDescription'
                | 'inputPlaceholder'
                | 'renderSuggestions'
            >,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.CONTACT>;
        renderSuggestionsFooter?: BaseProps<ContactInfo>['renderSuggestions'];
    }
}
