import { publicFetchGraphApi } from './client';

const categoryQuery = () => `
    query getCategories ($path:String!) {
        route(path: $path) {
            path
            ... on EntityCanonicalUrl {
                entity {
                    entityId
                    entityLabel
                    ... on TaxonomyTermCategories {
                        fieldColour
                        fieldThumbnailImage {
                          entity {
                            image: thumbnail {
                              height
                              width
                              url
                              alt
                              title
                            }
                            path {
                              alias
                            }
                            entityLabel
                          }
                        }
                    }
                }
                breadcrumb {
                    title: text
                    url {
                        path
                    }
                }
            }
        }
    }
`;

export const getCategory = async (categoryAlias) => {
  const res = await publicFetchGraphApi(categoryQuery(categoryAlias), {
    variables: {
      path: `/news/${categoryAlias}`,
    },
  });
  const { route } = res;

  return route || {};
};
