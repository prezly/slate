import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

import { GalleryTile, type Props } from './GalleryTile';

export function SortableGalleryTile({
    getIndex,
    id,
    ...props
}: Props & { getIndex: (id: UniqueIdentifier) => number; id: UniqueIdentifier }) {
    const { active, attributes, isDragging, listeners, over, setNodeRef } = useSortable({ id });

    let insertPosition: 'before' | 'after' | undefined = undefined;
    if (active && active.id !== id && over && over.id === id) {
        const activeIndex = getIndex(active.id);
        const index = getIndex(id);
        insertPosition = activeIndex > index ? 'before' : 'after';
    }

    return (
        <GalleryTile
            {...props}
            active={isDragging}
            insertPosition={insertPosition}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        />
    );
}
