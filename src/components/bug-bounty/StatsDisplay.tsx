
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

type StatsDisplayProps = {
  score: number;
  sps: number;
  prestigeBonus: number;
  stats: {
    totalScore: number;
    totalClicks: number;
    bugsFixed: number;
    prestigeCount: number;
  };
};

const formatNumber = (num: number, precision: number = 2): string => {
  if (num < 1000) return num.toFixed(1);
  if (num < 1_000_000) return `${(num / 1000).toFixed(precision)}K`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(precision)}M`;
  return `${(num / 1_000_000_000).toFixed(precision)}B`;
};


export default function StatsDisplay({ score, sps, prestigeBonus, stats }: StatsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{formatNumber(score)}</CardTitle>
        <CardDescription>Điểm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-primary">{formatNumber(sps * prestigeBonus, 2)} điểm / giây</p>
        <div className="flex items-center text-muted-foreground">
          <p>Lợi thế lập trình viên: <span className="font-bold text-purple-400">x{prestigeBonus.toFixed(2)}</span></p>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 ml-1 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mỗi lần Tái Sinh (Prestige) tăng 10% sản lượng điểm.</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-muted-foreground">Tổng số bug đã sửa: {formatNumber(stats.bugsFixed, 0)}</p>
        <p className="text-muted-foreground">Tổng số click: {formatNumber(stats.totalClicks, 0)}</p>
      </CardContent>
    </Card>
  );
}
