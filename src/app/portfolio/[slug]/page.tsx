
import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { skills } from '@/lib/skills';
import Image from 'next/image';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

// Function to determine text color (black or white) based on background color brightness
const getTextColor = (bgColor: string) => {
  if (!bgColor) return '#000000';
  const color = bgColor.startsWith('#') ? bgColor.substring(1) : bgColor;
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma < 128 ? '#FFFFFF' : '#000000';
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
              {project.technologies.map((techName) => {
                 const skill = skills.find(s => s.name === techName);
                 if (skill) {
                   return (
                     <Badge
                       key={techName}
                       className="flex items-center gap-1.5 border-none px-3 py-1"
                       style={{ backgroundColor: skill.color, color: getTextColor(skill.color) }}
                     >
                       {skill.icon && <Image src={skill.icon} alt={skill.name} width={14} height={14} className="filter-brightness-saturate" />}
                       <span>{skill.name}</span>
                     </Badge>
                   )
                 }
                 return <Badge key={techName} variant="secondary">{techName}</Badge>
              })}
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
