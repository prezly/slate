/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Video', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:video
                    url="https://www.youtube.com/watch?v=FYH9n37B7Yw&t=1s"
                    uuid="863fd1d6-fcac-46f7-b5c2-66c459b3f3de"
                    oembed={{
                        author_url: 'https://www.youtube.com/channel/UCjBp_7RuDBUYbd1LegWEJ8g',
                        cache_age: 86400,
                        description:
                            'Your ultimate Horizon adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. \n\nPlay Forza Horizon 5 day one with Xbox Game Pass. \nhttps://www.xbox.com/games/forza-horizon-5\n\nAvailable on Xbox Series X|S, Xbox One, Windows 10 PC, and Steam.​\n\nSubscribe to Xbox 🎮 https://xbx.lv/2EEjmaR\n\nFollow Xbox on other channels:\nFacebook: https://www.facebook.com/Xbox\nTwitter: https://www.twitter.com/Xbox\nInstagram: https://www.instagram.com/Xbox',
                        html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFYH9n37B7Yw%26t%3D1s&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                        provider_name: 'YouTube',
                        screenshot_url:
                            'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g.dj1GWUg5bjM3QjdZdyZ0PTFz/a29634b1924c9a0db6fce8aead3010a3578190e06ceb2837d61f33cbd2194d40?v=1583930760',
                        thumbnail_height: 720,
                        thumbnail_url: 'https://i.ytimg.com/vi/FYH9n37B7Yw/maxresdefault.jpg',
                        thumbnail_width: 1280,
                        title: 'Forza Horizon 5 Official Announce Trailer',
                        type: 'video',
                        url: 'https://www.youtube.com/watch?v=FYH9n37B7Yw',
                        version: '1.0',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:video
                    url="https://www.youtube.com/watch?v=FYH9n37B7Yw&t=1s"
                    uuid="863fd1d6-fcac-46f7-b5c2-66c459b3f3de"
                    oembed={{
                        author_url: 'https://www.youtube.com/channel/UCjBp_7RuDBUYbd1LegWEJ8g',
                        cache_age: 86400,
                        description:
                            'Your ultimate Horizon adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. \n\nPlay Forza Horizon 5 day one with Xbox Game Pass. \nhttps://www.xbox.com/games/forza-horizon-5\n\nAvailable on Xbox Series X|S, Xbox One, Windows 10 PC, and Steam.​\n\nSubscribe to Xbox 🎮 https://xbx.lv/2EEjmaR\n\nFollow Xbox on other channels:\nFacebook: https://www.facebook.com/Xbox\nTwitter: https://www.twitter.com/Xbox\nInstagram: https://www.instagram.com/Xbox',
                        html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFYH9n37B7Yw%26t%3D1s&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                        provider_name: 'YouTube',
                        screenshot_url:
                            'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g.dj1GWUg5bjM3QjdZdyZ0PTFz/a29634b1924c9a0db6fce8aead3010a3578190e06ceb2837d61f33cbd2194d40?v=1583930760',
                        thumbnail_height: 720,
                        thumbnail_url: 'https://i.ytimg.com/vi/FYH9n37B7Yw/maxresdefault.jpg',
                        thumbnail_width: 1280,
                        title: 'Forza Horizon 5 Official Announce Trailer',
                        type: 'video',
                        url: 'https://www.youtube.com/watch?v=FYH9n37B7Yw',
                        version: '1.0',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot(this);
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
