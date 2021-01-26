/*
    based on:
        https://github.com/technically-php/linear-partitioning/blob/master/src/LinearPartitioning.php
    which is based on:
        http://www8.cs.umu.se/kurser/TDBAfl/VT06/algorithms/BOOK/BOOK2/NODE45.HTM
    related stackoverflow thread:
        https://stackoverflow.com/questions/7938809/how-to-understand-the-dynamic-programming-solution-in-linear-partitioning/7942946
*/

import sortBy from 'lodash.sortby';

const initPrefixSumsArray = (S: number[], n: number): number[] => {
    const P = [0];

    for (let i = 1; i <= n; ++i) {
        P[i] = P[i - 1] + S[i];
    }

    return P;
};

const initBoundaries = (S: number[], P: number[], n: number, k: number): number[][] => {
    const M: number[][] = [];

    for (let i = 1; i <= n; ++i) {
        M[i] = [];
        // The only possible partitioning of i elements to 1 range is a single all-elements range
        // The cost of that partitioning is the sum of those i elements
        M[i][1] = P[i]; // sum of {S[1], ..., S[i]} -- optimized using P
    }

    for (let i = 1; i <= k; ++i) {
        // The only possible partitioning of 1 element into i ranges is a single one-element range
        // The cost of that partitioning is the value of first element
        M[1][i] = S[1];
    }

    return M;
};

const initPositions = (n: number): number[][] => {
    const D = [];

    for (let i = 0; i <= n; ++i) {
        D.push([]);
    }

    return D;
};

const reconstructPartitioning = (S: number[], D: number[][], n: number, k: number): number[][] => {
    let i = n;
    let j = k;
    const partition = [];

    while (j > 0) {
        const delimiterPosition = D[i][j] || 0;

        // Add elements after delimiter {S[delimiterPosition], ..., S[i]} to resulting partition.
        partition.push(S.slice(delimiterPosition + 1, i + 1));

        // Step forward: look for delimiter position for partitioning M[delimiterPosition, j-1]
        i = delimiterPosition;
        --j;
    }

    // Fix order as we reconstructed the partitioning from end to start
    return partition.reverse();
};

const linearPartition = (elements: number[], maxRanges: number): number[][] => {
    const n = elements.length;
    const k = maxRanges;

    // An array S of non-negative numbers {S[1], .., S[n]}
    const S = [0, ...elements]; // adapt indices here: [0..n-1] => [1..n]

    // Let D[n,k] be the position of K-th divider
    // which produces the minimum possible cost partitioning of N elements to K ranges
    const D = initPositions(n);

    // We don't use zero indices for `M` and `D` to make code match math formulas

    // Let P be the sum of first i elements (cost calculation optimization)
    const P = initPrefixSumsArray(S, n);

    // Let M[n,k] be the minimum possible cost over all partitionings of N elements to K ranges
    const M = initBoundaries(S, P, n, k);

    // Main recurrence (fill the rest of values in table M)
    for (let i = 2; i <= n; ++i) {
        for (let j = 2; j <= k; ++j) {
            const solutions = [];

            for (let x = 1; x <= i - 1; ++x) {
                solutions.push({
                    cost: Math.max(M[x][j - 1], P[i] - P[x]),
                    delimiter: x,
                });
            }

            const sortedSolutions = sortBy(solutions, 'cost');
            const bestSolution = sortedSolutions[0];
            M[i][j] = bestSolution.cost;
            D[i][j] = bestSolution.delimiter;
        }
    }

    return reconstructPartitioning(S, D, n, k);
};

export default linearPartition;
