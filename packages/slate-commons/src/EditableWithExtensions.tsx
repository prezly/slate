/* eslint-disable react-hooks/exhaustive-deps */
import type { FunctionComponent } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';
import { Editable } from 'slate-react';

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
    decorate?: Decorate;
    editor: Editor & ReactEditor;
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
    scrollSelectionIntoView?: (editor: Editor, domRange: globalThis.Range) => void;
    style?: React.CSSProperties;
}

export const EditableWithExtensions: FunctionComponent<Props> = ({
    decorate,
    editor,
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
    const combinedDecorate: Decorate = useMemo(
        function () {
            const decorateFns = createExtensionsDecorators(editor, extensions);
            return combineDecorate(decorate ? [decorate, ...decorateFns] : decorateFns);
        },
        [decorate, editor, extensions],
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
