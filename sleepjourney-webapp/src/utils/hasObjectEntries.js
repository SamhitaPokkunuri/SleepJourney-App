export default function hasObjectEntries(...args) {
  return args.some((obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    return Object.keys(obj).some((key) => {
      const value = obj[key];
      return typeof value === 'object' ? hasObjectEntries(value) : true;
    });
  });
}
