'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Post } from '@/lib/posts';
import Image from 'next/image';

type BlogPostCardProps = {
  post: Post;
  index: number;
};

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, boxShadow: '0 10px 20px hsla(var(--primary) / 0.2)' }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden border-2 border-transparent transition-colors hover:border-primary">
        {post.coverImage && (
            <div className="relative h-48 w-full">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={post.imageHint}
                    className="object-cover"
                />
            </div>
        )}
        <CardHeader>
          <CardTitle className="font-headline text-2xl leading-tight">{post.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1 text-sm">
            <Calendar className="h-4 w-4" /> {post.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        #{tag}
                    </Badge>
                ))}
            </div>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href={`/blog/${post.slug}`}>
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
