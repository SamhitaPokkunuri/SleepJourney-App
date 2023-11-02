import intro from './features/intro';
import tabs from './features/tabs';
import cards from './features/cards';
import accordion from './features/accordion';
import otherBlocks from './features/other-blocks';
import iconFeatures from './features/icon-features';
import furtherResources from './features/further-resources';
import statBars from './features/stat-bars';
import sustainableDevGoals from './features/sustainable-dev-goals';
import largeNumbers from './features/large-numbers';
import largeNumbersColunms from './features/large-number-columns';
import largeNumbersGrid from './features/large-number-three-grid';

const API_URL = process.env.DRUPAL_JSON_API_URL;

async function fetchAPI(query) {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.DRUPAL_AUTH_ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.DRUPAL_AUTH_ACCESS_TOKEN}`;
  }

  const res = await fetch(`${API_URL}/${query}`, {
    method: 'GET',
    headers,
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getPreviewNodeById(id, type) {
  // TODO: Update the request to only return the required id and status
  const requestUrl = `node/${type.replace(
    'node--',
    ''
  )}/${id}?resourceVersion=rel:working-copy`;
  const data = await fetchAPI(requestUrl);

  return data;
}

export async function getPreviewContentPathBlocks(id, type) {
  const requestUrl = `node/${type.replace(
    'node--',
    ''
  )}/${id}?resourceVersion=rel:working-copy`;
  const data = await fetchAPI(requestUrl);

  return data;
}

// This is the dummy API call, see graphql for other calls
export async function getAllBlocksForPage() {
  const data = [
    intro,
    tabs,
    cards,
    accordion,
    otherBlocks,
    iconFeatures,
    furtherResources,
    statBars,
    sustainableDevGoals,
    largeNumbers,
    largeNumbersColunms,
    largeNumbersGrid,
  ];

  return data;
}
