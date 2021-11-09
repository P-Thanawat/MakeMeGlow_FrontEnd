export const genObjectToFilter = (filterValue) => {
  const obj = {};
  for (let key in filterValue) {
    const result = [];
    for (let key1 in filterValue[key]) {
      if (filterValue[key][key1]) {
        result.push(key1);
      }
    }
    obj[key] = result;
  }
  return obj;
};
