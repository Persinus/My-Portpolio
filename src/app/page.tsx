import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Code, Dna, Settings, Star } from 'lucide-react';

const skills = {
  'Languages': ['TypeScript', 'JavaScript', 'Python', 'HTML5', 'CSS3'],
  'Frameworks & Libraries': ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
  'Databases & Cloud': ['Firebase', 'PostgreSQL', 'Google Cloud', 'Vercel'],
  'AI & ML': ['Genkit', 'TensorFlow', 'scikit-learn'],
  'Tools': ['Git', 'Docker', 'Figma', 'Webpack'],
};

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

export default function HomePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Character Sheet
        </h1>
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
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-3 font-semibold text-muted-foreground">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge key={item} variant="default" className="text-sm">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
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
