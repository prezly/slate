/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Contact', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:contact
                    uuid="00000000-00000000-00000000-00000001"
                    reference="cfff4936-22bf-4c9a-81aa-cbf2f5fd6192"
                    contact={{
                        avatar_url:
                            'https://cdn.uc.assets.prezly.com/9297a18a-5c16-4ccf-a653-e5fbb1bbdb56/-/crop/220x220/0,5/-/preview/-/scale_crop/128x128/-/format/auto/',
                        company: 'company',
                        description: 'description',
                        address: 'Leuven 3000',
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
                <h:contact
                    uuid="00000000-00000000-00000000-00000001"
                    reference="cfff4936-22bf-4c9a-81aa-cbf2f5fd6192"
                    contact={{
                        avatar_url:
                            'https://cdn.uc.assets.prezly.com/9297a18a-5c16-4ccf-a653-e5fbb1bbdb56/-/crop/220x220/0,5/-/preview/-/scale_crop/128x128/-/format/auto/',
                        company: 'company',
                        description: 'description',
                        address: 'Leuven 3000',
                        email: 'bill@prezly.com',
                        facebook: 'facebook',
                        mobile: 'mobile',
                        name: 'Bill Blankenship',
                        phone: 'phone',
                        twitter: 'twitter',
                        website: 'http://website',
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
