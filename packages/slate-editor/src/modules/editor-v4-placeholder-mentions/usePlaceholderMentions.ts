import { useMemo } from 'react';

import { Option, useMentions } from 'modules/editor-v4-mentions';

import { createPlaceholderMention } from './lib';
import {
    Placeholder,
    PlaceholderMentionsExtensionParameters,
    PlaceholderMentionType,
} from './types';

const placeholderToOption = (placeholder: Placeholder): Option<Placeholder> => ({
    id: placeholder.key,
    label: placeholder.text,
    value: placeholder,
});

const DEFAULT_PARAMETERS: PlaceholderMentionsExtensionParameters = { placeholders: [] };

const usePlaceholderMentions = ({
    placeholders,
}: PlaceholderMentionsExtensionParameters = DEFAULT_PARAMETERS) => {
    const options = useMemo(() => placeholders.map(placeholderToOption), [placeholders]);

    return useMentions<PlaceholderMentionType, Placeholder>({
        createMentionElement: (option) => createPlaceholderMention(option.value.key),
        options,
        trigger: '%',
    });
};

export default usePlaceholderMentions;
