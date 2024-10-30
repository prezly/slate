import type { NewsroomContact } from '@prezly/sdk';
import type { ContactInfo } from '@prezly/slate-types';
import React from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderContact } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createContactNode } from '../../press-contacts';
import type { Props as PlaceholderElementProps } from '../components/PlaceholderElement';
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
    format = 'card',
    getSuggestions,
    removable,
    renderAddon,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: ContactPlaceholderElement.Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((uuid: NewsroomContact['uuid'], contact: ContactInfo) => {
        EventsEditor.dispatchEvent(editor, 'contact-placeholder-submitted', {
            contact: { uuid },
        });

        replacePlaceholder(editor, element, createContactNode({ contact, reference: uuid }), {
            select: isSelected,
        });
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<ContactInfo>
            {...props}
            element={element}
            // Core
            format={format}
            icon={PlaceholderContact}
            title="Click to insert a site contact"
            description="Add a site contact to your story"
            // Input
            getSuggestions={getSuggestions}
            renderAddon={renderAddon}
            renderEmpty={renderEmpty}
            renderSuggestion={renderSuggestion}
            renderSuggestions={(props) => (
                <SearchInput.Suggestions
                    activeElement={props.activeElement}
                    query={props.query}
                    suggestions={props.suggestions}
                    footer={renderSuggestionsFooter?.(props)}
                    origin={props.origin}
                >
                    {props.children}
                </SearchInput.Suggestions>
            )}
            inputTitle="Site contacts"
            inputDescription="Add a contact card to your stories, campaigns and pitches"
            inputPlaceholder="Search site contacts"
            onSelect={handleSelect}
            removable={removable}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace ContactPlaceholderElement {
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
