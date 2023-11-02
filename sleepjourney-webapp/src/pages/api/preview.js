export default async function preview(req, res) {
  const { secret, id, type } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !process.env.DRUPAL_PREVIEW_SECRET ||
    secret !== process.env.DRUPAL_PREVIEW_SECRET ||
    !id
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    id,
    type,
  });

  // Redirect to the preview path for the post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  if (type === 'web_stories') {
    res.writeHead(307, { Location: `/preview/stories/${id}#development=1` });
  } else {
    res.writeHead(307, { Location: `/preview/${id}` });
  }
  res.end();
}
