
'use server';
/**
 * @fileOverview A flow for generating code challenges.
 *
 * - codeChallenge - A function that creates a code snippet, a question, and multiple-choice answers.
 * - CodeChallengeInput - The input type for the codeChallenge function.
 * - CodeChallengeOutput - The return type for the codeChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeChallengeInputSchema = z.object({
  topic: z.string().describe('The programming topic for the challenge (e.g., "React Hooks", "JavaScript Closures").'),
});
export type CodeChallengeInput = z.infer<typeof CodeChallengeInputSchema>;

const CodeChallengeOutputSchema = z.object({
  codeSnippet: z.string().describe('A concise code snippet related to the topic, formatted for display.'),
  question: z.string().describe('A clear, specific question about the provided code snippet.'),
  choices: z.array(z.string()).length(4).describe('An array of exactly four multiple-choice answers. One must be correct.'),
  correctAnswer: z.string().describe('The correct answer from the choices array.'),
});
export type CodeChallengeOutput = z.infer<typeof CodeChallengeOutputSchema>;

export async function codeChallenge(input: CodeChallengeInput): Promise<CodeChallengeOutput> {
  return codeChallengeFlow(input);
}

const codeChallengePrompt = ai.definePrompt({
  name: 'codeChallengePrompt',
  input: {schema: CodeChallengeInputSchema},
  output: {schema: CodeChallengeOutputSchema},
  prompt: `You are an expert programming instructor who creates educational code challenges.

  Your task is to generate a code challenge based on the following topic: {{{topic}}}.

  The challenge must include:
  1.  A short, clear, and syntactically correct code snippet.
  2.  A specific, multiple-choice question about the code snippet's behavior, output, or concept.
  3.  Exactly four possible answers (choices).
  4.  A clear designation of the single correct answer.

  Ensure the question is not ambiguous and the correct answer is definitively right based on the code snippet. The incorrect answers should be plausible but flawed.
  `,
});

const codeChallengeFlow = ai.defineFlow(
  {
    name: 'codeChallengeFlow',
    inputSchema: CodeChallengeInputSchema,
    outputSchema: CodeChallengeOutputSchema,
  },
  async (input) => {
    const {output} = await codeChallengePrompt(input);
    return output!;
  }
);
