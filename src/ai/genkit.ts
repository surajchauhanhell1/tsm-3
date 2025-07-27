// Browser-compatible AI implementation

// Mock AI implementation for client-side rendering
class ClientAI {
  async chat({ messages }: { messages: Array<{ role: string; content: string }> }) {
    console.log('Client AI chat called with messages:', messages);
    // Return a mock response object with a text method
    return {
      text: () => {
        // Get the last user message
        const lastUserMessage = messages.find(m => m.role === 'user')?.content || '';
        
        // Return different mock responses based on the content
        if (lastUserMessage.toLowerCase().includes('recommend') && lastUserMessage.toLowerCase().includes('product')) {
          return 'Here are some product recommendations based on your requirements:\n\n1. **Fresh Tomatoes**\n   - Supplier: FreshVeg Supplies, Mumbai\n   - Price Range: ₹40-60 per kg\n   - Seasonal Availability: Year-round, best quality in winter\n   - Quality Indicators: Firm, bright red, no blemishes\n   - Storage Tips: Store at room temperature, away from direct sunlight\n\n2. **Onions**\n   - Supplier: Kisan Vegetable Mart, Navi Mumbai\n   - Price Range: ₹25-40 per kg\n   - Seasonal Availability: Year-round\n   - Quality Indicators: Firm, dry outer skin, no soft spots\n   - Storage Tips: Store in a cool, dry place with good ventilation\n\n3. **Rice**\n   - Supplier: Annapurna Grains, Thane\n   - Price Range: ₹60-90 per kg depending on variety\n   - Seasonal Availability: Year-round\n   - Quality Indicators: Uniform grain size, no broken grains\n   - Storage Tips: Store in airtight containers in a cool, dry place';
        } else if (lastUserMessage.toLowerCase().includes('order') && (lastUserMessage.toLowerCase().includes('pattern') || lastUserMessage.toLowerCase().includes('analysis'))) {
          return 'Based on your order history, here are some insights:\n\n1. **Ordering Patterns**\n   - You order rice consistently every 10 days\n   - Vegetable orders are more frequent (every 2-3 days)\n   - Most orders are placed in the morning (8-10 AM)\n\n2. **Most Frequently Ordered Items**\n   - Rice (50kg per order)\n   - Tomatoes (20kg per order)\n   - Onions (30kg per order)\n\n3. **Recommendations**\n   - Consider bulk ordering rice monthly to get better rates\n   - Tomatoes and onions could be ordered together to save on delivery costs\n   - Schedule deliveries during off-peak hours for faster service';
        } else if (lastUserMessage.toLowerCase().includes('reject') || lastUserMessage.toLowerCase().includes('cancel')) {
          return 'Analysis of your rejection/cancellation patterns:\n\n1. **Common Rejection Reasons**\n   - Price too high (40% of rejections)\n   - Quality concerns (20% of rejections)\n   - Delivery time too long (20% of rejections)\n   - Out of stock (20% of rejections)\n\n2. **Recommendations**\n   - Negotiate long-term contracts with suppliers to lock in prices\n   - Request quality samples before placing large orders\n   - Schedule orders at least 48 hours in advance to ensure availability\n   - Consider alternative suppliers for frequently out-of-stock items';
        } else if (lastUserMessage.toLowerCase().includes('delivery') && lastUserMessage.toLowerCase().includes('optim')) {
          return 'Delivery Optimization Recommendations for Mumbai:\n\n1. **Route Planning**\n   - Cluster deliveries by area: Mumbai Central in morning, Andheri/Bandra mid-day, Juhu in evening\n   - Use traffic prediction apps to avoid congestion\n   - Consider alternative routes during monsoon season\n\n2. **Vehicle Optimization**\n   - Use bikes for small, urgent deliveries (under 20kg)\n   - Vans for bulk orders and multiple deliveries in same area\n   - Electric vehicles for cost savings in stop-and-go traffic areas\n\n3. **Timing Strategies**\n   - Avoid peak hours (12:00-14:00 and 19:00-21:00)\n   - Early morning deliveries (6:00-8:00) for restaurants and food stalls\n   - Schedule non-urgent deliveries during off-peak hours';
        } else {
          return 'I\'m your SupplyLink AI Assistant. I can help with inventory management, supplier recommendations, market insights, and more. How can I assist you today?';
        }
      }
    };
  }
}

export const ai = new ClientAI();
