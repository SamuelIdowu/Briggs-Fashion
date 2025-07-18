'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating related product recommendations based on a given product.
 *
 * It exports:
 * - `getRelatedProductRecommendations`: An async function to get related product recommendations.
 * - `RelatedProductRecommendationsInput`: The input type for the `getRelatedProductRecommendations` function.
 * - `RelatedProductRecommendationsOutput`: The output type for the `getRelatedProductRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelatedProductRecommendationsInputSchema = z.object({
  productName: z.string().describe('The name of the product to find related products for.'),
  productDescription: z.string().describe('The description of the product.'),
  productCategory: z.string().describe('The category of the product.'),
  productType: z.string().describe('The type of the product (e.g., ready-made, custom).'),
});
export type RelatedProductRecommendationsInput = z.infer<typeof RelatedProductRecommendationsInputSchema>;

const RelatedProductRecommendationsOutputSchema = z.object({
  relatedProducts: z.array(
    z.object({
      name: z.string().describe('The name of the related product.'),
      description: z.string().describe('A brief description of the related product.'),
      category: z.string().describe('The category of the related product.'),
      type: z.string().describe('The type of the related product.'),
    })
  ).describe('An array of related products with their names, descriptions, categories and types.'),
});
export type RelatedProductRecommendationsOutput = z.infer<typeof RelatedProductRecommendationsOutputSchema>;

export async function getRelatedProductRecommendations(input: RelatedProductRecommendationsInput): Promise<RelatedProductRecommendationsOutput> {
  return relatedProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'relatedProductRecommendationsPrompt',
  input: {schema: RelatedProductRecommendationsInputSchema},
  output: {schema: RelatedProductRecommendationsOutputSchema},
  prompt: `You are a fashion expert. Based on the details of the product below, recommend other products that the user might be interested in.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
Product Category: {{{productCategory}}}
Product Type: {{{productType}}}

Consider suggesting products that are similar in style, category, or that complement the given product. Suggest at least 3 related products.

Output the related products in JSON format. Include the name, description, category, and type for each product.
`,
});

const relatedProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'relatedProductRecommendationsFlow',
    inputSchema: RelatedProductRecommendationsInputSchema,
    outputSchema: RelatedProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
