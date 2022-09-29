import type { PressContact } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderContact } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createPressContact } from '../../press-contacts';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

export function ContactPlaceholderElement({
    children,
    element,
    getSuggestions,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: ContactPlaceholderElement.Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((contact: PressContact) => {
        EventsEditor.dispatchEvent(editor, 'contact-dialog-submitted', {
            contact_id: contact.id,
        });

        replacePlaceholder(editor, element, createPressContact(contact));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<PressContact>
            {...props}
            element={element}
            // Core
            format="card"
            icon={PlaceholderContact}
            title="Click to insert a newsroom Contact"
            description="Add a Newsroom Contact to your story"
            // Input
            getSuggestions={getSuggestions}
            renderEmpty={renderEmpty}
            renderSuggestion={renderSuggestion}
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
            inputTitle="Newsroom contact"
            inputDescription="Select a contact to insert"
            inputPlaceholder="Search for contacts"
            onSelect={handleSelect}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace ContactPlaceholderElement {
    export interface Props
        extends Omit<
            BaseProps<PressContact>,
            | 'onSelect'
            | 'icon'
            | 'title'
            | 'description'
            | 'inputTitle'
            | 'inputDescription'
            | 'inputPlaceholder'
            | 'renderSuggestions'
        > {
        element: PlaceholderNode<PlaceholderNode.Type.CONTACT>;
        renderSuggestionsFooter?: BaseProps<PressContact>['renderSuggestions'];
    }
}
