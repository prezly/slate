import { Editor, Node, NodeEntry, Transforms } from 'slate';
import { v4 as uuidV4 } from 'uuid';

import { getEditorRange } from '../commands';
import { NODE_ID_MANAGER_ID_PROPERTY_NAME } from '../constants';

type Id = string;

const nodeIdManager = {
    assign: (editor: Editor, nodeEntry: NodeEntry<Node>): Id => {
        const id = uuidV4();
        const [, at] = nodeEntry;
        Transforms.setNodes(editor, { [NODE_ID_MANAGER_ID_PROPERTY_NAME]: id }, { at });
        return id;
    },

    get: (editor: Editor, id: Id): NodeEntry<Node> | undefined => {
        const at = getEditorRange(editor);

        if (!at) {
            return undefined;
        }

        const matchingNodes = Array.from(
            Editor.nodes(editor, {
                at,
                match: (node) => {
                    const anyNode = node as unknown as Record<string, unknown>;
                    return anyNode[NODE_ID_MANAGER_ID_PROPERTY_NAME] === id;
                },
                voids: true,
            }),
        );

        return matchingNodes[0];
    },

    unassign: (editor: Editor, id: Id): void => {
        const nodeEntry = nodeIdManager.get(editor, id);

        if (nodeEntry) {
            const [, at] = nodeEntry;
            Transforms.setNodes(editor, { [NODE_ID_MANAGER_ID_PROPERTY_NAME]: undefined }, { at });
        }
    },
};

export default nodeIdManager;
