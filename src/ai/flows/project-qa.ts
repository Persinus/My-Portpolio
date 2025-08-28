// This file uses server-side code.
'use server';

/**
 * @fileOverview An AI assistant that answers questions about specific projects in the portfolio.
 *
 * - projectQA - A function that handles the project question answering process.
 * - ProjectQAInput - The input type for the projectQA function.
 * - ProjectQAOutput - The return type for the projectQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectQAInputSchema = z.object({
  projectName: z.string().describe('The name of the project to ask questions about.'),
  question: z.string().describe('The question to ask about the project.'),
});
export type ProjectQAInput = z.infer<typeof ProjectQAInputSchema>;

const ProjectQAOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the project.'),
});
export type ProjectQAOutput = z.infer<typeof ProjectQAOutputSchema>;

export async function projectQA(input: ProjectQAInput): Promise<ProjectQAOutput> {
  return projectQAFlow(input);
}

const getProjectDetails = ai.defineTool(
  {
    name: 'getProjectDetails',
    description: 'Returns details about a specific project in the portfolio.',
    inputSchema: z.object({
      projectName: z.string().describe('The name of the project.'),
    }),
    outputSchema: z.object({
      name: z.string().describe('The name of the project.'),
      description: z.string().describe('A detailed description of the project.'),
      technologies: z.array(z.string()).describe('The technologies used in the project.'),
      myRole: z.string().describe('Your role in the project.'),
      githubLink: z.string().optional().describe('The link to the GitHub repository, if available.'),
      demoLink: z.string().optional().describe('The link to the live demo, if available.'),
    }),
  },
  async (input) => {
    // TODO: Replace with actual project details retrieval logic from a database or CMS
    // This is placeholder data for demonstration purposes.
    const projects = {
      'Portfolio Quest': {
        name: 'Portfolio Quest',
        description: 'A portfolio website designed as an interactive game.',
        technologies: ['Next.js', 'Firebase', 'Genkit', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
        myRole: 'Lead Developer and Designer',
        githubLink: 'https://github.com/example/portfolio-quest',
        demoLink: 'https://portfolio-quest.example.com',
      },
      'AI Plant Diagnosis': {
        name: 'AI Plant Diagnosis',
        description: 'A mobile app that diagnoses plant diseases using AI.',
        technologies: ['React Native', 'TensorFlow Lite', 'Firebase'],
        myRole: 'AI Model Integration and Mobile Development',
        githubLink: 'https://github.com/example/ai-plant-diagnosis',
      },
      // Add more projects as needed
    };

    const project = projects[input.projectName];
    if (!project) {
      throw new Error(`Project ${input.projectName} not found.`);
    }
    return project;
  }
);

const projectQAPrompt = ai.definePrompt({
  name: 'projectQAPrompt',
  tools: [getProjectDetails],
  input: {schema: ProjectQAInputSchema},
  output: {schema: ProjectQAOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about projects in a portfolio.

  The user will ask a question about a specific project. Use the getProjectDetails tool to retrieve information about the project.  Then answer the user's question based on the project details.

  Question: {{{question}}}
  Project Name: {{{projectName}}}`,
});

const projectQAFlow = ai.defineFlow(
  {
    name: 'projectQAFlow',
    inputSchema: ProjectQAInputSchema,
    outputSchema: ProjectQAOutputSchema,
  },
  async input => {
    const {output} = await projectQAPrompt(input);
    return output!;
  }
);
