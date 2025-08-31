
import AnimatedAvatar from '@/components/AnimatedAvatar';
import PortfolioTabs from '@/components/PortfolioTabs';

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

      <PortfolioTabs />
    </div>
  );
}
