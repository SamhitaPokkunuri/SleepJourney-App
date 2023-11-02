import { builder } from '@netlify/functions';
import fetch from 'node-fetch';

async function handler(event, context) {
  try {
    const data = await getTwitterData({ user: 'VodafoneGroup' });
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ttl: 300,
    };
  } catch (e) {
    console.error('getTwitterData Group', e);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}

async function getTwitterData(query) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
  };
  const rest = await fetch(
    `https://api.twitter.com/1.1/search/tweets.json?q=from:@${query.user} exclude:replies&count=7`,
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
