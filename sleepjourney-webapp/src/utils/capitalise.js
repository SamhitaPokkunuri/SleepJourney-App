export default function capitalise(string, delimiter) {
  if (typeof string !== 'string') {
    return;
  }

  const splitStrings = string.split(delimiter);

  return splitStrings
    .map((text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    })
    .join('');
}
