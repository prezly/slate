import type { CoverageNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderCoverage } from '#icons';
import { useFunction } from '#lib';

import { createCoverage } from '#extensions/coverage';
import { EventsEditor } from '#modules/events';

import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

type CoverageRef = Pick<CoverageNode, 'coverage'>;

export function CoveragePlaceholderElement({
    children,
    element,
    getSuggestions,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: CoveragePlaceholderElement.Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((data: CoverageRef) => {
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-submitted', {
            coverage_id: data.coverage.id,
        });

        replacePlaceholder(editor, element, createCoverage(data.coverage.id));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<CoverageRef>
            {...props}
            element={element}
            // Core
            format="card"
            icon={PlaceholderCoverage}
            title="Click to insert coverage"
            description="Add your Prezly coverage"
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
    }
}
