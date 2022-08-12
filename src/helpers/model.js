// Math.round is used to avoid remainder 32.23 * 100 = 3222.9999999999995
const toIntPrice = (value) => (value ? Math.round(value * 100) : value);
const toFloatPrice = (value) => (value ? value / 100 : value);
const priceFieldAccessors = (field) => ({
    get() {
        const value = this.getDataValue(field);
        return toFloatPrice(value);
    },
    set(value) {
        this.setDataValue(field, toIntPrice(value));
    },
});

const omitUndefined = (obj) =>
    Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] !== 'undefined') {
            acc[key] = obj[key];
        }

        return acc;
    }, {});

module.exports = {
    toIntPrice,
    toFloatPrice,
    priceFieldAccessors,
    omitUndefined,
};
