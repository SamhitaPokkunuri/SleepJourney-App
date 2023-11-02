const assetPrefixUrl = process.env.NEXT_PUBLIC_ASSET_PREFIX_URL;

export default function addAssetPrefix(path) {
  var urlPattern = /^(http|https|mailto|tel):/i;

  if (!path || urlPattern.test(path)) {
    return path;
  }

  return `${assetPrefixUrl}${path}`;
}
