const pick = (field) => (obj) => obj[field];

const mapByType = (data, type) =>
    data.reduce((acc, value) => {
        acc[value[type]] = value;
        return acc;
    }, {});

const splitByPredicate = (data, predicate) =>
    data.reduce(
        (acc, value) => {
            if (predicate(value)) {
                acc[0].push(value);
            } else {
                acc[1].push(value);
            }

            return acc;
        },
        [[], []],
    );

module.exports = {
    pick,
    mapByType,
    splitByPredicate,
};
