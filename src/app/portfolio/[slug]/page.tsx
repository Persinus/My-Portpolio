import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import Link from 'next/link';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-lg text-muted-foreground">
          {project.description}
        </p>
      </div>

      {project.gameLink ? (
        <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border-2 border-primary glow-primary mb-12">
          <iframe
            src={project.gameLink}
            className="w-full h-full"
            allow="fullscreen"
            title={project.name}
          ></iframe>
        </div>
      ) : (
         <div className="text-center my-12 p-8 bg-muted rounded-lg">
            <p className="text-muted-foreground">This project does not have a playable demo.</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-2">My Role</h3>
            <p className="text-muted-foreground">{project.myRole}</p>
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
             <h3 className="font-headline text-xl font-semibold">Project Links</h3>
            {project.githubLink && (
                <Button asChild variant="outline" className="w-full">
                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github /> GitHub
                </Link>
                </Button>
            )}
             {project.demoLink && (
                <Button asChild variant="outline" className="w-full">
                <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    Live Demo
                </Link>
                </Button>
            )}
        </div>
      </div>
    </div>
  );
}
