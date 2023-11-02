// const redirects = require('./legacy-redirects.json');
// const redirectsFile = require('./redirects.json');
// const investors = require('./investors.json');
// const vanity = require('./vanity_urls.json');
// const articles = require('./articles.json');
// const perspectives = require('./perspectives.json');
// const sitemap = require('./sitemap-redirects.json');
// const pdf = require('./pdf.json');
// const articlesRedirects = require('./articles-redirects.json');
// const febAudit = require('./feb-audit-redirects.json');

// exports.redirectList = redirects.concat(
//   articles,
//   perspectives,
//   investors,
//   vanity,
//   pdf,
//   sitemap,
//   articlesRedirects,
//   redirectsFile,
//   febAudit
// );

const consolidatedRedirects = require('./consolidated_redirects.json');

exports.redirectList = consolidatedRedirects;
