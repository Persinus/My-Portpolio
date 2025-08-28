export type Project = {
  name: string;
  description: string;
  technologies: string[];
  myRole: string;
  githubLink?: string;
  demoLink?: string;
  image: string;
  imageHint: string;
};

export const projects: Project[] = [
  {
    name: 'Portfolio Quest',
    description: 'A portfolio website designed as an interactive game to showcase projects in a fun, engaging way.',
    technologies: ['Next.js', 'Firebase', 'Genkit', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
    myRole: 'Lead Developer and Designer',
    githubLink: 'https://github.com/example/portfolio-quest',
    demoLink: 'https://portfolio-quest.example.com',
    image: 'https://picsum.photos/600/400',
    imageHint: 'game interface',
  },
  {
    name: 'AI Plant Diagnosis',
    description: 'A mobile app that uses a custom-trained machine learning model to diagnose plant diseases from images.',
    technologies: ['React Native', 'TensorFlow Lite', 'Firebase'],
    myRole: 'AI Model Integration and Mobile Development',
    githubLink: 'https://github.com/example/ai-plant-diagnosis',
    image: 'https://picsum.photos/600/400',
    imageHint: 'plant technology',
  },
];
