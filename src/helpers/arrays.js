const unique = (arr) => [...new Set(arr)];
const toArray = (arr) => (Array.isArray(arr) ? arr : [arr]);

module.exports = {
    unique,
    toArray,
};
