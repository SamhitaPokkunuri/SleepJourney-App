import { builder } from '@netlify/functions';
import fetch from 'node-fetch';

async function handler(event, context) {
  try {
    const data = await getInstagramData({ user: 'GROUP' });
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ttl: 300,
    };
  } catch (e) {
    console.error('getInstagramData Group', e);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}

async function getInstagramData(query) {
  const token =
    query.user === 'FOUNDATION'
      ? process.env.INSTAGRAM_TOKEN_FOUNDATION
      : process.env.INSTAGRAM_TOKEN_GROUP;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const rest = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_url,permalink,thumbnail_url`,
    {
      method: 'GET',
      headers,
    }
  );
  const json = await rest.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json;
}

exports.handler = builder(handler);
