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

export interface Extension {
    id: string;
    decorate?: DecorateFactory; // OK
    deleteBackward?: (unit: TextUnit, next: Editor['deleteBackward']) => void;
    deleteForward?: (unit: TextUnit, next: Editor['deleteForward']) => void;
    deserialize?: DeserializeHtml; // OK
    insertBreak?: LineBreakHandler;
    /**
     * Hook into ReactEditor's `insertData()` method.
     * Call `next()` to allow other extensions (or the editor) handling the call.
     * @see https://docs.slatejs.org/libraries/slate-react/react-editor
     */
    insertData?: DataTransferHandler; // OK
    insertText?: TextInsertionHandler; // OK
    /**
     * Compare two elements.
     * `children` arrays can be omitted from the comparison,
     * as the outer code will compare them anyway.
     */
    isElementEqual?: (node: Element, another: Element) => boolean | undefined;
    isInline?: (node: Node) => boolean; // OK
    isRichBlock?: (node: Node) => boolean; // OK
    isVoid?: (node: Node) => boolean; // OK
    normalizeNode?: Normalize | Normalize[]; // OK
    onDOMBeforeInput?: OnDOMBeforeInput; // OK
    onKeyDown?: OnKeyDown; // OK
    renderElement?: RenderElement; // OK
    renderLeaf?: RenderLeaf; // OK
    serialize?: Serialize; // OK

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
