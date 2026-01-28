import { marked } from 'marked';

export interface ContentBlock {
  id: string;
  type: string;
  markdown?: string;
  textStyle?: string;
  listStyle?: string;
  indentationLevel?: number;
  decorations?: string[];
  url?: string;
  altText?: string;
}

export interface RenderedBlock {
  type: 'html' | 'image';
  content?: string;
  url?: string;
  altText?: string;
  id: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Post {
  id: string;
  type: string;
  textStyle?: string;
  markdown: string;
  content: ContentBlock[];
}

export interface PostMeta {
  id: string;
  title: string;
  createdAt: string;
}

export function calculateReadingTime(content: ContentBlock[]): number {
  let wordCount = 0;
  for (const block of content) {
    if (block.markdown) {
      wordCount += block.markdown
        .split(/\s+/)
        .filter((w) => w.length > 0).length;
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function extractTableOfContents(content: ContentBlock[]): TocItem[] {
  const toc: TocItem[] = [];
  for (const block of content) {
    if (block.textStyle === 'h2' || block.textStyle === 'h3') {
      const text = block.markdown?.replace(/^#+\s*/, '') ?? '';
      const level = block.textStyle === 'h2' ? 2 : 3;
      toc.push({ id: block.id, text, level });
    }
  }
  return toc;
}

export async function renderMarkdownBuffer(
  buffer: { markdown: string; id?: string; textStyle?: string }[]
): Promise<string> {
  let html = '';
  for (const item of buffer) {
    let blockHtml = await marked(item.markdown);

    if (item.textStyle === 'h2' || item.textStyle === 'h3') {
      blockHtml = blockHtml.replace(
        /<(h[23])>/,
        `<$1 id="heading-${item.id}">`
      );
    }

    html += blockHtml;
  }
  return html;
}

export async function processContentBlocks(
  blocks: ContentBlock[],
  imageLoadingStates: Record<string, boolean>
): Promise<RenderedBlock[]> {
  const result: RenderedBlock[] = [];
  let markdownBuffer: { markdown: string; id?: string; textStyle?: string }[] =
    [];

  for (const block of blocks) {
    if (block.type === 'image' && block.url) {
      if (markdownBuffer.length > 0) {
        const html = await renderMarkdownBuffer(markdownBuffer);
        result.push({
          type: 'html',
          content: html,
          id: `html-${result.length}`
        });
        markdownBuffer = [];
      }
      imageLoadingStates[block.id] = false;
      result.push({
        type: 'image',
        url: block.url,
        altText: block.altText,
        id: block.id
      });
      continue;
    }

    if (block.markdown) {
      markdownBuffer.push({
        markdown: block.markdown,
        id: block.id,
        textStyle: block.textStyle
      });
    }
  }

  if (markdownBuffer.length > 0) {
    const html = await renderMarkdownBuffer(markdownBuffer);
    result.push({ type: 'html', content: html, id: `html-${result.length}` });
  }

  return result;
}

export async function fetchAllPosts(): Promise<PostMeta[]> {
  const response = await fetch('/api/posts/fetch/all');
  if (!response.ok) {
    return [];
  }
  return response.json();
}

export async function fetchPost(id: string): Promise<Post | null> {
  const response = await fetch(`/api/post/${id}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export async function fetchAdjacentPosts(
  currentId: string
): Promise<{ prev: PostMeta | null; next: PostMeta | null }> {
  const posts = await fetchAllPosts();
  const currentIndex = posts.findIndex((p) => p.id === currentId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return { prev, next };
}
