import { publicFetchGraphApi } from './client';

const contentListQuery = (
  filter,
  contentTypeFilter,
  categoryFilter,
  tagFilter,
  tagNameFilter,
  idFilter,
  search,
  sort
) => {
  return `
    query getContentList($offset: Int!, $maxArticles: Int!) {
        searchAPISearch(
          index_id: "acquia_search_index",
          ${search}
          range: {offset: $offset, limit: $maxArticles},
          ${sort}
          condition_group: {
            conjunction: AND,
            groups: [
              {
                conjunction: AND,
                conditions: [
                  {name: "status", value: "1", operator: "="},
                  ${filter}
                ]
              },
              {
                conjunction: OR,
                conditions: [
                  ${contentTypeFilter}
                ]
              },
              {
                conjunction: OR,
                conditions: [
                  ${categoryFilter}
                ]
              },
              {
                conjunction: OR,
                conditions: [
                  ${tagFilter}
                ]
              },
              {
                conjunction: OR,
                conditions: [
                  ${tagNameFilter}
                ]
              },
              {
                conjunction: OR,
                conditions: [
                  ${idFilter}
                ]
              }
            ]
          }
        ) {
            result_count
            documents {
              ... on AcquiaSearchIndexDoc {
                id: nid
                title
                url
                status
                type
                createdTime: created
                field_subtype
                field_category
                categoryColour: field_category_colour
                categoryAlias: category_alias
                tags
                field_tags
                description: field_description
                heroImage: hero_image_url
                thumbnailImage: thumbnail_image_url
                category
              }
            }
        }
    }
    `;
};

export const getContentList = async (variables = {}) => {
  let filter = '';
  let contentTypeFilter = '';
  let categoryFilter = '';
  let tagFilter = '';
  const tagNameFilter = '';
  let idFilter = '';
  if (variables.contentType) {
    if (variables.contentType === 'basic_article') {
      contentTypeFilter = `{name: "type", value: "${variables.contentType}", operator: "="},`;
      contentTypeFilter += `{name: "type", value: "web_stories", operator: "="},`;
    } else {
      filter = `{"type": "${variables.contentType}"},`;
    }
    if (variables.subtype) {
      filter += `{"field_subtype": "${variables.subtype}"},`;
    }
  }
  if (variables?.categories?.length > 0) {
    if (variables?.categories?.length == 1) {
      filter += `{"field_category": "${variables.categories}"},`;
    } else {
      // condition_group for multiple categories
      categoryFilter = variables.categories
        .map((cat) => `{"field_category": "${cat}"}`)
        .join(',');
    }
  }
  if (variables?.tags?.length > 0) {
    if (variables?.tags?.length == 1) {
      filter += `{"field_tags": "${variables.tags}"},`;
    } else {
      // condition_group for multiple tags
      tagFilter = variables.tags
        .map((tag) => `{"field_tags": "${tag}"}`)
        .join(',');
    }
  }
  // Innovation,Networks,OpenRAN,Press Release,Recovery,Technology
  if (variables?.tagsName) {
    filter += `{"tags" : "${variables.tagsName}"},`;
  }
  if (variables?.selectedIds?.length > 0) {
    if (variables?.selectedIds?.length == 1) {
      filter += `{name: "nid", value: "${variables.selectedIds}", operator: "="},`;
    } else {
      // condition_group for multiple ids
      idFilter = variables.selectedIds
        .map((nid) => `{name: "nid", value: "${nid}", operator: "="}`)
        .join(',');
    }
  }
  if (variables.dateRange) {
    // From Date Filter
    const monthFrom = variables.dateRange.from.month.id || 1;
    const yearFrom = variables.dateRange.from.year.id || null;
    let fromDate = null;
    if (monthFrom && yearFrom) {
      fromDate = new Date(`${yearFrom}-${monthFrom}-01`).getTime() / 1000;
      filter += `{name: "created", value: "${fromDate}", operator: ">="},`;
    }
    // To Date Filter
    const monthTo = variables.dateRange.to.month.id || 12;
    const yearTo = variables.dateRange.to.year.id || null;
    let toDate = null;
    if (monthTo && yearTo) {
      toDate =
        new Date(`${yearTo}-${monthTo}-${lastday(yearTo, monthTo)}`).getTime() /
        1000;
      filter += `{name: "created", value: "${toDate}", operator: "<="},`;
    }
  }

  let search = '';
  if (variables.search) {
    // Remove special characters from search
    search = variables.search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    search = `query: "${search}"`;
  }

  const queryVariables = { variables };

  const { sortRule, sortingDirection } = variables;
  let sort = '';
  if (sortRule && sortingDirection) {
    sort = `sort: [{field: "${sortRule}", value: "${sortingDirection}"}],`;
  }

  const res = await publicFetchGraphApi(
    contentListQuery(
      filter,
      contentTypeFilter,
      categoryFilter,
      tagFilter,
      tagNameFilter,
      idFilter,
      search,
      sort
    ),
    queryVariables
  );

  const { searchAPISearch } = res;

  if (typeof window !== 'undefined') {
    const router = window.location;
    if (router.pathname === '/global-search-results') {
      searchAPISearch['search'] = variables.search;
    }
  }

  return searchAPISearch;
};

const lastday = (y, m) => {
  return new Date(y, m, 0).getDate();
};
