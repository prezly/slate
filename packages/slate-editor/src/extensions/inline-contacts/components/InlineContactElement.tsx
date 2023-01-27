import type { ContactInfo, ContactNode } from '@prezly/slate-types';
import { useCallback, useState } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { useFunction } from '#lib';

import { InlineContactForm } from '#modules/components';

import { PressContactElement, removePressContact } from '../../press-contacts';
import { updateInlineContact } from '../transforms';

import styles from './InlineContactElement.module.scss';
import { InlineContactMenu } from './InlineContactMenu';

enum Mode {
    EDIT = 'edit',
    READ = 'read',
}

interface Props extends RenderElementProps {
    element: ContactNode;
}

export function InlineContactElement(props: Props) {
    const { attributes, element, children } = props;
    const { contact } = element;
    const editor = useSlateStatic();
    const selected = useSelected();
    const [mode, setMode] = useState(Mode.READ);

    const handleClose = useFunction(() => setMode(Mode.READ));
    const handleEdit = useFunction(() => setMode(Mode.EDIT));
    const handleRemove = useCallback(() => removePressContact(editor), [editor, element]);

    const handleUpdate = useCallback(
        function (patch: ContactInfo) {
            updateInlineContact(editor, element, { contact: patch });
            handleClose();
        },
        [editor, element],
    );

    if (mode === Mode.EDIT) {
        return (
            <EditorBlock
                {...attributes}
                element={element}
                renderAboveFrame={children}
                renderReadOnlyFrame={() => (
                    <div className={styles.container}>
                        <InlineContactForm
                            isEditing
                            contact={contact}
                            onClose={handleClose}
                            onSubmit={handleUpdate}
                        />
                    </div>
                )}
                rounded
                selected={selected}
                void
            />
        );
    }

    return (
        <PressContactElement
            renderMenu={({ onClose }) => (
                <InlineContactMenu onClose={onClose} onEdit={handleEdit} onRemove={handleRemove} />
            )}
            {...props}
        />
    );
}
