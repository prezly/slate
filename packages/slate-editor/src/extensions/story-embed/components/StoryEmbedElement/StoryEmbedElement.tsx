import type { StoryEmbedNode } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

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
    const editor = useSlateStatic();

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
            overlay="always"
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
