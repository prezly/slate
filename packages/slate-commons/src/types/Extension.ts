import type { Descendant, Editor, Element, Node, TextUnit } from 'slate';

import type { DataTransferHandler } from './DataTransferHandler';
import type { DecorateFactory } from './DecorateFactory';
import type { DeserializeHtml } from './DeserializeHtml';
import type { HistoryHandler } from './HistoryHandler';
import type { LineBreakHandler } from './LineBreakHandler';
import type { Normalize } from './Normalize';
import type { OnDOMBeforeInput } from './OnDOMBeforeInput';
import type { OnKeyDown } from './OnKeyDown';
import type { RenderElement } from './RenderElement';
import type { RenderLeaf } from './RenderLeaf';
import type { Serialize } from './Serialize';
import type { TextInsertionHandler } from './TextInsertionHandler';

/**
 * Extension hooks that affect <Editable> component props and thus should be triggering a React re-render.
 */
export interface EditorPropsHooks {
    decorate?: DecorateFactory;
    onDOMBeforeInput?: OnDOMBeforeInput;
    onKeyDown?: OnKeyDown;
    renderElement?: RenderElement;
    renderLeaf?: RenderLeaf;
}

/**
 * Extension hooks that affect the Editor singleton callback-based functionality, and don't require a re-render.
 */
export interface EditorMethodsHooks {
    deleteBackward?: (unit: TextUnit, next: Editor['deleteBackward']) => void;
    deleteForward?: (unit: TextUnit, next: Editor['deleteForward']) => void;
    insertBreak?: LineBreakHandler;
    /**
     * Hook into ReactEditor's `insertData()` method.
     * Call `next()` to allow other extensions (or the editor) handling the call.
     * @see https://docs.slatejs.org/libraries/slate-react/react-editor
     */
    insertData?: DataTransferHandler;
    insertText?: TextInsertionHandler;
    isInline?: (node: Node) => boolean;
    isVoid?: (node: Node) => boolean;
    normalizeNode?: Normalize | Normalize[];
    /**
     * Hook into Editor's `getFragment()` method.
     * Call `next()` to allow other extensions (or the editor) handling the call.
     * @see https://docs.slatejs.org/api/nodes/editor#getfragment-method
     */
    getFragment?: (next: () => Descendant[]) => Descendant[];
    /**
     * Hook into ReactEditor's `setFragmentData()` method.
     * Call `next()` to allow other extensions (or the editor) handling the call.
     * @see https://docs.slatejs.org/libraries/slate-react/react-editor
     */
    setFragmentData?: DataTransferHandler;

    undo?: HistoryHandler;
    redo?: HistoryHandler;
}

export interface Extension extends EditorMethodsHooks, EditorPropsHooks {
    id: string;

    deserialize?: DeserializeHtml;
    serialize?: Serialize;

    /**
     * Compare two elements.
     * `children` arrays can be omitted from the comparison,
     * as the outer code will compare them anyway.
     */
    isElementEqual?: (node: Element, another: Element) => boolean | undefined;

    isRichBlock?: (node: Node) => boolean;
}
