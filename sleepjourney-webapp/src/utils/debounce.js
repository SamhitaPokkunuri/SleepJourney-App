export default function debounce(callback, delay) {
  let timer;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(callback, delay);
  };
}
