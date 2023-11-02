import { fetchGraphApi } from './client';

const allStoryPathsQuery = `
  query allContentPaths {
    nodeQuery(
      limit: 1000,
      filter: {
        conjunction: OR,
        groups: [
          {
            conjunction: AND,
            conditions: [
              {operator: EQUAL, field: "status", value: ["1"]},
              {operator: IN, field: "type", value: ["web_stories"]},
            ]
          }
        ]
      }
    ) {
      entities {
        entityBundle
        ... on Node {
          path {
            alias
          }
        }
      }
    }
  }
`;

export const getAllStoryPaths = async () => {
  const res = await fetchGraphApi(allStoryPathsQuery);

  return res.nodeQuery.entities.map(({ path }) => {
    const paths = path.alias.split('/');

    if (paths[0] === '') {
      paths.shift();
    }

    return paths;
  });
};
