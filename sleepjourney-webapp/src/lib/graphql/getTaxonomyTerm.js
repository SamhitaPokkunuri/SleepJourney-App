import { fetchGraphApi } from './client';

const termQuery = () => `
  query getTaxonomy($vid: [String!]) {
    taxonomyTermQuery(limit: 500, sort: {direction: ASC, field: "name"}, filter: {conditions: {field: "vid", value: $vid}}) {
      count
      entities {
        tid: entityId
        name: entityLabel
        ... on TaxonomyTermCategories {
            color: fieldColour
        }
      }
    }
  }
`;

export const getTaxonomyTerm = async (vid) => {
  const res = await fetchGraphApi(termQuery(), {
    variables: {
      vid: vid,
    },
  });

  const { taxonomyTermQuery } = res;

  if (taxonomyTermQuery?.entities) {
    return taxonomyTermQuery?.entities;
  }

  return [];
};
