/** @jsx hyperscript */

import { BookmarkNode } from '@prezly/slate-types';
import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

describe('nodes-hierarchy / Bookmark', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:bookmark
                    layout={BookmarkNode.Layout.HORIZONTAL}
                    new_tab
                    show_thumbnail
                    url="https://rock.prezly.com/stories/454942"
                    uuid="adc52fec-433e-4107-bd38-9049bcfb9620"
                    oembed={{
                        url: 'https://rock.prezly.com/auth?return=%2Fstories%2F454942',
                        html: '<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://rock.prezly.com/auth?return=%2Fstories%2F454942" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Frock.prezly.com%2Fstories%2F454942&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                        type: 'rich',
                        title: 'Prezly',
                        version: '1.0',
                        cache_age: 86400,
                        description: 'Online press releases made easy.',
                        screenshot_url:
                            'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly9yb2NrLnByZXpseS5jb20vc3Rvcmllcy80NTQ5NDI_/64c6eacb78f2f6095543fa1e33542509f0aa9d48f9da42ad896a4fc3cd7949b2?v=1583930760',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:bookmark
                    layout={BookmarkNode.Layout.HORIZONTAL}
                    new_tab
                    show_thumbnail
                    url="https://rock.prezly.com/stories/454942"
                    uuid="adc52fec-433e-4107-bd38-9049bcfb9620"
                    oembed={{
                        url: 'https://rock.prezly.com/auth?return=%2Fstories%2F454942',
                        html: '<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://rock.prezly.com/auth?return=%2Fstories%2F454942" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Frock.prezly.com%2Fstories%2F454942&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                        type: 'rich',
                        title: 'Prezly',
                        version: '1.0',
                        cache_age: 86400,
                        description: 'Online press releases made easy.',
                        screenshot_url:
                            'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly9yb2NrLnByZXpseS5jb20vc3Rvcmllcy80NTQ5NDI_/64c6eacb78f2f6095543fa1e33542509f0aa9d48f9da42ad896a4fc3cd7949b2?v=1583930760',
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
