import type { CoverageNode } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import React, { type DragEvent } from 'react';
import { useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderCoverage } from '#icons';
import { useFunction } from '#lib';

import { createCoverage } from '#extensions/coverage';
import { EventsEditor } from '#modules/events';

import { withLoadingDots } from '../components/LoadingDots';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

type Url = string;
type CoverageRef = Pick<CoverageNode, 'coverage'>;

export function CoveragePlaceholderElement({
    children,
    element,
    getSuggestions,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    onCreateCoverage,
    ...props
}: CoveragePlaceholderElement.Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
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
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-submitted', {
            coverage_id: data.coverage.id,
        });

        replacePlaceholder(editor, element, createCoverage(data.coverage.id));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onResolve: handleSelect,
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<CoverageRef>
            {...props}
            element={element}
            // Core
            format="card"
            icon={PlaceholderCoverage}
            title={Title}
            description={Description}
            // Input
            getSuggestions={getSuggestions}
            renderEmpty={renderEmpty}
            renderSuggestion={renderSuggestion}
            renderSuggestions={(props) => (
                <SearchInput.Suggestions
                    activeElement={props.activeElement}
                    query={props.query}
                    suggestions={props.suggestions}
                    footer={renderSuggestionsFooter?.(props)}
                >
                    {props.children}
                </SearchInput.Suggestions>
            )}
            inputTitle="Coverage"
            inputDescription="Select coverage to insert"
            inputPlaceholder="Search for coverage"
            onDrop={handleDrop}
            onSelect={handleSelect}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace CoveragePlaceholderElement {
    export interface Props
        extends Omit<
            BaseProps<CoverageRef>,
            | 'onSelect'
            | 'icon'
            | 'title'
            | 'description'
            | 'inputTitle'
            | 'inputDescription'
            | 'inputPlaceholder'
            | 'renderSuggestions'
        > {
        element: PlaceholderNode<PlaceholderNode.Type.COVERAGE>;
        renderSuggestionsFooter?: BaseProps<CoverageRef>['renderSuggestions'];
        onCreateCoverage(input: Url | UploadcareFile): Promise<CoverageRef>;
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
