import type { CoverageNode } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import type { ReactElement } from 'react';
import React, { type DragEvent, useEffect, useState } from 'react';
import { useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderCoverage } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createCoverage } from '#extensions/coverage';
import { EventsEditor } from '#modules/events';

import { InputPlaceholder } from '../components/InputPlaceholder';
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
type Mode = 'search' | 'create';
type ModeSetter = (mode: Mode) => void;

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
    const [mode, setMode] = useState<Mode>('search');
    const onMode = setMode;

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

    const handleSubmitUrl = useFunction((input: string) => {
        setMode('search');

        const loading = (async () => {
            const ref = await onCreateCoverage(input);
            return { coverage: { id: ref.coverage.id } };
        })();

        PlaceholdersManager.register(element.type, element.uuid, loading);
    });

    const { isActive } = usePlaceholderManagement(element.type, element.uuid, {
        onResolve: handleSelect,
        onTrigger: handleTrigger,
    });

    useEffect(() => {
        if (!isActive && mode === 'create') {
            setMode('search');
        }
    }, [isActive]);

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
            renderEmpty={(props) => renderEmpty?.({ ...props, onMode }) ?? null}
            renderSuggestion={(props) => renderSuggestion?.({ ...props, onMode }) ?? null}
            renderSuggestions={(props) => (
                <SearchInput.Suggestions
                    activeElement={props.activeElement}
                    query={props.query}
                    suggestions={props.suggestions}
                    footer={renderSuggestionsFooter?.({ ...props, onMode })}
                >
                    {props.children}
                </SearchInput.Suggestions>
            )}
            renderFrame={() =>
                mode === 'create' ? (
                    <InputPlaceholder
                        title="Coverage"
                        description="Type the URL of the new Coverage you want to add"
                        placeholder="www.website.com/article"
                        pattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
                        action="Add coverage"
                        onSubmit={handleSubmitUrl}
                    />
                ) : undefined
            }
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
            | 'renderEmpty'
            | 'renderSuggestion'
            | 'renderSuggestions'
        > {
        element: PlaceholderNode<PlaceholderNode.Type.COVERAGE>;

        // SearchInput
        renderEmpty?: (
            props: SearchInput.Props.Empty & { placeholder: PlaceholderNode; onMode: ModeSetter },
        ) => ReactElement | null;

        renderSuggestion?: (
            props: SearchInput.Props.Option<CoverageRef> & {
                placeholder: PlaceholderNode;
                onMode: ModeSetter;
            },
        ) => ReactElement | null;

        renderSuggestionsFooter?: (
            props: SearchInput.Props.Suggestions<CoverageRef> & {
                placeholder: PlaceholderNode;
                onMode: ModeSetter;
            },
        ) => ReactElement | null;

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
