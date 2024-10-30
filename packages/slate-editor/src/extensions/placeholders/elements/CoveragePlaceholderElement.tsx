import type { CoverageNode } from '@prezly/slate-types';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import type { ReactElement } from 'react';
import React, { type DragEvent, useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';

import { Button, SearchInput } from '#components';
import { PlaceholderCoverage, Upload } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import { createCoverage } from '#extensions/coverage';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { InputPlaceholder } from '../components/InputPlaceholder';
import { withLoadingDots } from '../components/LoadingDots';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

import styles from './CoveragePlaceholderElement.module.scss';

type Url = string;
type CoverageRef = Pick<CoverageNode, 'coverage'>;
type Mode = 'search' | 'create';
type ModeSetter = (mode: Mode) => void;

export function CoveragePlaceholderElement({
    children,
    element,
    format = 'card',
    getSuggestions,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    onCreateCoverage,
    ...props
}: CoveragePlaceholderElement.Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();
    const [mode, setMode] = useState<Mode>('search');
    const onMode = setMode;

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleUpload = useFunction(async () => {
        const files = await UploadcareEditor.upload(editor, { multiple: false });
        if (!files) {
            return;
        }

        setMode('search');
        const uploading = toProgressPromise(files[0]).then(async (fileInfo: PrezlyFileInfo) => {
            const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
            const ref = await onCreateCoverage(file);

            return { coverage: { id: ref.coverage.id } };
        });
        PlaceholdersManager.register(element.type, element.uuid, uploading);
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

    const handleSubmitUrl = useFunction((input: string) => {
        setMode('search');

        const loading = (async () => {
            const ref = await onCreateCoverage(input);
            return { coverage: { id: ref.coverage.id } };
        })();

        PlaceholdersManager.register(element.type, element.uuid, loading);
    });

    const handleDragOver = useFunction(() => {
        setMode('search');
    });

    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
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
            format={format}
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
                        autoFocus
                        format="card"
                        selected={isSelected}
                        title="Log new coverage"
                        description="Paste a coverage URL or upload a coverage file (you can also drop it here)."
                        placeholder="www.website.com/article"
                        pattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
                        action="Add coverage"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onEsc={() => PlaceholdersManager.deactivate(element)}
                        onRemove={handleRemove}
                        onSubmit={handleSubmitUrl}
                    >
                        <div className={styles.Action}>
                            <Button
                                className={styles.Button}
                                icon={Upload}
                                onClick={handleUpload}
                                variant="underlined"
                            >
                                Upload a coverage file
                            </Button>
                        </div>
                    </InputPlaceholder>
                ) : undefined
            }
            inputTitle="Coverage"
            inputDescription="Select coverage to insert"
            inputPlaceholder="Search for coverage"
            onDrop={handleDrop}
            onSelect={(_, entry) => handleSelect(entry)}
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
