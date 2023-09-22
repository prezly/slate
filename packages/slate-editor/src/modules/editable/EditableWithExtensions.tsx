/* eslint-disable react-hooks/exhaustive-deps */
import type {
    Decorate,
    OnDOMBeforeInput,
    OnKeyDown,
    RenderElement,
    RenderLeaf,
} from '@prezly/slate-commons';
import { isNotUndefined } from '@technically/is-not-undefined';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import type { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';
import { Editable, useSlateSelector } from 'slate-react';

import {
    combineDecorate,
    combineOnDOMBeforeInput,
    combineOnKeyDown,
    combineRenderElement,
    combineRenderLeaf,
} from './lib';

export interface Props {
    children?: ReactNode;
    className?: string;
    decorate?: Decorate;
    editor: Editor & ReactEditor;
    onCut?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
    onDOMBeforeInput?: OnDOMBeforeInput;
    onKeyDown?: OnKeyDown;
    placeholder?: string;
    readOnly?: boolean;
    renderElement?: RenderElement;
    renderLeaf?: RenderLeaf;
    role?: string;
    style?: React.CSSProperties;
}

export function EditableWithExtensions({
    className,
    decorate,
    editor,
    onDOMBeforeInput,
    onKeyDown,
    renderElement,
    renderLeaf,
    ...props
}: Props) {
    const extensions = useSlateSelector((editor) => editor.renderHooks);

    const combinedDecorate: Decorate = useMemo(
        function () {
            const decorateHooks = extensions.map((hook) => hook.decorate?.(editor));
            return combineDecorate([decorate, ...decorateHooks].filter(isNotUndefined));
        },
        [decorate, extensions],
    );

    const combinedOnDOMBeforeInput = useMemo(() => {
        const onDOMBeforeInputHooks = extensions.map((hook) => hook.onDOMBeforeInput);
        return combineOnDOMBeforeInput(
            editor,
            [onDOMBeforeInput, ...onDOMBeforeInputHooks].filter(isNotUndefined),
        );
    }, [onDOMBeforeInput, extensions]);

    const combinedOnKeyDown = useMemo(() => {
        const onKeyDownHooks = extensions.map((hook) => hook.onKeyDown);
        return combineOnKeyDown(editor, [onKeyDown, ...onKeyDownHooks].filter(isNotUndefined));
    }, [onKeyDown, extensions]);

    const combinedRenderElement = useMemo(() => {
        const renderElementHooks = extensions.map((hook) => hook.renderElement);
        return combineRenderElement(
            editor,
            [renderElement, ...renderElementHooks].filter(isNotUndefined),
        );
    }, [renderElement, extensions]);

    const combinedRenderLeaf = useMemo(() => {
        const renderLeafHooks = extensions.map((hook) => hook.renderLeaf);
        return combineRenderLeaf([renderLeaf, ...renderLeafHooks].filter(isNotUndefined));
    }, [renderLeaf, extensions]);

    return (
        <Editable
            {...props}
            className={classNames(className, 'notranslate')}
            translate="no"
            decorate={combinedDecorate}
            onDOMBeforeInput={combinedOnDOMBeforeInput}
            onKeyDown={combinedOnKeyDown}
            renderElement={combinedRenderElement}
            renderLeaf={combinedRenderLeaf}
        />
    );
}
