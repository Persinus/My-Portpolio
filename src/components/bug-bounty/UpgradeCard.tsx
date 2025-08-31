
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Upgrade = {
  id: string;
  name: string;
  level: number;
  cost: number;
  sps?: number;
  clickMultiplier?: number;
  icon: React.ReactNode;
};

type UpgradeCardProps = {
  upgrade: Upgrade;
  score: number;
  onPurchase: () => void;
};

const formatNumber = (num: number): string => {
    if (num < 1000) return num.toFixed(0);
    if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`;
    if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    return `${(num / 1_000_000_000).toFixed(2)}B`;
};


export default function UpgradeCard({ upgrade, score, onPurchase }: UpgradeCardProps) {
  return (
    <Card className={cn("flex items-center p-3 transition-colors", score < upgrade.cost && "bg-muted/50 text-muted-foreground")}>
      <div className="mr-4 text-2xl w-8 text-center">{upgrade.icon}</div>
      <div className="flex-grow">
        <h4 className="font-bold">{upgrade.name}</h4>
        <p className="text-sm">Giá: {formatNumber(upgrade.cost)} | Cấp: {upgrade.level}</p>
        {upgrade.sps !== undefined && <p className="text-xs text-primary">+{upgrade.sps.toFixed(1)} điểm/giây mỗi cấp</p>}
        {upgrade.clickMultiplier !== undefined && <p className="text-xs text-primary">+{upgrade.clickMultiplier} sức mạnh click mỗi cấp</p>}
      </div>
      <Button 
        onClick={onPurchase}
        disabled={score < upgrade.cost}
        variant="outline"
        size="sm"
      >
        <PlusCircle className="mr-2 h-4 w-4"/> Mua
      </Button>
    </Card>
  );
}
