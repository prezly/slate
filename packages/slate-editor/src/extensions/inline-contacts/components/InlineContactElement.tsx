import type { ContactInfo, ContactNode } from '@prezly/slate-types';
import { useCallback, useState } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { useFunction } from '#lib';

import { PressContactElement } from '../../press-contacts/components';
import { removePressContact } from '../../press-contacts/lib';
import { updateInlineContact } from '../transforms';
import type { InlineContactsExtensionParameters } from '../types';

import styles from './InlineContactElement.module.scss';
import { InlineContactMenu } from './InlineContactMenu';

enum Mode {
    EDIT = 'edit',
    READ = 'read',
}

interface Props extends RenderElementProps {
    element: ContactNode;
    renderForm: InlineContactsExtensionParameters['renderForm'];
}

export function InlineContactElement({ renderForm, ...props }: Props) {
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
                        {renderForm({
                            contact,
                            onClose: handleClose,
                            onSubmit: handleUpdate,
                        })}
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
