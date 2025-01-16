import type { StoryEmbedNode } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import { useEditorRef } from '@udecode/plate/react';
import type { FunctionComponent } from 'react';
import React from 'react';

import { EditorBlock } from '#components';

import { removeStoryEmbed, updateStoryEmbed } from '../../transforms';
import type { StoryEmbedExtensionParameters } from '../../types';

interface Props extends RenderElementProps {
    element: StoryEmbedNode;
    render: StoryEmbedExtensionParameters['render'];
}

export const StoryEmbedElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    render,
}) => {
    const editor = useEditorRef();

    function onChange(props: Partial<Pick<StoryEmbedNode, 'appearance' | 'position'>>) {
        updateStoryEmbed(editor, props);
    }

    function onRemove() {
        removeStoryEmbed(editor);
    }

    return (
        <EditorBlock
            {...attributes} // contains `ref`
            element={element}
            layout="full-width"
            overlay="always"
            overflow="visible"
            renderMenu={undefined}
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) =>
                render({
                    isSelected,
                    element,
                    onChange,
                    onRemove,
                })
            }
            void
        />
    );
};
