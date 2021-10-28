import { ElementNode } from '@prezly/slate-types';
import { Editor, Element, ElementEntry, Transforms } from 'slate';

import makeDirty from './makeDirty';

type Options =
    | {
          allowedParentTypes: Element['type'][];
      }
    | {
          disallowedParentTypes: Element['type'][];
      };

const isParentTypeAllowed = (options: Options, parentType: Element['type']): boolean => {
    if ('allowedParentTypes' in options) {
        return options.allowedParentTypes.includes(parentType);
    }

    return !options.disallowedParentTypes.includes(parentType);
};

const normalizeNestedElement = (
    editor: Editor,
    [element, path]: ElementEntry,
    options: Options,
): boolean => {
    const ancestor = Editor.above(editor, { at: path });
    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode) || isParentTypeAllowed(options, ancestorNode.type)) {
        return false;
    }

    makeDirty(editor, path);

    if (
        Editor.isInline(editor, element) ||
        Editor.isVoid(editor, element) ||
        ancestorNode.type === (element as ElementNode).type
    ) {
        if (ancestorNode.children.length === 1) {
            Transforms.unwrapNodes(editor, { at: ancestorPath, voids: true });
        } else {
            Transforms.liftNodes(editor, { at: path, voids: true });
        }
    } else {
        Transforms.unwrapNodes(editor, { at: path });
    }

    return true;
};

export default normalizeNestedElement;
