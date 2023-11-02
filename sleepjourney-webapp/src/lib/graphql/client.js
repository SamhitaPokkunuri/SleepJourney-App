const API_URL = process.env.DRUPAL_GRAPHQL_API_URL;

// TODO: Using FetchGraphApi for Preview due to conflict with urql
// need to investigate urql caching with __typename as possible cause
export async function fetchGraphApi(query, { variables } = {}, withAuth) {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.DRUPAL_AUTH_ACCESS_TOKEN && withAuth) {
    headers['Authorization'] = `Bearer ${process.env.DRUPAL_AUTH_ACCESS_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function publicFetchGraphApi(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // Use Anonymous User, no need for authorization
  // if (process.env.NEXT_PUBLIC_DRUPAL_AUTH_ACCESS_TOKEN) {
  //   headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_DRUPAL_AUTH_ACCESS_TOKEN}`;
  // }

  const PUBLIC_API_URL = process.env.NEXT_PUBLIC_DRUPAL_GRAPHQL_API_URL;
  const res = await fetch(PUBLIC_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
