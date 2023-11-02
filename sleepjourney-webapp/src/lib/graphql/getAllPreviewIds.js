import { fetchGraphApi } from './client';

const allPreviewIdsQuery = `
  query allPreviewIds {
    nodeQuery(limit: 10000, filter: {conditions: [{operator: EQUAL, field: "status", value: ["0"]}]}, revisions:LATEST) {
      count
      entities {
        uuid: entityUuid
        title: entityLabel
        type: entityBundle
        ... on Node {
          vid
          status
        }
      }
    }
  }
`;

export const getAllPreviewIds = async () => {
  const res = await fetchGraphApi(allPreviewIdsQuery);

  const {
    nodeQuery: { entities },
  } = res;

  return entities.map(({ uuid, vid }) => ({
    uuid,
    vid,
  }));
};
