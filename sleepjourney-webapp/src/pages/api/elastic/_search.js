import protectApi from 'middleware/protectApi';

async function handler(req, res) {
  const postQueryStr = req.body;

  if (postQueryStr) {
    const elasticResponse = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTIC_SEARCH_URL}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `ApiKey ${process.env.NEXT_PUBLIC_ELASTIC_SEARCH_APIKEY}`,
        },
        body: JSON.stringify(postQueryStr),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        let docs = [];
        if (
          responseJson?.hits &&
          responseJson.hits?.hits &&
          responseJson.hits.hits.length > 0
        ) {
          docs = responseJson.hits.hits.map((doc) => {
            return {
              category: doc._source.category,
              categoryAlias: doc._source.category_alias,
              categoryColour: doc._source.categoryColour,
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
              thumbnailImage: '/' + doc._source.thumbnail_image_url,
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
    const { searchAPISearch } = elasticResponse;
    res.status(200).end(JSON.stringify({ searchAPISearch }));
  } else {
    res.status(400).end(JSON.stringify({ message: `Error: No query found` }));
  }
}

export default protectApi(handler);
