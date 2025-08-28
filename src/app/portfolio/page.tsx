
import ProjectCard from '@/components/ProjectCard';
import RippleEffect from '@/components/RippleEffect';
import { projects } from '@/lib/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, LayoutGrid } from 'lucide-react';
import InventoryGrid from '@/components/InventoryGrid';

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

      <Tabs defaultValue="card-list" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="card-list">
              <List className="mr-2" />
              Card List
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <LayoutGrid className="mr-2" />
              Inventory
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="card-list">
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <RippleEffect key={project.slug}>
                <ProjectCard project={project} index={index} />
              </RippleEffect>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="inventory">
           <InventoryGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}
