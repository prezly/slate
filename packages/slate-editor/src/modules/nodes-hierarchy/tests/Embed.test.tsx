/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Embed', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:embed
                    url="https://github.com/prezly/slate/pull/218"
                    uuid="7ff80f6a-83f6-4d5b-82e2-cd1735309c11"
                    oembed={{
                        cache_age: 86400,
                        description:
                            'Invert rootTypes hierarchy normalization checks from child-to-parent to parent-to-child (see #213)',
                        html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%; padding-top: 120px;"><a href="https://github.com/prezly/slate/pull/218" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2Fprezly%2Fslate%2Fpull%2F218&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                        provider_name: 'GitHub',
                        screenshot_url:
                            'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly9naXRodWIuY29tL3ByZXpseS9zbGF0ZS9wdWxsLzIxOA__/fb03b1ed18742350ae761e556d5eff3ce2aa69be552cc1b1a2b06bba0b54f5fb?v=1583930760',
                        thumbnail_height: 600,
                        thumbnail_url:
                            'https://opengraph.githubassets.com/ac820c427f5ebbe3944e29e047a51b35a9094795ed8ac6e00a5580fa7ec43c5c/prezly/slate/pull/218',
                        thumbnail_width: 1200,
                        title: 'Refactor - Nodes Hierarchy Normalization by aspirisen · Pull Request #218 · prezly/slate',
                        type: 'rich',
                        url: 'https://github.com/prezly/slate/pull/218',
                        version: '1.0',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:embed
                    url="https://github.com/prezly/slate/pull/218"
                    uuid="7ff80f6a-83f6-4d5b-82e2-cd1735309c11"
                    oembed={{
                        cache_age: 86400,
                        description:
                            'Invert rootTypes hierarchy normalization checks from child-to-parent to parent-to-child (see #213)',
                        html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%; padding-top: 120px;"><a href="https://github.com/prezly/slate/pull/218" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2Fprezly%2Fslate%2Fpull%2F218&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                        provider_name: 'GitHub',
                        screenshot_url:
                            'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly9naXRodWIuY29tL3ByZXpseS9zbGF0ZS9wdWxsLzIxOA__/fb03b1ed18742350ae761e556d5eff3ce2aa69be552cc1b1a2b06bba0b54f5fb?v=1583930760',
                        thumbnail_height: 600,
                        thumbnail_url:
                            'https://opengraph.githubassets.com/ac820c427f5ebbe3944e29e047a51b35a9094795ed8ac6e00a5580fa7ec43c5c/prezly/slate/pull/218',
                        thumbnail_width: 1200,
                        title: 'Refactor - Nodes Hierarchy Normalization by aspirisen · Pull Request #218 · prezly/slate',
                        type: 'rich',
                        url: 'https://github.com/prezly/slate/pull/218',
                        version: '1.0',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
