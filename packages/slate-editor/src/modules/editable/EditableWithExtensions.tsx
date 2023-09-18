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
    const extensions = useSlateSelector((editor) => editor.extensions);

    const combinedDecorate: Decorate = useMemo(
        function () {
            const decorateExtensions = extensions.map((extension) => extension.decorate?.(editor));
            return combineDecorate([decorate, ...decorateExtensions].filter(isNotUndefined));
        },
        [decorate, extensions],
    );

    const combinedOnDOMBeforeInput = useMemo(() => {
        const onDOMBeforeInputExtensions = extensions.map(
            (extension) => extension.onDOMBeforeInput,
        );
        return combineOnDOMBeforeInput(
            editor,
            [onDOMBeforeInput, ...onDOMBeforeInputExtensions].filter(isNotUndefined),
        );
    }, [onDOMBeforeInput, extensions]);

    const combinedOnKeyDown = useMemo(() => {
        const onKeyDownExtensions = extensions.map((extension) => extension.onKeyDown);
        return combineOnKeyDown(editor, [onKeyDown, ...onKeyDownExtensions].filter(isNotUndefined));
    }, [onKeyDown, extensions]);

    const combinedRenderElement = useMemo(() => {
        const renderElementExtensions = extensions.map((extension) => extension.renderElement);
        return combineRenderElement(
            editor,
            [renderElement, ...renderElementExtensions].filter(isNotUndefined),
        );
    }, [renderElement, extensions]);

    const combinedRenderLeaf = useMemo(() => {
        const renderLeafExtensions = extensions.map((extension) => extension.renderLeaf);
        return combineRenderLeaf([renderLeaf, ...renderLeafExtensions].filter(isNotUndefined));
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
