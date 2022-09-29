import type { Coverage } from '@prezly/sdk';
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

    const handleSelect = useFunction((coverage: Coverage) => {
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-submitted', {
            coverage_id: coverage.id,
        });

        replacePlaceholder(editor, element, createCoverage(coverage.id));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<Coverage>
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
            BaseProps<Coverage>,
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
        renderSuggestionsFooter?: BaseProps<Coverage>['renderSuggestions'];
    }
}
