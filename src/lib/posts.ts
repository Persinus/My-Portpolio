import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  contentHTML: string;
  coverImage?: string;
  imageHint?: string;
};

function getPostData(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = remark()
    .use(html)
    .processSync(matterResult.content);
  const contentHTML = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt,
    coverImage: matterResult.data.coverImage,
    imageHint: matterResult.data.imageHint,
    contentHTML,
  };
}

export function getAllPosts(): Post[] {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    // You can also create some initial posts here if you want
    fs.writeFileSync(path.join(postsDirectory, 'my-first-post.md'), 
`---
title: 'My First Post'
date: '2024-01-01'
tags: ['devlog', 'gamedev']
excerpt: 'This is the beginning of my game dev journey, documented for all to see.'
coverImage: 'https://picsum.photos/400/200'
imageHint: 'game development'
---

Welcome to my new blog! Here I'll be sharing my journey into game development.
`);
    fs.writeFileSync(path.join(postsDirectory, 'optimizing-shaders.md'), 
`---
title: 'Optimizing Shaders for Web Games'
date: '2024-02-15'
tags: ['shaders', 'webgl', 'optimization']
excerpt: 'A deep dive into how I improved performance by optimizing my custom shaders.'
coverImage: 'https://picsum.photos/400/200'
imageHint: 'code shader'
---

Shaders are powerful, but can be a performance bottleneck. In this post, we'll explore techniques to optimize them for web-based games.
`);
  }


  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map(fileName => getPostData(fileName));

  // Sort posts by date in descending order
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): Post | undefined {
    const allPosts = getAllPosts();
    return allPosts.find(p => p.slug === slug);
}
