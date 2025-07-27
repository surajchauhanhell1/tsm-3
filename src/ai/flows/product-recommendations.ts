import { ai } from '../genkit';

/**
 * Generate product recommendations based on user preferences and requirements
 * @param ingredients List of ingredients the vendor is looking for
 * @param location Vendor's location for proximity-based recommendations
 * @param budget Budget constraints (low, medium, high)
 * @returns AI-generated recommendations for products and suppliers
 */
export async function generateProductRecommendations(
  ingredients: string[],
  location: string = 'Mumbai, Maharashtra',
  budget: 'low' | 'medium' | 'high' = 'medium'
) {
  try {
    const prompt = `
      As a supply chain assistant for street food vendors in India, provide personalized recommendations 
      for the following ingredients: ${ingredients.join(', ')}.
      
      The vendor is located in ${location} and has a ${budget} budget.
      
      For each ingredient, recommend:
      1. The best quality supplier in the area
      2. Typical price range
      3. Seasonal availability
      4. Quality indicators to look for
      5. Storage tips to reduce waste
      
      Format your response as structured recommendations that can be easily parsed.
    `;

    const response = await ai.chat({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. Provide helpful, accurate recommendations based on local market knowledge.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return response.text();
  } catch (error) {
    console.error('Error generating product recommendations:', error);
    return 'Unable to generate recommendations at this time. Please try again later.';
  }
}

/**
 * Generate cost optimization suggestions for vendors
 * @param currentIngredients Current ingredients and their costs
 * @param menuItems Menu items that use these ingredients
 * @returns AI-generated cost optimization suggestions
 */
export async function generateCostOptimizationSuggestions(
  currentIngredients: Array<{name: string, cost: number, quantity: string}>,
  menuItems: Array<{name: string, ingredients: string[]}>
) {
  try {
    const ingredientsText = currentIngredients
      .map(ing => `${ing.name}: ₹${ing.cost} per ${ing.quantity}`)
      .join('\n');

    const menuItemsText = menuItems
      .map(item => `${item.name}: ${item.ingredients.join(', ')}`)
      .join('\n');

    const prompt = `
      As a cost optimization expert for street food vendors in India, analyze the following ingredients and menu items:
      
      Current Ingredients:
      ${ingredientsText}
      
      Menu Items:
      ${menuItemsText}
      
      Provide 3-5 specific suggestions to optimize costs while maintaining quality, including:
      1. Ingredient substitutions or alternatives
      2. Bulk purchasing opportunities
      3. Seasonal adjustments
      4. Supplier recommendations
      5. Waste reduction strategies
      
      For each suggestion, include the estimated cost savings percentage.
    `;

    const response = await ai.chat({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. Provide practical, actionable cost optimization advice based on local market knowledge.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return response.text();
  } catch (error) {
    console.error('Error generating cost optimization suggestions:', error);
    return 'Unable to generate cost optimization suggestions at this time. Please try again later.';
  }
}

/**
 * Generate market insights for suppliers
 * @param productCategories Categories of products the supplier offers
 * @param targetRegion Target region for market insights
 * @returns AI-generated market insights for suppliers
 */
export async function generateMarketInsights(
  productCategories: string[],
  targetRegion: string = 'Mumbai, Maharashtra'
) {
  try {
    const prompt = `
      As a market analyst for food suppliers in India, provide detailed insights for a supplier 
      specializing in ${productCategories.join(', ')} in the ${targetRegion} region.
      
      Include in your analysis:
      1. Current demand trends for these categories among street food vendors
      2. Pricing strategies that would be competitive yet profitable
      3. Emerging opportunities or gaps in the market
      4. Seasonal fluctuations to anticipate
      5. Distribution and logistics recommendations
      
      Format your response as structured insights that can be easily parsed.
    `;

    const response = await ai.chat({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. Provide data-driven market insights based on local market knowledge.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return response.text();
  } catch (error) {
    console.error('Error generating market insights:', error);
    return 'Unable to generate market insights at this time. Please try again later.';
  }
}