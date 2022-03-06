/* eslint-disable react-hooks/exhaustive-deps */
import type { FunctionComponent } from 'react';
import React, { useCallback, useMemo } from 'react';
import { Editable, useSlateStatic } from 'slate-react';

import {
    combineDecorate,
    createExtensionsDecorators,
    onDOMBeforeInputExtensions,
    onKeyDownExtensions,
    renderElementExtensions,
    renderLeafExtensions,
} from './lib';
import type {
    Decorate,
    Extension,
    OnDOMBeforeInput,
    OnKeyDown,
    RenderElement,
    RenderLeaf,
} from './types';

export interface Props {
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

export const EditableWithExtensions: FunctionComponent<Props> = ({
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
    const editor = useSlateStatic();

    const combinedDecorate: Decorate = useMemo(
        function () {
            const decorateFns = createExtensionsDecorators(editor, extensions);
            return combineDecorate(decorateFns);
        },
        [editor, extensions],
    );

    return (
        <Editable
            {...props}
            decorate={combinedDecorate}
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
