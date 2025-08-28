export type Project = {
  name: string;
  slug: string;
  description: string;
  technologies: string[];
  myRole: string;
  githubLink?: string;
  demoLink?: string;
  gameLink?: string;
  image: string;
  imageHint: string;
};

export const projects: Project[] = [
  {
    name: 'Portfolio Quest',
    slug: 'portfolio-quest',
    description: 'A portfolio website designed as an interactive game to showcase projects in a fun, engaging way.',
    technologies: ['Next.js', 'Firebase', 'Genkit', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
    myRole: 'Lead Developer and Designer',
    githubLink: 'https://github.com/example/portfolio-quest',
    demoLink: 'https://portfolio-quest.example.com',
    image: 'https://picsum.photos/600/400',
    imageHint: 'game interface',
  },
  {
    name: 'Asteroid Voyager',
    slug: 'asteroid-voyager',
    description: 'A retro-style arcade game where you navigate a spaceship through a treacherous asteroid field.',
    technologies: ['HTML5 Canvas', 'JavaScript', 'Webpack'],
    myRole: 'Game Developer',
    githubLink: 'https://github.com/example/asteroid-voyager',
    gameLink: 'https://html5-space-shooter.glitch.me/',
    image: 'https://picsum.photos/600/400',
    imageHint: 'space shooter game',
  },
  {
    name: 'AI Plant Diagnosis',
    slug: 'ai-plant-diagnosis',
    description: 'A mobile app that uses a custom-trained machine learning model to diagnose plant diseases from images.',
    technologies: ['React Native', 'TensorFlow Lite', 'Firebase'],
    myRole: 'AI Model Integration and Mobile Development',
    githubLink: 'https://github.com/example/ai-plant-diagnosis',
    image: 'https://picsum.photos/600/400',
    imageHint: 'plant technology',
  },
];
