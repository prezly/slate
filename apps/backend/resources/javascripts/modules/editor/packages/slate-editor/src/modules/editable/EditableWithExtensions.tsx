/* eslint-disable react-hooks/exhaustive-deps */
import type {
    Decorate,
    Extension,
    OnKeyDown,
    RenderElement,
    RenderLeaf,
} from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate';
import { PlateContent } from '@udecode/plate/react';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';

import {
    combineDecorate,
    combineOnKeyDown,
    combineRenderElement,
    combineRenderLeaf,
    createExtensionsDecorators,
} from './lib';

export interface Props {
    className?: string;
    decorate?: Decorate;
    editor: SlateEditor;
    /**
     * Each extension fields will be combined by role.
     *
     * To render `Editable`:
     * - decorate
     * - renderElement
     * - renderLeaf
     * - onDOMBeforeInput
     * - onKeyDown.ts
     */
    extensions?: Extension[];
    onCut?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
    onDOMBeforeInput?: (event: InputEvent) => void;
    /**
     * Handlers when we press a key
     */
    onKeyDown?: OnKeyDown[];
    // Dependencies of `onKeyDown.ts`
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

export function EditableWithExtensions({
    className,
    decorate,
    editor,
    extensions = [],
    onDOMBeforeInput,
    onKeyDown: onKeyDownList = [],
    onKeyDownDeps = [],
    renderElement: renderElementList = [],
    renderElementDeps = [],
    renderLeaf: renderLeafList = [],
    renderLeafDeps = [],
    ...props
}: Props) {
    const combinedDecorate: Decorate = useMemo(
        function () {
            const decorateFns = createExtensionsDecorators(editor, extensions);
            return combineDecorate(decorate ? [decorate, ...decorateFns] : decorateFns);
        },
        [decorate, editor, extensions],
    );
    const combinedOnKeyDown = useCallback(
        combineOnKeyDown(editor, extensions, onKeyDownList),
        onKeyDownDeps,
    );
    const combinedRenderElement = useMemo(
        () => combineRenderElement(editor, extensions, renderElementList),
        renderElementDeps,
    );
    const combinedRenderLeaf = useCallback(
        combineRenderLeaf(extensions, renderLeafList),
        renderLeafDeps,
    );

    return (
        <PlateContent
            {...props}
            className={classNames(className, 'notranslate')}
            translate="no"
            decorate={combinedDecorate}
            onDOMBeforeInput={onDOMBeforeInput}
            onKeyDown={combinedOnKeyDown}
            renderElement={combinedRenderElement}
            renderLeaf={combinedRenderLeaf}
        />
    );
}
