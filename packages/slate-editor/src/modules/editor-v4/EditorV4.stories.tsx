// eslint-disable-next-line import/no-extraneous-dependencies
import { createEmptyValue } from '@prezly/slate-editor';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';

import type { FileAttachmentExtensionParameters } from '#modules/editor-v4-file-attachment';
import type { Settings as FloatingAddMenuExtensionParameters } from '#modules/editor-v4-floating-add-menu';

import EditorV4 from './EditorV4';
import type { Value } from './types';

export default {
    title: 'Components/Editor',
    component: EditorV4,
};

interface IBaseProps {
    className: string;
    style: CSSProperties;
    withAlignmentControls: boolean;
    withAutoformat: boolean;
    withCursorInView?: {
        minBottom: number;
        minTop: number;
    };
    withAttachments?: FileAttachmentExtensionParameters;
    withRichFormatting?: {
        menu?: boolean;
        blocks?: boolean;
        links?: boolean;
    };
    withFloatingAddMenu?: FloatingAddMenuExtensionParameters;
}

const BaseTemplate = (args: IBaseProps) => {
    const [value, setValue] = useState<Value>(createEmptyValue());

    return (
        <EditorV4
            {...args}
            placeholder="Start typing..."
            availableWidth={680}
            onChange={setValue}
            value={value}
        />
    );
};

export const Base = BaseTemplate.bind({}) as any;
Base.args = {
    className: '',
    withAlignmentControls: true,
    withAutoformat: true,
    style: { marginLeft: '3rem' },
    withCursorInView: undefined,
    withRichFormatting: {
        blocks: true,
        links: true,
        menu: true,
    },
    withFloatingAddMenu: {
        tooltip: {
            placement: 'left',
            title: 'Add content to your story',
        },
    },
    withAttachments: {
        styled: true,
    },
} as IBaseProps;
