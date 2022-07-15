import type { Node } from 'slate';

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
    decorate?: DecorateFactory;
    deserialize?: DeserializeHtml;
    isInline?: (node: Node) => boolean;
    isRichBlock?: (node: Node) => boolean;
    isVoid?: (node: Node) => boolean;
    normalizeNode?: Normalize | Normalize[];
    onDOMBeforeInput?: OnDOMBeforeInput;
    onKeyDown?: OnKeyDown | null;
    renderElement?: RenderElement;
    renderLeaf?: RenderLeaf;
    serialize?: Serialize;
    withOverrides?: WithOverrides;
}
