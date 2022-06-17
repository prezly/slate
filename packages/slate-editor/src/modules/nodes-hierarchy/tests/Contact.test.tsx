/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Contact', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <contact
                    uuid="cfff4936-22bf-4c9a-81aa-cbf2f5fd6192"
                    contact={{
                        id: 255335,
                        uuid: 'cfff4936-22bf-4c9a-81aa-cbf2f5fd6192',
                        avatar_url:
                            'https://cdn.uc.assets.prezly.com/9297a18a-5c16-4ccf-a653-e5fbb1bbdb56/-/crop/220x220/0,5/-/preview/-/scale_crop/128x128/-/format/auto/',
                        company: 'company',
                        description: 'description',
                        email: 'bill@prezly.com',
                        facebook: 'facebook',
                        mobile: 'mobile',
                        name: 'Bill Blankenship',
                        phone: 'phone',
                        twitter: 'twitter',
                        website: 'website',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <contact
                    uuid="cfff4936-22bf-4c9a-81aa-cbf2f5fd6192"
                    contact={{
                        id: 255335,
                        uuid: 'cfff4936-22bf-4c9a-81aa-cbf2f5fd6192',
                        avatar_url:
                            'https://cdn.uc.assets.prezly.com/9297a18a-5c16-4ccf-a653-e5fbb1bbdb56/-/crop/220x220/0,5/-/preview/-/scale_crop/128x128/-/format/auto/',
                        company: 'company',
                        description: 'description',
                        email: 'bill@prezly.com',
                        facebook: 'facebook',
                        mobile: 'mobile',
                        name: 'Bill Blankenship',
                        phone: 'phone',
                        twitter: 'twitter',
                        website: 'website',
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
