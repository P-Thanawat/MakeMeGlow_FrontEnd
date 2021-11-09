export const tocamelCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((item, index) => {
      if (index % 2 === 1) {
        return item[0].toUpperCase() + item.slice(1);
      }
      return item;
    })
    .join('');
};
