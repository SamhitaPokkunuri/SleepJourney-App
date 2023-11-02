import { fetchGraphApi } from './client';

const fragmentFieldsWithSubtype = `
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
  fieldCategory {
    entity {
      name
    }
  }
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
  bodyJson: fieldBodyJson
`;

const pageFields = `
  customHeader: fieldCustomHeader
`;

const previewPathBlocksQuery = `
  query previewPathBlocks($uuid:String!) {
    nodeQuery(filter: {conditions: [{operator: EQUAL, field: "status", value: ["0"]}, {operator: EQUAL, field: "uuid", value: [$uuid]}]}, revisions: LATEST) {
      entities {
        uuid: entityUuid
        title: entityLabel
        type: entityBundle
        createdDate: entityCreated(format: "d M Y")
        ... on Node {
          vid
          status
        }
        entityUrl {
          ... on EntityCanonicalUrl {
            breadcrumb {
              title: text
              url {
                path
              }
            }
          }
        }
        ...pageFragment
        ...basicArticleFragment
        ...landingPageFragment
        ...videoFragment
        ...dreamlabFragment
        ...dreamlabNewsFragment
        ...foundationPageFragment
        ...webstories
        ...noNavPageFragment
        ...overlayFragment
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

  fragment noNavPageFragment on NodeNoNavPage  {
    ${fragmentFields}
    ${pageFields}
  }
  
  fragment overlayFragment on NodeOverlay  {
    ${fragmentFields}
  }
  `;

export const getPreviewPathBlocks = async (uuid) => {
  const res = await fetchGraphApi(
    previewPathBlocksQuery,
    {
      variables: {
        uuid: uuid,
      },
    },
    true
  );

  const {
    nodeQuery: { entities },
  } = res;

  return entities[0];
};
