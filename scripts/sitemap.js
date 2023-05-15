const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');
require('dotenv').config({ path: `.env.production` });

const BUILD_ID = fs.readFileSync('.next/BUILD_ID').toString();

sitemap({
  baseUrl: process.env.SITE_URL,
  pagesDirectory: './.next/server/pages',
  targetDirectory: 'public/',
  ignoredExtensions: ['js', 'map', 'png', 'jpg', 'pdf'],
  ignoredPaths: ['[fallback],[preview]'],
});
