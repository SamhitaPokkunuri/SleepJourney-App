import { publicFetchGraphApi } from './client';

const animationQuery = (id) => `
    query getAnimation {
      nodeById(id: "${id}") {
        title
        ...animationFragment
      }
    }

    fragment animationFragment on NodeAnimations {
      title
      body {
        value
      }
    }
`;

export const getAnimation = async (animationId) => {
  const res = await publicFetchGraphApi(animationQuery(animationId), {});
  const { nodeById } = res;

  return nodeById || {};
};
