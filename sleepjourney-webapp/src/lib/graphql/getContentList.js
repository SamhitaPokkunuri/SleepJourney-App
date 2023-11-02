// import { publicFetchGraphApi } from './client';

const contentListQuery = (
  filter,
  contentTypeFilter,
  categoryFilter,
  tagFilter,
  tagNameFilter,
  idFilter,
  datesFilterFrom,
  datesFilterTo,
  search,
  sort,
  maxArticles,
  offset
) => {
  return `
    {
      "query": {
        "bool": {
          "must": [
            ${search}
            ${search && tagNameFilter && ','}
            ${tagNameFilter}
          ],
          "filter": [
            {
              "term": {
                "status": "1"
              }
            }
            ${filter}
            ${contentTypeFilter}
            ${categoryFilter}
            ${tagFilter}
            ${idFilter}
            ${datesFilterFrom}
            ${datesFilterTo}
          ]
        }
      },
      "track_scores": true,
      "size": ${maxArticles},
      ${offset ? `"from": ${offset},` : ''}
      ${sort}
  }
    `;
};
// "min_score": 1,

export const getContentList = async (variables = {}) => {
  let filter = '';
  let contentTypeFilter = '';
  let categoryFilter = '';
  let tagFilter = '';
  let tagNameFilter = '';
  let idFilter = '';
  let datesFilterFrom = '';
  let datesFilterTo = '';
  if (variables.contentType) {
    if (variables.contentType === 'basic_article') {
      contentTypeFilter = `,{"terms": {"type": ["${variables.contentType}", "web_stories"]}}`;
    } else {
      contentTypeFilter = `,{"term": {"type": "${variables.contentType}"}}`;
    }
    if (variables.subtype) {
      filter += `,{"term": {"field_subtype": "${variables.subtype}"}}`;
    }
  }
  if (variables?.categories?.length > 0) {
    if (variables?.categories?.length == 1) {
      categoryFilter += `,{"term": {"field_category": "${variables.categories}"}}`;
    } else {
      // condition_group for multiple categories
      // TODO - check
      const categoryFilterStrTmp = variables.categories
        .map((cat) => `"${cat}"`)
        .join(',');
      categoryFilter = `,{"terms": {"field_category": [${categoryFilterStrTmp}]}}`;
    }
  }
  if (variables?.tags?.length > 0) {
    if (variables?.tags?.length == 1) {
      tagFilter += `,{"term": {"field_tags": "${variables.tags}"}}`;
    } else {
      // condition_group for multiple tags
      // TODO - check
      const tagFilterStrTmp = variables.tags.map((tag) => `"${tag}"`).join(',');
      tagFilter = `,{"terms": {"field_tags": [${tagFilterStrTmp}]}}`;
    }
  }
  if (variables?.tagsName) {
    tagNameFilter = `
    {
      "match": {
        "tags": "${variables.tagsName}"
      }
    }`;
  }
  if (variables?.selectedIds?.length > 0) {
    if (variables?.selectedIds?.length == 1) {
      idFilter += `,{"term": {"nid": "${variables.selectedIds}"}}`;
    } else {
      // condition_group for multiple ids
      const idFilterStrTmp = variables.selectedIds
        .map((nid) => `"${nid}"`)
        .join(',');
      idFilter = `,{"terms": {"nid": [${idFilterStrTmp}]}}`;
    }
  }
  // https://www.elastic.co/guide/en/elasticsearch/reference/5.0/query-dsl-range-query.html
  if (variables.dateRange) {
    // From Date Filter
    const monthFrom = variables.dateRange.from.month.id || 1;
    const yearFrom = variables.dateRange.from.year.id || null;
    let fromDate = null;
    if (monthFrom && yearFrom) {
      fromDate = new Date(`${yearFrom}-${monthFrom}-01`).getTime() / 1000;
      datesFilterFrom = `,{
        "range": {
          "created": {
            "gte": "${fromDate}"
          }
        }
      }`;
    }
    // To Date Filter
    const monthTo = variables.dateRange.to.month.id || 12;
    const yearTo = variables.dateRange.to.year.id || null;
    let toDate = null;
    if (monthTo && yearTo) {
      toDate =
        new Date(`${yearTo}-${monthTo}-${lastday(yearTo, monthTo)}`).getTime() /
        1000;
      datesFilterTo = `,{
        "range": {
          "created": {
            "lte": "${toDate}"
          }
        }
      }`;
    }
  }

  let search = '';
  if (variables.search) {
    // Remove special characters from search
    search = variables.search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    search = `{
      "multi_match": {
        "query" : "${search}", "fields": [
          "title_search", "field_heading", "field_description", "field_description_search", "tags", "category", "title", "body"
        ]
      }
    }`;
  }

  // const queryVariables = { variables };

  const { sortRule, sortingDirection, maxArticles, offset } = variables;
  // Set default sort
  // let sort = '"sort": [{"created" : "desc"}, "_score"]';
  let sort = '"sort": ["_score"]';
  if (sortRule && sortingDirection) {
    sort = `"sort": ["_score", {"${sortRule}" : "${sortingDirection}"}]`;
  }

  const postQueryStr = contentListQuery(
    filter,
    contentTypeFilter,
    categoryFilter,
    tagFilter,
    tagNameFilter,
    idFilter,
    datesFilterFrom,
    datesFilterTo,
    search,
    sort,
    maxArticles,
    offset
  );
  // console.log('postQueryStr', postQueryStr);

  // https://cors-anywhere.herokuapp.com/
  const res = await fetch(`${process.env.NEXT_PUBLIC_ELASTIC_SEARCH_URL}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${process.env.NEXT_PUBLIC_ELASTIC_SEARCH_APIKEY}`,
    },
    // body: JSON.stringify(JSON.parse(postQueryStr)),
    body: postQueryStr,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('responseJson', responseJson);
      let docs = [];
      if (
        responseJson?.hits &&
        responseJson.hits?.hits &&
        responseJson.hits.hits.length > 0
      ) {
        docs = responseJson.hits.hits.map((doc) => {
          return {
            body: doc._source.body,
            category: doc._source.category,
            categoryAlias: doc._source.category_alias,
            categoryColour: doc._source.field_category_colour,
            createdTime: doc._source.created,
            description: doc._source.field_description,
            field_category: doc._source.field_category,
            field_subtype: doc._source.field_subtype,
            field_tags: doc._source.field_tags
              ? doc._source.field_tags.split(',')
              : [],
            heroImage: doc._source.hero_image_url,
            id: doc._source.id,
            status: doc._source.status,
            tags: doc._source.tags ? doc._source.tags.split(',') : [],
            // thumbnailImage: '/' + doc._source.thumbnail_image_url,
            thumbnailImage: doc._source.thumbnail_image_url,
            title: doc._source.title,
            type: doc._source.type,
            url: doc._source.url,
          };
        });
      }

      return {
        searchAPISearch: {
          documents: docs,
          result_count: responseJson.hits.total.value,
        },
      };
    })
    .catch((error) => {
      console.error('error', error);
      return {
        searchAPISearch: {
          documents: [],
          result_count: 0,
        },
      };
    });

  const { searchAPISearch } = res;
  // console.log('searchAPISearch', searchAPISearch);

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
