import { ai } from '../genkit';

/**
 * Analyze order patterns and provide insights
 * @param orders Array of order data for analysis
 * @param userType Type of user requesting analysis ('vendor' or 'supplier')
 * @returns AI-generated order pattern analysis and recommendations
 */
export async function analyzeOrderPatterns(
  orders: Array<{
    id: string;
    date: string;
    product?: string;
    quantity?: number;
    status: string;
  }>,
  userType: 'vendor' | 'supplier'
) {
  try {
    // Format orders data for the AI prompt
    const ordersData = orders.map(order => ({
      date: order.date,
      product: order.product,
      quantity: order.quantity,
      status: order.status
    }));

    const ordersText = JSON.stringify(ordersData, null, 2);
    
    let prompt = '';
    
    if (userType === 'vendor') {
      prompt = `
        As a purchasing analyst for a street food vendor in India, analyze the following order history:
        
        ${ordersText}
        
        Provide insights on:
        1. Ordering patterns and frequency
        2. Most frequently ordered ingredients
        3. Price fluctuations and trends
        4. Recommendations for optimizing order quantities
        5. Suggestions for better inventory management
        6. Potential cost-saving opportunities
        
        Format your response as structured insights that can be easily read by the vendor.
      `;
    } else {
      prompt = `
        As a sales analyst for a food supplier in India, analyze the following order history from your customers:
        
        ${ordersText}
        
        Provide insights on:
        1. Product demand patterns and trends
        2. Most popular products and potential bundle opportunities
        3. Customer ordering behavior
        4. Recommendations for inventory management
        5. Potential upselling or cross-selling opportunities
        6. Pricing optimization suggestions
        
        Format your response as structured insights that can be easily read by the supplier.
      `;
    }

    const response = await ai.chat({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. Provide data-driven analysis and actionable recommendations based on order history.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return response.text();
  } catch (error) {
    console.error('Error analyzing order patterns:', error);
    return 'Unable to analyze order patterns at this time. Please try again later.';
  }
}

/**
 * Generate rejection reason analysis and recommendations
 * @param orders Array of rejected orders with reasons
 * @returns AI-generated analysis of rejection patterns and recommendations
 */
export async function analyzeRejectionReasons(
  rejections: Array<{
    id: string;
    date: string;
    reason: string;
  }>
) {
  try {
    // Format rejection data for the AI prompt
    const rejectionData = rejections.map(rejection => ({
      date: rejection.date,
      reason: rejection.reason
    }));

    const rejectionText = JSON.stringify(rejectionData, null, 2);
    
    const prompt = `
      Analyze the following rejected/cancelled orders and their reasons:
      
      ${rejectionText}
      
      Provide insights on:
      1. Common patterns in rejection/cancellation reasons
      2. Potential underlying issues that need to be addressed
      3. Specific recommendations to reduce rejection/cancellation rates
      4. Suggestions for improving communication between vendors and suppliers
      
      Format your response as structured insights with clear, actionable recommendations.
    `;

    const response = await ai.chat({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. Provide helpful analysis of order rejections and cancellations to improve the platform experience.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return response.text();
  } catch (error) {
    console.error('Error analyzing rejection reasons:', error);
    return 'Unable to analyze rejection reasons at this time. Please try again later.';
  }
}

/**
 * Generate delivery optimization recommendations
 * @param deliveryData Array of delivery data for analysis
 * @param location Central location for delivery optimization
 * @returns AI-generated delivery optimization recommendations
 */
export async function generateDeliveryOptimizations(
  deliveryData: Array<{
    orderId: string;
    deliveryDate: Date;
    location: string;
    items: Array<{ name: string; quantity: number; weight?: number }>;
  }>,
  location: string = 'Mumbai, Maharashtra'
) {
  try {
    // Format delivery data for the AI prompt
    const formattedData = deliveryData.map(delivery => ({
      orderId: delivery.orderId,
      deliveryDate: delivery.deliveryDate.toISOString().split('T')[0],
      location: delivery.location,
      items: delivery.items.map(item => `${item.name} (${item.quantity}${item.weight ? `, ${item.weight}kg` : ''})`).join(', ')
    }));

    const deliveryText = JSON.stringify(formattedData, null, 2);
    
    const prompt = `
      As a logistics optimization expert for food suppliers in India, analyze the following delivery data:
      
      ${deliveryText}
      
      The central hub location is ${location}.
      
      Provide recommendations on:
      1. Optimal delivery routes and grouping
      2. Delivery scheduling to minimize costs
      3. Strategies to reduce delivery times
      4. Inventory staging suggestions
      5. Potential areas for delivery service improvement
      
      Format your response as structured recommendations with clear, actionable steps.
    `;

    const response = await ai.chat({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. Provide practical, data-driven delivery optimization recommendations.'
        },
        { role: 'user', content: prompt }
      ]
    });

    return response.text();
  } catch (error) {
    console.error('Error generating delivery optimizations:', error);
    return 'Unable to generate delivery optimizations at this time. Please try again later.';
  }
}