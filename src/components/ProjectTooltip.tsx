
'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/projects';

type ProjectTooltipProps = {
    project: Project;
    children: React.ReactNode;
};

export default function ProjectTooltip({ project, children }: ProjectTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className="max-w-xs p-4" side="top">
                    <div className="space-y-2">
                        <h3 className="font-headline text-lg font-bold text-primary">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
