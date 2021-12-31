import { useMemo } from 'react';

import type { Option } from '../../modules/editor-v4-mentions';
import { useMentions } from '../../modules/editor-v4-mentions';

import { createPlaceholderMention } from './lib';
import type { Placeholder, PlaceholderMentionsExtensionParameters } from './types';

function placeholderToOption(placeholder: Placeholder): Option<Placeholder> {
    return {
        id: placeholder.key,
        label: placeholder.text,
        value: placeholder,
    };
}

const DEFAULT_PARAMETERS: PlaceholderMentionsExtensionParameters = { placeholders: [] };

function usePlaceholderMentions({
    placeholders,
}: PlaceholderMentionsExtensionParameters = DEFAULT_PARAMETERS) {
    const options = useMemo(() => placeholders.map(placeholderToOption), [placeholders]);

    return useMentions<Placeholder>({
        createMentionElement: (option) => createPlaceholderMention(option.value.key),
        options,
        trigger: '%',
    });
}

export default usePlaceholderMentions;
