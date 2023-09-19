import { useRegisterExtension } from '@prezly/slate-commons';
import React from 'react';

import type { Props as RichFormattingMenuProps } from './RichFormattingMenu';
import { RichFormattingMenu } from './RichFormattingMenu';

export const EXTENSION_ID = 'RichFormattingMenuExtension';

export type Parameters = RichFormattingMenuProps;

export function RichFormattingMenuExtension({
    availableWidth,
    containerElement,
    defaultAlignment,
    withAlignment,
    withBlockquotes,
    withHeadings,
    withInlineLinks,
    withLists,
    withNewTabOption,
    withParagraphs,
}: Parameters) {
    useRegisterExtension({
        id: EXTENSION_ID,
    });

    return (
        <RichFormattingMenu
            availableWidth={availableWidth}
            containerElement={containerElement}
            defaultAlignment={defaultAlignment}
            withAlignment={withAlignment}
            withBlockquotes={withBlockquotes}
            withHeadings={withHeadings}
            withInlineLinks={withInlineLinks}
            withLists={withLists}
            withNewTabOption={withNewTabOption}
            withParagraphs={withParagraphs}
        />
    );
}
