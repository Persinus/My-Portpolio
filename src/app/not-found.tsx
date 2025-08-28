import { Button } from '@/components/ui/button';
import { Map, Compass } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
      <div className="relative">
        <Map className="h-40 w-40 text-muted-foreground/20" />
        <Compass className="absolute bottom-4 right-4 h-16 w-16 animate-spin text-primary opacity-50" style={{ animationDuration: '10s' }} />
      </div>
      <h1 className="mt-8 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
        404 - Bạn đã đi lạc!
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Có vẻ như bạn đã đi vào một vùng đất chưa được khám phá trên bản đồ. Đừng lo, chúng ta có thể quay lại.
      </p>
      <Button asChild size="lg" className="mt-8 glow-primary">
        <Link href="/">Dịch chuyển về căn cứ</Link>
      </Button>
    </div>
  );
}
