import type { Element, Node } from 'slate';

import type { DecorateFactory } from './DecorateFactory';
import type { DeserializeHtml } from './DeserializeHtml';
import type { Normalize } from './Normalize';
import type { OnDOMBeforeInput } from './OnDOMBeforeInput';
import type { OnKeyDown } from './OnKeyDown';
import type { RenderElement } from './RenderElement';
import type { RenderLeaf } from './RenderLeaf';
import type { Serialize } from './Serialize';
import type { WithOverrides } from './WithOverrides';

export interface Extension {
    id: string;
    decorate?: DecorateFactory; // OK
    deserialize?: DeserializeHtml;
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
    withOverrides?: WithOverrides;
}
