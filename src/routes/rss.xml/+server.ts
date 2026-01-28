import type { RequestHandler } from '@sveltejs/kit';

interface Post {
  id: string;
  title: string;
}

interface ContentBlock {
  markdown?: string;
}

interface PostDetail {
  markdown: string;
  content: ContentBlock[];
}

export const GET: RequestHandler = async ({ fetch, url }) => {
  const craftKey = import.meta.env.VITE_APP_CRAFTKEY;
  const siteUrl = url.origin;

  const postsResponse = await fetch(
    'https://connect.craft.do/links/4NPAbxC4Cpn/api/v1/documents?fetchMetadata=false',
    {
      headers: {
        Authorization: `Bearer ${craftKey}`
      }
    }
  );

  if (!postsResponse.ok) {
    return new Response('Failed to fetch posts', { status: 500 });
  }

  const postsData = await postsResponse.json();
  const posts: Post[] = postsData.items.map(
    (item: { id: string; title: string }) => ({
      id: item.id,
      title: item.title
    })
  );

  const postDetails = await Promise.all(
    posts.slice(0, 20).map(async (post) => {
      const response = await fetch(
        `https://connect.craft.do/links/4NPAbxC4Cpn/api/v1/blocks?id=${post.id}&maxDepth=-1&fetchMetadata=false`,
        {
          headers: {
            Authorization: `Bearer ${craftKey}`
          }
        }
      );

      if (!response.ok) {
        return null;
      }

      const data: PostDetail = await response.json();
      const description = data.content
        .map((block) => block.markdown ?? '')
        .join(' ')
        .slice(0, 300);

      return {
        id: post.id,
        title: data.markdown || post.title,
        description:
          description.length === 300 ? description + '...' : description
      };
    })
  );

  const validPosts = postDetails.filter(Boolean);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Fatih Yılmaz</title>
        <description>Blog posts by Fatih Yılmaz</description>
        <link>${siteUrl}</link>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>tr</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${validPosts
          .map(
            (post) => `
        <item>
            <title><![CDATA[${post!.title}]]></title>
            <link>${siteUrl}/post/${post!.id}</link>
            <guid isPermaLink="true">${siteUrl}/post/${post!.id}</guid>
            <description><![CDATA[${post!.description}]]></description>
        </item>`
          )
          .join('')}
    </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
