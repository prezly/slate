import linearPartition from './linearPartition';

describe('linearPartition', () => {
    const tests = [
        {
            input: {
                elements: [],
                maxRanges: 0,
            },
            output: [],
        },
        {
            input: {
                elements: [150, 150, 66, 150, 150, 149, 66, 150, 177],
                maxRanges: 4,
            },
            output: [
                [150, 150],
                [66, 150],
                [150, 149, 66],
                [150, 177],
            ],
        },
        {
            input: {
                elements: [150, 66, 66, 66, 150, 150, 74],
                maxRanges: 2,
            },
            output: [
                [150, 66, 66, 66],
                [150, 150, 74],
            ],
        },
        {
            input: {
                elements: [66, 163, 149, 150, 134, 150, 150, 66, 141, 79],
                maxRanges: 4,
            },
            output: [
                [66, 163, 149],
                [150, 134],
                [150, 150],
                [66, 141, 79],
            ],
        },
        {
            input: {
                elements: [150, 149, 150, 100, 150, 150, 141],
                maxRanges: 3,
            },
            output: [
                [150, 149],
                [150, 100, 150],
                [150, 141],
            ],
        },
        {
            input: {
                elements: [133, 133, 151],
                maxRanges: 1,
            },
            output: [[133, 133, 151]],
        },
        {
            input: {
                elements: [74, 66, 128, 79, 74, 77, 133, 64],
                maxRanges: 2,
            },
            output: [
                [74, 66, 128, 79],
                [74, 77, 133, 64],
            ],
        },
    ];

    tests.forEach(({ input: { elements, maxRanges }, output }) => {
        it(`partitions ${JSON.stringify(elements)} into ${maxRanges} part(s)`, () => {
            expect(linearPartition(elements, maxRanges)).toEqual(output);
        });
    });
});
