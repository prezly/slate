import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

import { GalleryTile, type Props } from './GalleryTile';

export function SortableGalleryTile({ id, ...props }: Props & { id: UniqueIdentifier }) {
    const { active, attributes, isDragging, listeners, over, setNodeRef } = useSortable({ id });
    const withDropOverlay = active?.id !== id && over?.id === id;

    return (
        <GalleryTile
            {...props}
            clone={isDragging}
            ref={setNodeRef}
            withDropOverlay={withDropOverlay}
            {...attributes}
            {...listeners}
        />
    );
}
