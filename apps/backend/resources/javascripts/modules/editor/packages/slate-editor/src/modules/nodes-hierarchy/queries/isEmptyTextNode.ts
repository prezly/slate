import { TextApi, type TNode } from '@udecode/plate';

export function isEmptyTextNode(node: TNode) {
    return TextApi.isText(node) && node.text === '';
}
