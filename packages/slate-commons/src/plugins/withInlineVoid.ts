/* eslint-disable no-param-reassign */
import { Editor } from 'slate';

import { Extension } from '../types';

const withInlineVoid =
    (getExtensions: () => Extension[]) =>
    <T extends Editor>(editor: T) => {
        const { isInline, isVoid } = editor;

        editor.isInline = (element) => {
            const anyElement: Record<string, unknown> = element as unknown as Record<
                string,
                unknown
            >;
            const extensions = getExtensions();
            const inlineTypes = extensions.flatMap((extension) => extension.inlineTypes || []);
            return inlineTypes.includes(anyElement.type as string) ? true : isInline(element);
        };

        editor.isVoid = (element) => {
            const anyElement: Record<string, unknown> = element as unknown as Record<
                string,
                unknown
            >;
            const extensions = getExtensions();
            const voidTypes = extensions.flatMap((extension) => extension.voidTypes || []);
            return voidTypes.includes(anyElement.type as string) ? true : isVoid(element);
        };

        return editor;
    };

export default withInlineVoid;
