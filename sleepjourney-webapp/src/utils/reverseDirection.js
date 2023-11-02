export default function reverseDirection(direction, isSmallMedia) {
  const directions = ['top', 'right', 'bottom', 'left'];

  if (directions.indexOf(direction) < 0) {
    return direction;
  }

  let reversed = direction;

  if (direction === 'top') {
    reversed = 'bottom';
  } else if (direction === 'right' || (direction === 'left' && isSmallMedia)) {
    reversed = 'left';
  } else if (direction === 'bottom') {
    reversed = 'top';
  } else if (direction === 'left' && !isSmallMedia) {
    reversed = 'right';
  }

  return reversed;
}
