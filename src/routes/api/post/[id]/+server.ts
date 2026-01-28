import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const craftKey = import.meta.env.VITE_APP_CRAFTKEY;
  const { id } = params;

  const response = await fetch(
    `https://connect.craft.do/links/4NPAbxC4Cpn/api/v1/blocks?id=${id}&maxDepth=-1&fetchMetadata=false`,
    {
      headers: {
        Authorization: `Bearer ${craftKey}`
      }
    }
  );

  if (!response.ok) {
    return new Response('Failed to fetch post', { status: 500 });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};
