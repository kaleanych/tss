const assert = require('node:assert');
const findIndex = require('../fn.js');

// Datele de test
const testCases = [
    { vector: [1, 2, 3, 4, 5], key: 3, expected: 2 }, // Element existent
    { vector: [1, 2, 3, 4, 5], key: 6, expected: -1 }, // Element inexistent
    { vector: [7, 8, 9, 10, 11], key: -1, expected: -1 }, // Element negativ inexistent
    { vector: [0, 0, 0, 0, 0], key: 0, expected: 0 }, // Element repetat
    { vector: [1, 2, 3], key: 2, expectedError: true }, // Vector invalid (lungime diferită)
    { vector: [1, 2, 3, 4, 5], key: 1, expected: 0 }, // Primul element
    { vector: [1, 2, 3, 4, 5, 6], key: 2, expectedError: true }, // Vector prea lung
    { vector: [], key: 2, expectedError: true } // Vector gol
];

// Teste dinamice folosind Node.js Test Runner
describe('Testează funcția findIndex', () => {
    testCases.forEach(({ vector, key, expected, expectedError }) => {
        it(`Test cu vector ${JSON.stringify(vector)} și cheia ${key}`, () => {
            if (expectedError) {
                assert.throws(() => findIndex(vector, key), /Vectorul trebuie să aibă exact 5 elemente./);
            } else {
                const result = findIndex(vector, key);
                assert.strictEqual(result, expected);
            }
        });
    });
});
