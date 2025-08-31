
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, CheckCircle2, ShoppingCart } from 'lucide-react';
import { type EditorTheme, editorThemes } from './editorThemes';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type SkinShopProps = {
  score: number;
  purchasedSkins: string[];
  equippedSkinId: string;
  onPurchase: (skin: EditorTheme) => void;
  onEquip: (skin: EditorTheme) => void;
};

const formatNumber = (num: number): string => {
    if (num < 1000) return num.toFixed(0);
    if (num < 1_000_000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1_000_000).toFixed(1)}M`;
};

export default function SkinShop({ score, purchasedSkins, equippedSkinId, onPurchase, onEquip }: SkinShopProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Palette /> Cửa Hàng Skin</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-3">
          <div className="space-y-2">
            {editorThemes.map((theme) => {
              const isPurchased = purchasedSkins.includes(theme.id);
              const isEquipped = equippedSkinId === theme.id;
              const canAfford = score >= theme.cost;

              return (
                <TooltipProvider key={theme.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={cn("flex items-center gap-2 p-2 rounded-md border", isEquipped && 'border-primary ring-2 ring-primary')}>
                        <div className={cn("w-8 h-8 rounded-md border-2", theme.style)}></div>
                        <div className="flex-grow">
                          <p className="font-semibold">{theme.name}</p>
                          <p className="text-xs text-muted-foreground">Giá: {formatNumber(theme.cost)}</p>
                        </div>
                        {isPurchased ? (
                          <Button
                            size="sm"
                            variant={isEquipped ? "default" : "outline"}
                            onClick={() => onEquip(theme)}
                            disabled={isEquipped}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {isEquipped ? 'Đã Trang Bị' : 'Trang Bị'}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => onPurchase(theme)}
                            disabled={!canAfford}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Mua
                          </Button>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{theme.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

    