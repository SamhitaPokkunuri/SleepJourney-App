export default function validateAndParseJSON(jsonString, path) {
  try {
    var jsonData = JSON.parse(jsonString);

    if (jsonData && typeof jsonData === 'object') {
      return jsonData;
    }
  } catch (e) {
    // console.log('Data is not valid for', path);
  }

  return false;
}
