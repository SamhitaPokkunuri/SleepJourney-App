import { publicFetchGraphApi } from './client';

const mapQuery = (id) => `
    query globeMap {
      nodeById(id: "${id}") {
        title
        ...mapFragment
      }
    }

    fragment mapFragment on NodeMaps {
      title
      fieldMinPolarAngle
      fieldMaxPolarAngle
      fieldMinAzimuthAngle
      fieldMaxAzimuthAngle
      fieldInitialLatitude
  	  fieldInitialLongitude
      fieldLocation {
        entity {
          entityLabel
          ... on ParagraphLocations {
            fieldLocationTitle
            fieldLocationLatitude
            fieldLocationLongitude
            fieldLocationSummary {
              processed
            }
            fieldLocationContent {
              processed
            }
            fieldLocationImage {
              entity {
                image: thumbnail {
                  height
                  width
                  url
                  alt
                  title
                }
              }
            }
            fieldLocationPin
            fieldLocationLinkTo {
              entity {
                path {
                  alias
                }
              }
            }
            fieldLocationOpenAs
            fieldLocationExternalLinkTo
          }
        }
      }
    }
`;

export const getGlobeMap = async (mapId) => {
  const res = await publicFetchGraphApi(mapQuery(mapId));
  const { nodeById } = res;

  return nodeById || {};
};

export const getGlobeMapDummy = async () => {
  const res = {
    title: 'Where we work',
    fieldMapDescription:
      'Through this unique network of foundations, we are able to think and act locally and best respond to the specific needs of the comminuties in whitch Vodafone operates.\r\nGlobally, we harness the power of communications technologgy to build and deliver long-term sustainable programmes that drive transformational changes and support disaster response.',
    fieldLocation: [
      {
        entity: {
          entityLabel: 'Globe earth > Location',
          fieldName: 'London',
          fieldLatitude: '51.5074',
          fieldLongitude: '0.1278',
          fieldContent: {
            value: '<p>Test content</p>\r\n',
            processed: '<p>Test content</p>',
          },
          tags: ['Europe', 'Finland'],
          link: {
            openAs: 'overlay',
            url: '/overlays/code-girl',
          },
        },
      },
      {
        entity: {
          entityLabel: 'Globe earth > Location',
          fieldName: 'Greece',
          fieldLatitude: '37.9838',
          fieldLongitude: '23.7275',
          fieldContent: {
            value: '<p>Greece content</p>\r\n',
            processed: '<p>Greece content</p>',
          },
          tags: ['Europe', 'Finland'],
          link: {
            openAs: 'overlay',
            url: '/overlays/women-business',
          },
        },
      },
      {
        entity: {
          entityLabel: 'Globe earth > Location',
          fieldName: 'France',
          fieldLatitude: '46.2276',
          fieldLongitude: '2.2137',
          fieldContent: {
            value: '<p>France content</p>\r\n',
            processed: '<p>France content</p>',
          },
          tags: ['Europe', 'Finland'],
          link: {
            openAs: 'overlay',
            url: '/overlays/survivors-story',
          },
        },
      },
      {
        entity: {
          entityLabel: 'Globe earth > Location',
          fieldName: 'China',
          fieldLatitude: '35.8617',
          fieldLongitude: '104.1954',
          fieldContent: {
            value: '<p>China content</p>\r\n',
            processed: '<p>China content</p>',
          },
          tags: ['Europe', 'Finland'],
          link: {
            openAs: 'overlay',
            url: '/about/executive-committee/ahmed-essam',
          },
        },
      },
    ],
  };

  return res;
};
