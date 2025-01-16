import type { Events } from '@prezly/events';
import type { PlatePlugin } from '@udecode/plate/react';
import { AutoformatPlugin } from '@udecode/plate-autoformat/react';

import { EventsPlugin, type EditorEventMap } from '#modules/events';

import {
    BLOCKQUOTE_RULES,
    CALLOUT_RULES,
    COMPOSITE_CHARACTERS_RULES,
    DIVIDER_RULES,
    HEADING_RULES,
    LIST_RULES,
    TEXT_STYLE_RULES,
} from './autoformatRules';
import type { EditorProps } from './types';

type Parameters = {
    events: Events<EditorEventMap>;
} & Pick<
    Required<EditorProps>,
    | 'withAutoformat'
    | 'withBlockquotes'
    | 'withCallouts'
    | 'withDivider'
    | 'withHeadings'
    | 'withLists'
    | 'withTextStyling'
>;

export function* getEnabledPlugins(parameters: Parameters): Generator<PlatePlugin> {
    const {
        events,
        withAutoformat,
        withBlockquotes,
        withCallouts,
        withDivider,
        withHeadings,
        withLists,
        withTextStyling,
    } = parameters;

    yield EventsPlugin(events);

    if (withAutoformat) {
        const defaultRules = [
            ...(withBlockquotes ? BLOCKQUOTE_RULES : []),
            ...(withCallouts ? CALLOUT_RULES : []),
            ...(withDivider ? DIVIDER_RULES : []),
            ...(withHeadings ? HEADING_RULES : []),
            ...(withLists ? LIST_RULES : []),
            ...(withTextStyling ? TEXT_STYLE_RULES : []),
            ...COMPOSITE_CHARACTERS_RULES,
        ];
        const rules = withAutoformat === true ? defaultRules : withAutoformat.rules;
        const plugin = AutoformatPlugin.configure({
            options: {
                rules,
            },
        });

        yield plugin;
    }
}
