import ProjectCard from '@/components/ProjectCard';
import RippleEffect from '@/components/RippleEffect';
import { projects } from '@/lib/projects';
import FogWrapper from '@/components/FogWrapper';

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Choose Your Mission
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Each project is a world of its own. Explore them to see what I can build.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <FogWrapper key={project.slug}>
            <RippleEffect>
              <ProjectCard project={project} index={index} />
            </RippleEffect>
          </FogWrapper>
        ))}
      </div>
    </div>
  );
}
