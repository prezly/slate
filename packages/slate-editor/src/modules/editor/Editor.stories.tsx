import type { CSSProperties } from 'react';
import React, { useState } from 'react';

import type { ExtensionConfiguration as FloatingAddMenuExtensionConfiguration } from '#extensions/floating-add-menu';
import type { PlaceholderMentionsExtensionParameters } from '#extensions/placeholder-mentions';

import { Editor } from './Editor';
import { createEmptyValue } from './lib/createEmptyValue';
import type { Value } from './types';

export default {
    title: 'Components/Editor',
    component: Editor,
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
    withAttachments?: boolean;
    withRichFormatting?: {
        menu?: boolean;
        blocks?: boolean;
        links?: boolean;
        withNewTabOption?: boolean;
    };
    withFloatingAddMenu?: FloatingAddMenuExtensionConfiguration;
}

const BaseTemplate = (args: IBaseProps) => {
    const [value, setValue] = useState<Value>(createEmptyValue());

    return (
        <Editor
            {...args}
            availableWidth={680}
            initialValue={value}
            onChange={setValue}
            placeholder="Start typing..."
        />
    );
};

export const Base = BaseTemplate.bind({}) as any;
Base.args = {
    className: '',
    withAlignmentControls: true,
    withAttachments: true,
    withAutoformat: true,
    style: { marginLeft: '3rem' },
    withCursorInView: undefined,
    withRichFormatting: {
        blocks: true,
        links: true,
        menu: true,
        withNewTabOption: undefined,
    },
    withFloatingAddMenu: {
        tooltip: {
            placement: 'left',
            content: 'Add content to your story',
        },
    },
} as IBaseProps;

const WithPlaceholdersTemplate = (
    args: IBaseProps & { withPlaceholders: PlaceholderMentionsExtensionParameters },
) => {
    const [value, setValue] = useState<Value>(createEmptyValue());

    return (
        <Editor
            {...args}
            availableWidth={680}
            initialValue={value}
            onChange={setValue}
            placeholder="Start typing..."
        />
    );
};

export const WithPlaceholders = WithPlaceholdersTemplate.bind({}) as any;
WithPlaceholders.args = {
    className: '',
    withAlignmentControls: true,
    withAttachments: true,
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
            content: 'Add content to your story',
        },
    },
    withPlaceholders: {
        placeholders: [
            {
                key: 'contact.firstname',
                text: 'First name',
            },
            {
                key: 'contact.lastname',
                text: 'Last name',
            },
            {
                key: 'contact.fullname',
                text: 'Full name',
            },
            {
                key: 'release.url',
                text: 'Link to story',
            },
            {
                key: 'release.shorturl',
                text: 'Short link to story',
            },
        ],
    },
} as IBaseProps & { withPlaceholders?: PlaceholderMentionsExtensionParameters };
