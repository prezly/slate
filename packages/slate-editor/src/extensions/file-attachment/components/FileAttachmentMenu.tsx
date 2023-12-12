import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import { UploadcareFile } from '@prezly/uploadcare';
import React, { useCallback } from 'react';
import type { Editor } from 'slate';
import { Transforms } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import { Button, Input, Toolbox, VStack } from '#components';
import { Delete } from '#icons';

import { removeFileAttachment } from '../transforms';

interface Props {
    element: AttachmentNode;
    onClose: () => void;
    onEdited: (editor: Editor, updated: AttachmentNode) => void;
    onRemoved: (editor: Editor, element: AttachmentNode) => void;
}

export function FileAttachmentMenu({ element, onClose, onEdited, onRemoved }: Props) {
    const editor = useSlate();
    const isSelected = useSelected();
    const [description, setDescription] = React.useState(element.description);
    const [filename, setFilename] = React.useState(getFilename(element.file.filename));
    const [isFilenameValid, setIsFilenameValid] = React.useState(true);

    const handleRemove = () => {
        const removedElement = removeFileAttachment(editor);

        if (removedElement) {
            onRemoved(editor, removedElement);
        }
    };

    const handleUpdate = () => {
        const update = {
            // Note: I'm not sure why we need to re-hydrate and re-serialize the file here.
            //       It was added by Dmitry in https://github.com/prezly/slate/pull/386
            file: UploadcareFile.createFromPrezlyStoragePayload({
                ...element.file,
                filename: `${filename}.${getFileExtension(element.file.filename)}`,
            }).toPrezlyStoragePayload(),
            description,
        };

        Transforms.setNodes<AttachmentNode>(editor, update, {
            match: isAttachmentNode,
        });

        onEdited(editor, { ...element, ...update });
        onClose();
    };

    const onFilenameChanged = useCallback(function (value: string, isValid: boolean) {
        setFilename(value);
        setIsFilenameValid(isValid);
    }, []);

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
                        onClick={handleUpdate}
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
}

function getFileExtension(filename: string) {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

function getFilename(filename: string) {
    const extension = getFileExtension(filename);
    return filename.substring(0, filename.length - extension.length - 1);
}
