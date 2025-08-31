
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Play } from 'lucide-react';
import { skills } from '@/lib/skills';

type ProjectCardProps = {
  project: Project;
  index: number;
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="relative h-48 w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={project.imageHint}
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Vai trò của tôi:</h4>
            <p className="text-sm text-muted-foreground">{project.myRole}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((techName) => {
              const skill = skills.find(s => s.name === techName);
              if (skill) {
                return (
                  <Badge
                    key={techName}
                    className="flex items-center gap-1.5 border-none"
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
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {project.githubLink && (
            <Button asChild variant="outline">
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github /> GitHub
              </Link>
            </Button>
          )}
          <Button asChild className="glow-accent">
              <Link href={`/portfolio/${project.slug}`}>
                <Play /> {project.gameLink ? "Chơi Game" : "Xem Chi Tiết"}
              </Link>
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
