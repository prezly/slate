import type { NewsroomContact } from '@prezly/sdk';
import type { ContactInfo } from '@prezly/slate-types';
import { useEditorRef } from '@udecode/plate-common/react';
import type { ReactNode } from 'react';
import React from 'react';
import { useSelected } from 'slate-react';

import { PlaceholderContact } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createContactNode } from '../../press-contacts';
import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder, useCustomRendered } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';

export function ContactPlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    removable,
    renderPlaceholder,
}: ContactPlaceholderElement.Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();
    const [isCustomRendered, setCustomRendered] = useCustomRendered(isSelected);

    const handleSelect = useFunction((uuid: NewsroomContact['uuid'], contact: ContactInfo) => {
        EventsEditor.dispatchEvent(editor, 'contact-placeholder-submitted', {
            contact: { uuid },
        });

        replacePlaceholder(editor, element, createContactNode({ contact, reference: uuid }), {
            select: isSelected,
        });
    });

    const handleRemove = useFunction(() => {
        editor.removeNodes({ at: [], match: (node) => node === element });
    });

    return (
        <PlaceholderElement
            attributes={attributes}
            element={element}
            format={format}
            icon={PlaceholderContact}
            title="Click to insert a site contact"
            description="Add a site contact to your story"
            onClick={() => setCustomRendered(true)}
            overflow="visible"
            removable={removable}
            renderFrame={
                isCustomRendered
                    ? () =>
                          renderPlaceholder({
                              onRemove: removable ? handleRemove : undefined,
                              onSelect: handleSelect,
                              placeholder: element,
                          })
                    : undefined
            }
        >
            {children}
        </PlaceholderElement>
    );
}

export namespace ContactPlaceholderElement {
    export interface Props
        extends Pick<BaseProps<ContactInfo>, 'attributes' | 'children' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.CONTACT>;
        renderPlaceholder: (props: {
            onRemove: (() => void) | undefined;
            onSelect: (uuid: string, contactInfo: ContactInfo) => void;
            placeholder: PlaceholderNode;
        }) => ReactNode;
    }
}
