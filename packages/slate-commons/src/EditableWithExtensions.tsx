/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react';
import { Editable, useSlate } from 'slate-react';

import {
    decorateExtensions,
    onDOMBeforeInputExtensions,
    onKeyDownExtensions,
    renderElementExtensions,
    renderLeafExtensions,
} from './lib';
import {
    Decorate,
    Extension,
    OnDOMBeforeInput,
    OnKeyDown,
    RenderElement,
    RenderLeaf,
} from './types';

export interface Props {
    /**
     * Decorations are another type of text-level formatting.
     * They are similar to regular old custom properties,
     * except each one applies to a Range of the document instead of being
     * associated with a given text node.
     * However, decorations are computed at render-time based on the content itself.
     * This is helpful for dynamic formatting like syntax highlighting or search
     * keywords, where changes to the content (or some external data) has the
     * potential to change the formatting.
     */
    decorate?: Decorate[];
    // Dependencies of `decorate`
    decorateDeps?: any[];
    /**
     * Each extension fields will be combined by role.
     *
     * To render `Editable`:
     * - decorate
     * - renderElement
     * - renderLeaf
     * - onDOMBeforeInput
     * - onKeyDown
     */
    extensions?: Extension[];
    onCut?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
    onDOMBeforeInput?: OnDOMBeforeInput[];
    // Dependencies of `onDOMBeforeInput`
    onDOMBeforeInputDeps?: any[];
    /**
     * Handlers when we press a key
     */
    onKeyDown?: OnKeyDown[];
    // Dependencies of `onKeyDown`
    onKeyDownDeps?: any[];
    placeholder?: string;
    readOnly?: boolean;
    /**
     * To customize the rendering of each element components.
     * Element properties are for contiguous, semantic elements in the document.
     */
    renderElement?: RenderElement[];
    // Dependencies of `renderElement`
    renderElementDeps?: any[];
    /**
     * To customize the rendering of each leaf.
     * When text-level formatting is rendered, the characters are grouped into
     * "leaves" of text that each contain the same formatting applied to them.
     * Text properties are for non-contiguous, character-level formatting.
     */
    renderLeaf?: RenderLeaf[];
    // Dependencies of `renderLeaf`
    renderLeafDeps?: any[];
    role?: string;
    style?: React.CSSProperties;
}

const EditableWithExtensions: FunctionComponent<Props> = ({
    decorate: decorateList = [],
    decorateDeps = [],
    extensions = [],
    onDOMBeforeInput: onDOMBeforeInputList = [],
    onDOMBeforeInputDeps = [],
    onKeyDown: onKeyDownList = [],
    onKeyDownDeps = [],
    renderElement: renderElementList = [],
    renderElementDeps = [],
    renderLeaf: renderLeafList = [],
    renderLeafDeps = [],
    ...props
}) => {
    const editor = useSlate();

    return (
        <Editable
            {...props}
            decorate={useCallback(decorateExtensions(extensions, decorateList), decorateDeps)}
            onDOMBeforeInput={useCallback(
                onDOMBeforeInputExtensions(editor, extensions, onDOMBeforeInputList),
                onDOMBeforeInputDeps,
            )}
            onKeyDown={useCallback(
                onKeyDownExtensions(editor, extensions, onKeyDownList),
                onKeyDownDeps,
            )}
            renderElement={useCallback(
                renderElementExtensions(extensions, renderElementList),
                renderElementDeps,
            )}
            renderLeaf={useCallback(
                renderLeafExtensions(extensions, renderLeafList),
                renderLeafDeps,
            )}
        />
    );
};

export default EditableWithExtensions;
