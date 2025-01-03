import type { ContactInfo } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';

import { PlaceholderContact } from '#icons';
import { useFunction } from '#lib';

import { InlineContactForm } from '#modules/components';

import { createContactNode } from '../../../press-contacts';
import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../../components/PlaceholderElement';
import { type Props as BaseProps } from '../../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../../lib';
import type { PlaceholderNode } from '../../PlaceholderNode';

import { FormFrame } from './FormFrame';

enum Mode {
    FORM = 'form',
    SEARCH = 'search',
}

export function InlineContactPlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    removable,
    renderPlaceholder,
}: InlineContactPlaceholderElement.Props) {
    const [isCustomRendered, setCustomRendered] = useState(true);
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const [mode, setMode] = useState(Mode.SEARCH);
    const [contact, setContact] = useState<ContactInfo | null>(null);

    const handleSelect = useFunction((contact: ContactInfo | null) => {
        setMode(Mode.FORM);
        setContact(contact);
    });

    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
    });

    const handleSubmit = useFunction((contact: ContactInfo) => {
        replacePlaceholder(editor, element, createContactNode({ contact }));
    });

    const renderFormFrame = useFunction(() => (
        <FormFrame isSelected={isSelected}>
            <InlineContactForm
                contact={contact}
                onClose={() => setMode(Mode.SEARCH)}
                onSubmit={handleSubmit}
            />
        </FormFrame>
    ));

    const renderFrame = useFunction(() => {
        if (mode === Mode.FORM) {
            return () => renderFormFrame();
        }

        if (isCustomRendered) {
            return () =>
                renderPlaceholder({
                    onRemove: removable ? handleRemove : undefined,
                    onSelect: handleSelect,
                });
        }

        return undefined;
    });

    useEffect(() => {
        if (!isSelected) {
            setCustomRendered(false);
        }
    }, [isSelected]);

    return (
        <PlaceholderElement
            attributes={attributes}
            element={element}
            format={format}
            icon={PlaceholderContact}
            title="Click to insert a contact"
            description="Add a contact to your story"
            onClick={() => setCustomRendered(true)}
            removable={removable}
            renderFrame={renderFrame()}
        >
            {children}
        </PlaceholderElement>
    );
}

export namespace InlineContactPlaceholderElement {
    export interface Props
        extends Pick<BaseProps<ContactInfo>, 'attributes' | 'children' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.CONTACT>;
        renderPlaceholder: (props: {
            onRemove: (() => void) | undefined;
            onSelect: (contactInfo: ContactInfo) => void;
        }) => ReactNode;
    }
}
