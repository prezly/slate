import { EditorCommands } from '@prezly/slate-commons';
import type { ContactNode } from '@prezly/slate-types';
import { ContactInfo, isContactNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

const SHAPE: Record<keyof ContactNode, boolean> = {
    type: true,
    uuid: true,
    reference: true,
    contact: true,
    children: true,
    show_avatar: true,
    layout: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeContactNodeAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isContactNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}

export function normalizeContactInfoAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isContactNode(node)) {
        return false;
    }
    if (isEqual(node.contact, ContactInfo.normalize(node.contact))) {
        return false;
    }

    editor.tf.setNodes<ContactNode>({ contact: ContactInfo.normalize(node.contact) }, { at: path });
    return true;
}
