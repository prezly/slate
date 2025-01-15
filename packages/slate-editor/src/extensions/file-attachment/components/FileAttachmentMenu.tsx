import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import { UploadcareFile } from '@prezly/uploadcare';
import type { SlateEditor } from '@udecode/plate';
import { useEditorRef, useSelected } from '@udecode/plate/react';
import React, { useCallback } from 'react';

import { Button, Input, Toolbox, VStack } from '#components';
import { Delete } from '#icons';

import { removeFileAttachment } from '../transforms';

interface Props {
    element: AttachmentNode;
    onEdited: (editor: SlateEditor, updated: AttachmentNode) => void;
    onRemoved: (editor: SlateEditor, element: AttachmentNode) => void;
}

export function FileAttachmentMenu({ element, onEdited, onRemoved }: Props) {
    const editor = useEditorRef();
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

        editor.tf.setNodes<AttachmentNode>(update, {
            match: isAttachmentNode,
        });

        onEdited(editor, { ...element, ...update });
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
            <Toolbox.Header>Attachment settings</Toolbox.Header>
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
                        size="small"
                        onClick={handleUpdate}
                        disabled={!isFilenameValid}
                    >
                        Save
                    </Button>
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear" icon={Delete} fullWidth onClick={handleRemove}>
                    Remove
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
