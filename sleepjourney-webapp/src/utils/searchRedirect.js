const { redirectList } = require('../../redirects');

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

const searchRedirect = (path) => {
  if (!path) {
    return path;
  }

  let daynamicPathReplace = '';
  const foundArray = redirectList.filter(function (item) {
    const keyword = path.charAt(0) === '/' ? path : `/${path}`;
    if (item.source === keyword) {
      return true;
    }
    const idxPath = item.source.indexOf(':path');
    if (idxPath !== -1) {
      const sourceArr = item.source.split('/');
      const keywordArr = keyword.split('/');
      sourceArr.splice(-1);
      const lastPath = keywordArr.splice(-1);
      const compareDynamic = equals(sourceArr, keywordArr);
      if (compareDynamic) {
        daynamicPathReplace = lastPath[0];
        return true;
      }
    }
    return false;
  });
  return {
    data: foundArray,
    daynamicPath: daynamicPathReplace,
  };
};

export default searchRedirect;
