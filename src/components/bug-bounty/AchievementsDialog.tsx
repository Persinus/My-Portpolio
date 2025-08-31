
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Award } from 'lucide-react';
import { type Achievement } from './achievements';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type AchievementsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
};

export default function AchievementsDialog({ isOpen, onClose, achievements }: AchievementsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thành Tựu</DialogTitle>
          <DialogDescription>
            Những cột mốc bạn đã chinh phục trên con đường diệt bug.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
            <div className="space-y-4 pr-4">
            {achievements.map(ach => (
                <div key={ach.id} className={cn("flex items-center gap-4 p-4 rounded-lg border", ach.unlocked ? "border-yellow-500 bg-yellow-500/10" : "border-border bg-muted/50 opacity-60")}>
                    <Award className={cn("h-8 w-8", ach.unlocked ? "text-yellow-500" : "text-muted-foreground")} />
                    <div>
                        <h4 className="font-bold">{ach.name}</h4>
                        <p className="text-sm text-muted-foreground">{ach.description}</p>
                    </div>
                </div>
            ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
