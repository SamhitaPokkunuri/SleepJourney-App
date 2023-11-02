const protectApi = (handler) => {
  return async (req, res) => {
    const allowedDomains = [
      // 'http://localhost:3000',
      'https://stage-vdf.netlify.app',
      'https://development.vodafone.com',
      'https://staging.vodafone.com',
      'https://www.vodafone.com',
    ];
    let incomingUrl = null;
    try {
      incomingUrl = new URL(req.headers.referer).origin;
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: `Forbidden - error: ${error}`,
      });
    }
    if (!allowedDomains.includes(incomingUrl)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: ${new URL(req.headers.referer).origin}`,
      });
    }
    return handler(req, res);
  };
};

export default protectApi;
