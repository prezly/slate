import React from 'react';

import { PlaceholderEmbed } from '#icons';

import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager } from '../PlaceholdersManager';

interface Props
    extends Omit<
        BaseProps,
        | 'icon'
        | 'title'
        | 'description'
        | 'onDrop'
        | 'inputTitle'
        | 'inputDescription'
        | 'inputPlaceholder'
        | 'inputAction'
        | 'onSubmit'
    > {
    element: PlaceholderNode;
}

export function EmbedPlaceholderElement({ children, element, ...props }: Props) {
    // const editor = useSlateStatic();

    // function processSelectedImages(images: FilePromise[]) {
    //     const placeholders = [
    //         element,
    //         ...insertPlaceholders(editor, images.length - 1, {
    //             type: PlaceholderNode.Type.IMAGE,
    //         }),
    //     ];
    //
    //     images.forEach((filePromise, i) => {
    //         const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
    //             const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
    //             const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
    //             return { file: image.toPrezlyStoragePayload(), caption };
    //         });
    //         PlaceholdersManager.register(
    //             PlaceholderNode.Type.IMAGE,
    //             placeholders[i].uuid,
    //             uploading,
    //         );
    //     });
    // }
    //
    // const handleClick = useFunction(async () => {
    //     const images = await UploadcareEditor.upload(editor, {
    //         captions: true, // FIXME
    //         imagesOnly: true,
    //         multiple: true,
    //     });
    //     processSelectedImages(images ?? []);
    // });
    //
    // const handleDrop = useFunction<DragEventHandler>((event) => {
    //     const images = Array.from(event.dataTransfer.files)
    //         .filter((file) => IMAGE_TYPES.includes(file.type))
    //         .map((file) => uploadcare.fileFrom('object', file));
    //     processSelectedImages(images);
    // });

    // const handleUploadedImage = useFunction(
    //     (data: { file: ImageNode['file']; caption: string }) => {
    //         replacePlaceholder(
    //             editor,
    //             element,
    //             createImage({
    //                 file: data.file,
    //                 children: [{ text: data.caption }],
    //             }),
    //         );
    //
    //         EventsEditor.dispatchEvent(editor, 'image-added', {
    //             description: data.caption,
    //             isPasted: false,
    //             mimeType: data.file.mime_type,
    //             size: data.file.size,
    //             uuid: data.file.uuid,
    //         });
    //     },
    // );

    // usePlaceholderManagement(PlaceholderNode.Type.IMAGE, element.uuid, {
    //     onTrigger: handleClick,
    //     onResolve: handleUploadedImage,
    // });

    return (
        <InputPlaceholderElement
            {...props}
            element={element}
            // Core
            format="card-lg"
            icon={PlaceholderEmbed}
            title="Click to insert an embed"
            description="Embed any type of web content"
            // Input
            inputTitle="Embed"
            inputDescription="Insert an embed URL and hit Enter"
            inputPlaceholder="https://media.giphy.com/GIF"
            inputAction="Add embed"
            onSubmit={(value) => {
                console.log('Submitted: ', { value });
                PlaceholdersManager.deactivateAll();
            }}
            // Callbacks
            // onClick={handleClick}
            // onDrop={handleDrop}
        >
            {children}
        </InputPlaceholderElement>
    );
}
