const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function addAssetPrefix(path) {
  var urlPattern = /^(http|https|mailto|tel):/i;

  if (urlPattern.test(path)) {
    return path;
  }

  return `${siteUrl}${path}`;
}
