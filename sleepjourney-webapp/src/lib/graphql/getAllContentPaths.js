import { fetchGraphApi } from './client';
import subtractMonths from 'utils/dates';
import searchRedirect from 'utils/searchRedirect';

const allContentPathsQuery = (oldArticlesDate) => {
  return `
    query allContentPaths {
      nodeQuery(
        limit: 250,
        filter: {
          conjunction: OR,
          groups: [
            {
              conjunction: AND,
              conditions: [
                {operator: EQUAL, field: "status", value: ["1"]},
                {operator: NOT_IN, field: "type", value: ["basic_article","overlay","markets", "people", "maps", "sdg", "basic_page_noindex", "web_stories"]},
              ]
            },
            {
              conjunction: AND,
              conditions: [
                {operator: EQUAL, field: "status", value: ["1"]},
                {operator: IN, field: "type", value: ["basic_article"]},
                {operator: GREATER_THAN, field: "created", value: ["${oldArticlesDate}"]},
              ]
            }
          ]
        }
      ) {
        count
        entities {
          entityLabel
          entityBundle
          ... on Node {
            uuid
            title
            type {
              targetId
            }
            path {
              alias
            }
            status
          }
        }
      }
    }
  `;
};

const excludedPaths = [
  '/sitemap',
  '/global-search-results',
  '/news/for-journalists',
  '/news/campaigns-events',
  '/news/contact-us',
  '/about-vodafone/how-we-operate/suppliers/supplier-management-help',
  '/about-vodafone/how-we-operate/suppliers/supplier-management-help/supplier-management-help-de',
  '/about-vodafone/how-we-operate/suppliers/supplier-management-help/supplier-management-help-en',
  '/about-vodafone/how-we-operate/suppliers/supplier-management-help/supplier-management-help-it',
  '/about-vodafone/how-we-operate/suppliers/supplier-management-help/supplier-management-help-es',
];

export const getAllContentPaths = async () => {
  const todayDate = new Date();
  const oldArticlesDate = subtractMonths(todayDate, 24);

  const res = await fetchGraphApi(allContentPathsQuery(oldArticlesDate));

  const {
    nodeQuery: { entities },
  } = res;

  return entities
    .reduce(function (filtered, entity) {
      const searchResults = searchRedirect(entity.path.alias);
      if (
        entity.path.alias != null &&
        !excludedPaths.includes(entity.path.alias) &&
        searchResults.data.length === 0
      ) {
        filtered.push(entity);
      }
      return filtered;
    }, [])
    .map(({ path }) => {
      if (path === '/home') {
        return [];
      }
      const aliasArr = path.alias.split('/');
      if (!aliasArr[0]) {
        aliasArr.shift();
      }
      return aliasArr;
    });
};
