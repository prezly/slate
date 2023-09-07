import { autolinkPlaintext } from './autolinkPlaintext';

describe('autolinkPlaintext', () => {
    it("should return undefined if there's nothing to autolink", () => {
        expect(autolinkPlaintext('Hello world')).toBeUndefined();
    });

    it('should create a link node for a URL string', () => {
        expect(autolinkPlaintext('https://www.prezly.com/')).toEqual([
            {
                type: 'link',
                href: 'https://www.prezly.com/',
                new_tab: false,
                children: [{ text: 'https://www.prezly.com/' }],
            },
        ]);
    });

    it('should create a link node for a protocol-less URL string', () => {
        expect(autolinkPlaintext('www.prezly.com')).toEqual([
            {
                type: 'link',
                href: 'https://www.prezly.com',
                new_tab: false,
                children: [{ text: 'www.prezly.com' }],
            },
        ]);
    });

    it('should create link nodes for every URL entry in the given portion of text', () => {
        const content =
            'Click here: http://rock.prezly.com/ or here: prezly.com. But not here: /hello.';
        expect(autolinkPlaintext(content)).toEqual([
            { text: 'Click here: ' },
            {
                type: 'link',
                href: 'http://rock.prezly.com/',
                new_tab: false,
                children: [{ text: 'http://rock.prezly.com/' }],
            },
            { text: ' or here: ' },
            {
                type: 'link',
                href: 'https://prezly.com',
                new_tab: false,
                children: [{ text: 'prezly.com' }],
            },
            { text: '. But not here: /hello.' },
        ]);
    });
});
