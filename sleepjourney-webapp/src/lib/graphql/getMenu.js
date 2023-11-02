import { fetchGraphApi } from './client';

const menuQuery = (menuName) => `
  query mainMenu {
    navigation: menuByName(name: "${menuName}") {
      links {
        attributes: entity {
          id: uuid
          enabled
          published: entityPublished
          label: entityLabel
          path: link {
            options
            url {
              path
            }
          }
          children: menuLinkTreeElements {
            ...childMenuLinks
            attributes: entity {
              children: menuLinkTreeElements {
                ...childMenuLinks
                attributes: entity {
                  children: menuLinkTreeElements {
                    ...childMenuLinks
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment childMenuLinks on MenuLink {
    attributes: entity {
      id: uuid
      enabled
      published: entityPublished
      label: entityLabel
      path: link {
        options
        url {
          path
        }
      }
    }
  }
`;

export const getMenu = async (menuName) => {
  const res = await fetchGraphApi(menuQuery(menuName));

  const links = res?.navigation?.links || [];

  return links.reduce(function (filtered, link) {
    if (link.attributes?.enabled && link.attributes?.path.url.path !== '/home') {
      filtered.push(link);
    }
    return filtered;
  }, []);
};
