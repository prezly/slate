import type { AttachmentNode } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import type { Editor } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import { Button, Input, Toolbox, VStack } from '#components';
import { Delete } from '#icons';

import { removeFileAttachment } from '../transforms';

interface Props {
    element: AttachmentNode;
    onClose: () => void;
    onEdit: (editor: Editor, element: Partial<AttachmentNode>) => void;
    onRemove: (editor: Editor, element: AttachmentNode) => void;
}

export const FileAttachmentMenu: FunctionComponent<Props> = ({
    element,
    onClose,
    onEdit,
    onRemove,
}) => {
    const editor = useSlate();
    const isSelected = useSelected();
    const [description, setDescription] = React.useState(element.description);
    const [filename, setFilename] = React.useState(getFilename(element.file.filename));
    const [isFilenameValid, setIsFilenameValid] = React.useState(true);

    const handleRemove = () => {
        const removedElement = removeFileAttachment(editor);

        if (removedElement) {
            onRemove(editor, removedElement);
        }
    };

    const save = () => {
        onEdit(editor, {
            file: {
                ...element.file,
                filename: `${filename}.${getFileExtension(element.file.filename)}`,
            },
            description: description,
        });
        onClose();
    };

    const onFilenameChanged = useCallback(
        function (value: string, isValid: boolean) {
            setFilename(value);
            setIsFilenameValid(isValid);
        },
        [],
    );

    if (!isSelected) {
        return null;
    }

    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Attachment settings
            </Toolbox.Header>
            <Toolbox.Section>
                <VStack spacing="2">
                    <VStack spacing="1-5">
                        <Toolbox.Caption>Filename</Toolbox.Caption>
                        <Input value={filename} onChange={onFilenameChanged} required />
                    </VStack>
                    <VStack spacing="1-5">
                        <Toolbox.Caption>Description</Toolbox.Caption>
                        <Input
                            value={description}
                            onChange={setDescription}
                            placeholder="Insert description"
                        />
                    </VStack>

                    <Button
                        variant="primary"
                        fullWidth
                        round
                        onClick={save}
                        disabled={!isFilenameValid}
                    >
                        Save
                    </Button>
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onClick={handleRemove}>
                    Remove attachment
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
};

function getFileExtension(filename: string) {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

function getFilename(filename: string) {
    const extension = getFileExtension(filename);
    return filename.substring(0, filename.length - extension.length - 1);
}
