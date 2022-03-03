import type { AttachmentNode } from '@prezly/slate-types';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import type { Editor } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import { Button, Input, Toolbox, VStack } from '#components';
import { Delete } from '#icons';

import { removeFileAttachment } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    onEdit: (editor: Editor) => void;
    onRemove: (editor: Editor, element: AttachmentNode) => void;
}

export const FileAttachmentMenu: FunctionComponent<Props> = ({
    element,
    containerRef,
    onEdit,
    onRemove,
}) => {
    const editor = useSlate();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    function handleRemove() {
        const removedElement = removeFileAttachment(editor);

        if (removedElement) {
            onRemove(editor, removedElement);
        }
    }

    console.log(element, containerRef, onEdit, handleRemove);

    const [text, setText] = React.useState('');

    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton>Attachment settings</Toolbox.Header>
            <Toolbox.Section>
                <VStack spacing="2">
                    <VStack spacing="1-5">
                        <Toolbox.Caption>Title</Toolbox.Caption>
                        <Input value={text} onChange={setText} placeholder="filename.png" />
                    </VStack>

                    <VStack spacing="2">
                        <Button variant="primary" fullWidth round>
                            Save
                        </Button>
                    </VStack>
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth>
                    Remove attachment
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
};
