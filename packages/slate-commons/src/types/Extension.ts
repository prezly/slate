import Decorate from './Decorate';
import DeserializeHtml from './DeserializeHtml';
import Normalize from './Normalize';
import OnDOMBeforeInput from './OnDOMBeforeInput';
import OnKeyDown from './OnKeyDown';
import RenderElement from './RenderElement';
import RenderLeaf from './RenderLeaf';

export default interface Extension {
    decorate?: Decorate;
    deserialize?: DeserializeHtml;
    id: string;
    inlineTypes?: string[];
    normalizers?: Normalize[];
    onDOMBeforeInput?: OnDOMBeforeInput;
    onKeyDown?: OnKeyDown | null;
    renderElement?: RenderElement;
    renderLeaf?: RenderLeaf;
    /**
     * Array of types of elements that can appear ONLY at the root of the editor value.
     * If they appear somewhere deeper, nested (e.g. when pasting content from various sources)
     * they will be lifted up to the root of the editor.
     */
    rootTypes?: string[];
    voidTypes?: string[];
}
