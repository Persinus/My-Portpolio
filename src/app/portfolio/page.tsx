
import ProjectCard from '@/components/ProjectCard';
import RippleEffect from '@/components/RippleEffect';
import { projects } from '@/lib/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, LayoutGrid } from 'lucide-react';
import InventoryGrid from '@/components/InventoryGrid';
import AnimatedAvatar from '@/components/AnimatedAvatar';

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Chọn Nhiệm Vụ
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Mỗi dự án là một thế giới riêng. Khám phá chúng để xem tôi đã xây dựng những gì.
        </p>
      </div>

      <Tabs defaultValue="card-list" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="card-list">
              <List className="mr-2" />
              Danh Sách
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <LayoutGrid className="mr-2" />
              Túi Đồ
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
           <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
                <div className="md:col-span-3 flex justify-center items-start">
                   <div className="sticky top-24">
                     <AnimatedAvatar />
                     <h3 className="text-center mt-4 font-headline text-2xl">Người Chơi</h3>
                   </div>
                </div>
                <div className="md:col-span-7">
                    <InventoryGrid />
                </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
