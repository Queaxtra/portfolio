import type { RequestHandler } from '@sveltejs/kit';

const username = "queaxtra"; // replace with your hackmd username

export const GET: RequestHandler = async ({ fetch }) => {
    const response = await fetch(`https://hackmd.io/api/@${username}/overview`);
    if (!response.ok) {
        return new Response('Failed to fetch posts', { status: 500 });
    }

    const posts = await response.json();
    return new Response(JSON.stringify(posts.notes), {
        headers: { 'Content-Type': 'application/json' }
    });
};