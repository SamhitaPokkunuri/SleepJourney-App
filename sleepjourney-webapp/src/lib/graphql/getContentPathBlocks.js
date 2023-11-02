import { fetchGraphApi, publicFetchGraphApi } from './client';

const fragmentFieldsWithSubtype = `
  title
  description: fieldDescription
  heading: fieldHeading
  fieldHeroImage {
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
  fieldCategory {
    entity {
      name
      entityId
      ...on TaxonomyTermCategories {
        fieldColour
      }
    }
  }
  fieldDisplayDateCategory
  fieldTags {
    entity {
      name
    }
  }
  contentSubtype: fieldSubtype {
    entity {
      entityLabel
      entityId
    }
  }
  bodyJson: fieldBodyJson
`;

const fragmentFields = `
  title
  description: fieldDescription
  heading: fieldHeading
  fieldHeroImage {
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
  bodyJson: fieldBodyJson
`;

const sdgFields = `
  title
  description: fieldDescription
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
  fieldParent {
    entity {
      path {
        alias
      }
    }
  }
  bodyJson: fieldBodyJson
`;

const pageFields = `
  customHeader: fieldCustomHeader
`;

const contentPathBlocksQuery = `
  query contentPathBlocks($path:String!) {
    route(path: $path) {
      path,
      ... on EntityCanonicalUrl {
        node: nodeContext {
          id: nid
          type: entityBundle
          createdDate: entityCreated(format: "d M Y")
          status
          ...pageFragment
          ...basicArticleFragment
          ...landingPageFragment
          ...overlayPageFragment
          ...videoFragment
          ...dreamlabFragment
          ...dreamlabNewsFragment
          ...foundationPageFragment
          ...sdgFragment
          ...basicPageNoindexFragment
          ...webstories
          ...mwcFragment
          ...noNavPageFragment
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

  fragment webstories on NodeWebStories {
    bodyJson: fieldBodyJson
  }

  fragment pageFragment on NodePage  {
    ${fragmentFields}
    ${pageFields}
  }

  fragment basicArticleFragment on NodeBasicArticle {
    ${fragmentFieldsWithSubtype}
  }

  fragment landingPageFragment on NodeLandingPage {
    ${fragmentFields}
  }

  fragment overlayPageFragment on NodeOverlay {
    ${fragmentFields}
    fieldParent {
      entity {
        path {
          alias
        }
      }
    }
  }

  fragment videoFragment on NodeVideo {
    ${fragmentFields}
  }

  fragment dreamlabFragment on NodeDreamlabPage {
    ${fragmentFields}
  }

  fragment dreamlabNewsFragment on NodeDreamlabNews {
    ${fragmentFields}
  }

  fragment foundationPageFragment on NodeFoundationPage {
    ${fragmentFields}
    ${pageFields}
  }

  fragment sdgFragment on NodeSdg {
    ${sdgFields}
  }
  fragment mwcFragment on NodeMwcDemo {
    ${sdgFields}
  }

  fragment basicPageNoindexFragment on NodeBasicPageNoindex {
    ${fragmentFields}
  }
  
  fragment noNavPageFragment on NodeNoNavPage  {
    ${fragmentFields}
    ${pageFields}
  }
  `;

export const getContentPathBlocks = async (path, publicFetch = false) => {
  let fetchApiFunction = fetchGraphApi;
  if (publicFetch) {
    fetchApiFunction = publicFetchGraphApi;
  }

  let checkPath = path;
  if (checkPath.charAt(0) !== '/') {
    checkPath = `/${path}`;
  }
  const res = await fetchApiFunction(contentPathBlocksQuery, {
    variables: {
      path: checkPath,
    },
  });

  const { route } = res;

  if (route?.node?.status) {
    return route;
  }

  return null;
};
