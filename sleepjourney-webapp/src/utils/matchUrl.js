export default function matchUrl(string) {
  if (typeof string !== 'string') {
    return null;
  }

  return string.match(
    /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g
  );
}
