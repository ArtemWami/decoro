const copy = (obj) => JSON.parse(JSON.stringify(obj));
const path = (keys, emptyValue = undefined) => (obj) =>
  keys.reduce((acc, key) => {
    if (!acc || !acc[key]) {
      return emptyValue;
    }

    return acc[key];
  }, obj);

const getAccumulated = (obj) => (acc, field) => {
  if (!obj) {
    return obj;
  }

  const [key, ...nestedKeys] = field.split('.');
  const nestedField = nestedKeys.join('.');
  if (key.endsWith('[]')) {
    const fieldName = key.replace('[]', '');
    if (Array.isArray(obj[fieldName])) {
      if (Array.isArray(acc[fieldName])) {
        acc[fieldName] = obj[fieldName].map((nestedModel, index) =>
          getAccumulated(nestedModel)(acc[fieldName][index], nestedField),
        );
      } else {
        acc[fieldName] = obj[fieldName].map((nestedModel) =>
          getAccumulated(nestedModel)({}, nestedField),
        );
      }
    }
  } else if (typeof obj[key] !== 'undefined') {
    if (nestedField) {
      acc[key] = getAccumulated(obj[key])(acc[key] || {}, nestedField);
    } else {
      acc[key] = obj[key];
    }
  }

  return acc;
};

const pickNested = (fields) => (obj) => fields.reduce(getAccumulated(obj), {});

module.exports = {
  copy,
  path,
  pickNested,
};
