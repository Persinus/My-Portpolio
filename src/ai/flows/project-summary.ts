// src/ai/flows/project-summary.ts
'use server';
/**
 * @fileOverview A flow for summarizing project details.
 *
 * - getProjectSummary - A function that takes project details and returns a concise summary.
 * - ProjectSummaryInput - The input type for the getProjectSummary function.
 * - ProjectSummaryOutput - The return type for the getProjectSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectSummaryInputSchema = z.object({
  description: z.string().describe('The detailed description of the project.'),
  githubLink: z.string().optional().describe('Link to the GitHub repository.'),
  demoLink: z.string().optional().describe('Link to the live demo of the project.'),
});
export type ProjectSummaryInput = z.infer<typeof ProjectSummaryInputSchema>;

const ProjectSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the project.'),
});
export type ProjectSummaryOutput = z.infer<typeof ProjectSummaryOutputSchema>;

export async function getProjectSummary(input: ProjectSummaryInput): Promise<ProjectSummaryOutput> {
  return projectSummaryFlow(input);
}

const projectSummaryPrompt = ai.definePrompt({
  name: 'projectSummaryPrompt',
  input: {schema: ProjectSummaryInputSchema},
  output: {schema: ProjectSummaryOutputSchema},
  prompt: `You are an AI assistant specialized in providing concise summaries of software development projects.

  Given the following project details, generate a short, one-sentence summary of the project.

  Description: {{{description}}}
  {{#if githubLink}}GitHub Link: {{{githubLink}}}{{/if}}
  {{#if demoLink}}Demo Link: {{{demoLink}}}{{/if}}

  Summary:`,
});

const projectSummaryFlow = ai.defineFlow(
  {
    name: 'projectSummaryFlow',
    inputSchema: ProjectSummaryInputSchema,
    outputSchema: ProjectSummaryOutputSchema,
  },
  async input => {
    const {output} = await projectSummaryPrompt(input);
    return output!;
  }
);
