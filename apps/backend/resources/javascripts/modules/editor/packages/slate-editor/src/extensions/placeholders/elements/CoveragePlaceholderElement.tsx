import type { ProgressPromise } from '@prezly/progress-promise';
import type { CoverageNode } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareFile } from '@prezly/uploadcare';
import type { UploadInfo } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import { useEditorRef } from '@udecode/plate-common/react';
import type { ReactNode } from 'react';
import React, { type DragEvent } from 'react';
import { useSelected } from 'slate-react';

import { PlaceholderCoverage } from '#icons';
import { useFunction } from '#lib';

import { createCoverage } from '#extensions/coverage';
import { EventsEditor } from '#modules/events';

import { withLoadingDots } from '../components/LoadingDots';
import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder, useCustomRendered } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

type CoverageRef = Pick<CoverageNode, 'coverage'>;

export function CoveragePlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    onCreateCoverage,
    removable,
    renderPlaceholder,
}: CoveragePlaceholderElement.Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();
    const [isCustomRendered, setCustomRendered] = useCustomRendered(isSelected);

    const handleUpload = useFunction(
        (promise: Promise<CoverageRef> | ProgressPromise<CoverageRef, UploadInfo>) => {
            setCustomRendered(false);
            PlaceholdersManager.register(element.type, element.uuid, promise);
        },
    );

    const handleDragOver = useFunction(() => {
        setCustomRendered(false);
    });

    const handleDrop = useFunction((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const [file] = Array.from(event.dataTransfer.files)
            .slice(0, 1)
            .map((file) => uploadcare.fileFrom('object', file));

        if (file) {
            const uploading = toProgressPromise(file).then(async (fileInfo: PrezlyFileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const ref = await onCreateCoverage(file);
                return { coverage: { id: ref.coverage.id } };
            });
            PlaceholdersManager.register(element.type, element.uuid, uploading);
        }
    });

    const handleSelect = useFunction((data: CoverageRef) => {
        EventsEditor.dispatchEvent(editor, 'coverage-placeholder-submitted', {
            coverage: { id: data.coverage.id },
        });

        replacePlaceholder(editor, element, createCoverage(data.coverage.id), {
            select: isSelected,
        });
    });

    const handleRemove = useFunction(() => {
        editor.removeNodes({ at: [], match: (node) => node === element });
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onResolve: handleSelect,
    });

    return (
        <PlaceholderElement
            attributes={attributes}
            element={element}
            format={format}
            icon={PlaceholderCoverage}
            title={Title}
            description={Description}
            onClick={() => setCustomRendered(true)}
            onDrop={handleDrop}
            removable={removable}
            renderFrame={
                isCustomRendered
                    ? () =>
                          renderPlaceholder({
                              onDragOver: handleDragOver,
                              onRemove: removable ? handleRemove : undefined,
                              onSelect: handleSelect,
                              onUpload: handleUpload,
                              placeholder: element,
                          })
                    : undefined
            }
        >
            {children}
        </PlaceholderElement>
    );
}

export namespace CoveragePlaceholderElement {
    export interface Props
        extends Pick<BaseProps<CoverageRef>, 'attributes' | 'children' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.COVERAGE>;
        onCreateCoverage(input: UploadcareFile): Promise<CoverageRef>;
        renderPlaceholder: (props: {
            onDragOver: () => void;
            onRemove: (() => void) | undefined;
            onSelect: (data: CoverageRef) => void;
            onUpload: (
                promise: Promise<CoverageRef> | ProgressPromise<CoverageRef, UploadInfo>,
            ) => void;
            placeholder: PlaceholderNode;
        }) => ReactNode;
    }
}

function Title(props: { isDragOver: boolean; isLoading: boolean }) {
    if (props.isLoading) {
        return <>{withLoadingDots('Uploading coverage')}</>;
    }
    if (props.isDragOver) {
        return <>Drop a file here</>;
    }
    return <>Click to insert coverage</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Add your Prezly coverage</>;
}
