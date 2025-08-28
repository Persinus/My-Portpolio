
'use client';

import { projects } from '@/lib/projects';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import ProjectTooltip from './ProjectTooltip';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function InventoryGrid() {
  const gridSlots = Array(20).fill(null);
  projects.forEach((project, index) => {
    if (index < gridSlots.length) {
      gridSlots[index] = project;
    }
  });

  return (
    <Card className="max-w-4xl mx-auto p-4 md:p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
      <motion.div 
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gridSlots.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div
              className="aspect-square w-full rounded-md bg-muted/30 border border-border/50 flex items-center justify-center transition-all duration-300 hover:bg-accent/20 hover:border-accent"
            >
              {project ? (
                <ProjectTooltip project={project}>
                  <Link href={`/portfolio/${project.slug}`} className="relative w-full h-full p-2 group">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="10vw"
                        className="object-contain transform transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={project.imageHint}
                      />
                  </Link>
                </ProjectTooltip>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
}
