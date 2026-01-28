import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
  const craftKey = import.meta.env.VITE_APP_CRAFTKEY;

  const response = await fetch(
    'https://connect.craft.do/links/4NPAbxC4Cpn/api/v1/documents?fetchMetadata=true',
    {
      headers: {
        Authorization: `Bearer ${craftKey}`
      }
    }
  );

  if (!response.ok) {
    return new Response('Failed to fetch posts', { status: 500 });
  }

  const data = await response.json();
  const posts = data.items.map(
    (item: { id: string; title: string; createdAt: string }) => ({
      id: item.id,
      title: item.title,
      createdAt: item.createdAt
    })
  );

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' }
  });
};
