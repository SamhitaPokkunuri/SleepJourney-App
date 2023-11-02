const { redirectList } = require('./redirects');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const VERCEL = process.env.DISABLE_REDIRECTS;

const configs = {
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: [
      'vodafone.com',
      'staging.vodafone.com',
      'content.vodafone.com',
      'content-staging.vodafone.com',
      'content-stage.vodafone.com',
      'content-develop.vodafone.com',
      'content-dev.vodafone.com',
      'content-prod.vodafone.com',
      'vdfbackend.lndo.site',
      'vdfbackenddrupal9.lndo.site',
    ],
    // Breakpoints taken from `src/styles/theme.js`
    deviceSizes: [768, 992, 1060, 1200, 1600],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN, allow-from https://vodafone.lookbookhq.com',
          },
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' http://vodafone.lookbookhq.com https://vodafone.lookbookhq.com http://*.vodafone.com https://*.vodafone.com;`,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN, allow-from https://vodafone.lookbookhq.com',
          },
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' http://vodafone.lookbookhq.com https://vodafone.lookbookhq.com http://*.vodafone.com https://*.vodafone.com;`,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/:pdfName(.*).pdf',
        headers: [
          {
            key: 'Link',
            value: '<https://www.vodafone.com/:pdfName.pdf>; rel="canonical"',
          },
        ],
      },
      {
        source: '/etc/designs/zg/vodcom/desktop/assets/fonts/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://tools.eurolandir.com',
          },
        ],
      },
    ];
  },
  async redirects() {
    return VERCEL ? [] : redirectList;
  },
  async rewrites() {
    return [
      {
        source: '/news',
        destination: '/news',
      },
      {
        source: '/news/:path(for-journalists|contact-us)',
        destination: '/news/:path',
      },
      {
        source: '/business/:path*',
        destination: 'https://oci.prod.eol.vodafone.com/business/:path*',
      },
      {
        source: '/sites/Satellite/:path*',
        destination: 'https://oci.prod.eol.vodafone.com/sites/Satellite/:path*',
      },
      {
        source: '/content/dam/vodcom/:path*',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/content/dam/vodcom/:path*',
      },
      {
        source: '/sites/default/files/:path*',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/:path*',
      },
      {
        source: '/etc/designs/vodafone-simplicity/:path*',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/html-static/vodafone-com/etc/designs/vodafone-simplicity/:path*',
      },
      {
        source: '/etc/vodafone-simplicity/:path*',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/html-static/vodafone-com/etc/vodafone-simplicity/:path*',
      },
      {
        source: '/content/nuance/vodafonegroup-uk-nuance.html',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/html-static/vodafone-com/nuance/vodafonegroup-uk-nuance.html',
      },
      {
        source: '/nuance/vodafonegroup-uk-nuance.html',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/html-static/vodafone-com/nuance/vodafonegroup-uk-nuance.html',
      },
      {
        source: '/nuance/vodafoneuk-internal-nuance.html',
        destination:
          'https://content-prod.vodafone.com/sites/default/files/html-static/vodafone-com/nuance/vodafoneuk-internal-nuance.html',
      },
      {
        source:
          '/GHR/documents/Vodafone-Group-UK-Benefits-summary-SLT-Sept-2020',
        destination:
          'https://www.vodafone.com/sites/default/files/2021-03/vodafone-group-uk-benefits-summary-slt-march-2021.pdf',
      },
      {
        source:
          '/GHR/documents/Vodafone-Group-UK-Benefits-summary-F-Band-Sept-2020',
        destination:
          'https://www.vodafone.com/sites/default/files/2021-03/vodafone-group-uk-benefits-summary-f-band-march-2021.pdf ',
      },
      {
        source:
          '/GHR/documents/Vodafone-Group-UK-Benefits-summary-E-Band-Sept-2020',
        destination:
          'https://www.vodafone.com/sites/default/files/2021-03/vodafone-group-uk-benefits-summary-e-band-march-2021.pdf',
      },
      {
        source: '/GHR/documents/Vodafone-Group-UK-Benefits-Summary-Sept-2020',
        destination:
          'https://www.vodafone.com/sites/default/files/2021-03/vodafone-group-uk-benefits-summary-march-2021.pdf',
      },
      {
        source: '/designstudio',
        destination: '/designstudio/index.html',
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.plugins = config.plugins || [];
    config.plugins.push(new MomentLocalesPlugin());
    return config;
  },
  amp: {
    validator: './amp_validator.js',
  },
};

module.exports = withBundleAnalyzer(configs);
