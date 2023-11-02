export default function getColor(color) {
  const colors = {
    '#FFFFFF': 'white',
    '#333333': 'darkGrey',
    '#e60000': 'red',
  };

  return colors[color];
}
