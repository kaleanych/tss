/**
 * Funcție care caută un element într-un vector de lungime 5.
 * @param {Array<number>} v - Vectorul de numere întregi.
 * @param {number} key - Elementul de căutat.
 * @returns {number} - Indicele elementului dacă există, sau -1 dacă nu există.
 */
function findIndex(v, key) {
    if (v.length !== 5) {
        throw new Error("Vectorul trebuie să aibă exact 5 elemente.");
    }
    return v.indexOf(key);
}

module.exports = findIndex;