import type { Events } from '@prezly/events';
import type { PlatePlugin } from '@udecode/plate-common/react';

import { EventsPlugin, type EditorEventMap } from '#modules/events';

type Parameters = {
    events: Events<EditorEventMap>;
};

export function* getEnabledPlugins(parameters: Parameters): Generator<PlatePlugin> {
    const { events } = parameters;

    yield EventsPlugin(events);
}
