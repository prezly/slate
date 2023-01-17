import { EditorCommands } from '@prezly/slate-commons';
import type { ContactNode } from '@prezly/slate-types';
import { ContactInfo, isContactNode } from '@prezly/slate-types';
import { isEqual } from 'lodash-es';
import type { Editor, NodeEntry } from 'slate';
import { Transforms } from 'slate';

const SHAPE: Record<keyof ContactNode, boolean> = {
    type: true,
    uuid: true,
    contact: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeContactNodeAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!isContactNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}

export function normalizeContactInfoAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!isContactNode(node)) {
        return false;
    }
    if (isEqual(Object.keys(node.contact), Object.keys(ContactInfo.normalize(node.contact)))) {
        return false;
    }

    Transforms.setNodes<ContactNode>(
        editor,
        { contact: ContactInfo.normalize(node.contact) },
        { at: path },
    );
    return true;
}
