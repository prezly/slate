import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout, IMAGE_NODE_TYPE } from '@prezly/slate-types';
import type { UploadcareImageStoragePayload } from '@prezly/uploadcare';

export function createImage(
    file: UploadcareImageStoragePayload,
    {
        children = [{ text: '' }],
        href = '',
        layout = ImageLayout.CONTAINED,
        width = '100%',
    }: Partial<Omit<ImageNode, 'file' | 'type' | 'width_factor'>>,
): ImageNode {
    return {
        type: IMAGE_NODE_TYPE,
        children,
        file,
        href,
        layout,
        width,
        width_factor: '100%',
    };
}
