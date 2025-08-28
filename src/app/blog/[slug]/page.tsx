import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          {post.coverImage && (
             <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    data-ai-hint={post.imageHint}
                    className="object-cover"
                />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" /> Published on {post.date}
            </p>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                {post.title}
            </h1>
            <div className="mt-4 flex justify-center flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
          </div>
        </header>
        
        <Card>
            <CardContent className="prose dark:prose-invert prose-lg max-w-none p-6 pt-6 prose-pre:bg-secondary prose-pre:text-secondary-foreground"
              dangerouslySetInnerHTML={{ __html: post.contentHTML }}
            />
        </Card>
      </article>
    </div>
  );
}
