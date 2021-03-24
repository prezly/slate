import { withInlineVoid } from '@prezly/slate-commons';
import React from 'react';
import { Editor, Element } from 'slate';
import { RenderElementProps } from 'slate-react';

import { MentionElement } from './components';
import MentionsExtension from './MentionsExtension';
import { MentionElementType } from './types';

export interface Example {
    id: string;
    information: string;
}

export const EXAMPLE_MENTION_TYPE = 'example';

type ExampleMentionType = typeof EXAMPLE_MENTION_TYPE;

interface ExampleMentionElementType extends MentionElementType<ExampleMentionType> {
    example: Example;
}

const isExampleElement = (element: Element): element is MentionElementType<ExampleMentionType> =>
    element.type === EXAMPLE_MENTION_TYPE;

const ExampleMentionsExtension = () =>
    MentionsExtension({
        id: 'MentionsExtension',
        normalizers: [],
        parseSerializedElement: JSON.parse,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isExampleElement(element)) {
                return (
                    <MentionElement<ExampleMentionType> attributes={attributes} element={element}>
                        {element.information}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
        type: EXAMPLE_MENTION_TYPE,
    });

const getExtensions = () => [ExampleMentionsExtension()];

export const createExampleMentionElement = (example: Example): ExampleMentionElementType => ({
    children: [{ text: '' }],
    example,
    type: EXAMPLE_MENTION_TYPE,
});

export const createMentionsEditor = (editor: Editor) => withInlineVoid(getExtensions)(editor);
