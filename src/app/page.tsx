import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Code, Dna, Settings, Star } from 'lucide-react';
import { skills } from '@/lib/skills';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedAvatar from '@/components/AnimatedAvatar';

const experience = [
  {
    role: 'Lead Developer & Designer',
    company: 'Portfolio Quest',
    period: '2023 - Present',
    description: 'Spearheaded the development of this interactive portfolio, combining web development with game design principles to create an engaging user experience.',
  },
  {
    role: 'AI Engineer',
    company: 'Side Projects',
    period: '2022 - Present',
    description: 'Developed various AI-powered applications, including a plant disease diagnosis app and several generative AI tools for creative content generation.',
  },
];

// Function to determine text color (black or white) based on background color brightness
const getTextColor = (bgColor: string) => {
  if (!bgColor) return '#000000';
  const color = bgColor.substring(1); // remove #
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma < 128 ? '#FFFFFF' : '#000000';
};


export default function HomePage() {
  const languages = skills.filter(s => s.type === 'language');
  const frameworks = skills.filter(s => s.type === 'framework');
  
  return (
    <div className="container mx-auto py-12">

      {/* Hero Section */}
      <section className="mb-20 text-center lg:text-left">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                    Xin chào! Tôi là <span className="text-primary glow-primary">Persinus</span>
                </h1>
                <p className="mt-4 max-w-xl text-xl text-muted-foreground">
                    Game Developer | Unity Enthusiast | Godot & C# Lover
                </p>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                    Đam mê sáng tạo, yêu thích xây dựng thế giới ảo và trải nghiệm mới cho người chơi.
                </p>
                 <div className="mt-8 flex justify-center gap-4 lg:justify-start">
                    <Button asChild size="lg" className="glow-accent">
                    <Link href="/portfolio">Xem Dự Án</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Liên Hệ</Link>
                    </Button>
                </div>
            </div>
            <div className="order-1 flex justify-center lg:order-2">
                <AnimatedAvatar />
            </div>
          </div>
      </section>

      {/* Character Sheet Section */}
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Character Sheet
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          An overview of my professional stats and journey so far.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Skills Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Star className="text-primary glow-primary" /> Skill Tree
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
                <h3 className="mb-3 font-semibold text-muted-foreground">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-bold" style={{ backgroundColor: skill.color, color: getTextColor(skill.color) }}>
                       {skill.short}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-muted-foreground">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map((skill) => (
                     <div key={skill.name} className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold" style={{ backgroundColor: skill.color, color: getTextColor(skill.color) }}>
                      {skill.icon && <Image src={skill.icon} alt={skill.name} width={16} height={16} className="filter-brightness-saturate" />}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
          </CardContent>
        </Card>

        {/* Core Attributes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Dna className="text-primary glow-primary" /> Core Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Code className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold">Problem Solving</h3>
                <p className="text-sm text-muted-foreground">Thrives on complex challenges and architecting elegant, scalable solutions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Settings className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold">Adaptability</h3>
                <p className="text-sm text-muted-foreground">Quickly learns and applies new technologies to meet project requirements.</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Briefcase className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold">Product Mindset</h3>
                <p className="text-sm text-muted-foreground">Focuses on user needs to build products that are both functional and delightful.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience Card */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Briefcase className="text-primary glow-primary" /> Experience Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.role} className="relative pl-6">
                 <div className="absolute left-0 top-1 h-full w-px bg-border"></div>
                 <div className="absolute left-[-5px] top-2 h-3 w-3 rounded-full bg-primary glow-primary"></div>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <h3 className="font-headline text-lg font-semibold">{exp.role} - {exp.company}</h3>
                <p className="mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
