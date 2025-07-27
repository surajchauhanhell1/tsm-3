'use client';

import { useState, useEffect } from 'react';
import { ai } from '@/ai/genkit';
import { 
  generateProductRecommendations,
  generateCostOptimizationSuggestions,
  generateMarketInsights,
  analyzeOrderPatterns,
  analyzeRejectionReasons,
  generateDeliveryOptimizations 
} from '@/ai/dev';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Suggestion {
  title: string;
  prompt: string;
}

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const { toast } = useToast();

  // Predefined suggestions for vendors and suppliers
  const vendorSuggestions: Suggestion[] = [
    {
      title: 'Inventory Optimization',
      prompt: 'How can I optimize my inventory to reduce waste and save costs?'
    },
    {
      title: 'Seasonal Ingredients',
      prompt: 'What seasonal ingredients should I stock up on for the next month?'
    },
    {
      title: 'Supplier Recommendations',
      prompt: 'Can you recommend reliable suppliers for fresh vegetables in Mumbai?'
    },
    {
      title: 'Cost Reduction',
      prompt: 'How can I reduce my ingredient costs without compromising quality?'
    },
    {
      title: 'Order Analysis',
      prompt: 'Analyze my recent orders and suggest improvements'
    }
  ];

  const supplierSuggestions: Suggestion[] = [
    {
      title: 'Market Trends',
      prompt: 'What are the current market trends for street food ingredients in India?'
    },
    {
      title: 'Pricing Strategy',
      prompt: 'How should I price my products to be competitive but profitable?'
    },
    {
      title: 'Vendor Acquisition',
      prompt: 'What strategies can I use to attract more street food vendors to my platform?'
    },
    {
      title: 'Delivery Optimization',
      prompt: 'How can I optimize my delivery routes to serve multiple vendors efficiently?'
    },
    {
      title: 'Rejection Analysis',
      prompt: 'Analyze the reasons for order rejections and suggest improvements'
    }
  ];

  // Mock user type - in a real app, this would come from authentication
  const userType = 'vendor'; // or 'supplier'
  const suggestions = userType === 'vendor' ? vendorSuggestions : supplierSuggestions;

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hello! I'm your SupplyLink AI Assistant. I can help you with inventory management, supplier recommendations, market insights, and more. How can I assist you today?`
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    
    try {
      let responseContent = '';
      const lowerCaseInput = input.toLowerCase();
      
      // Check if the message matches any of our specialized flows
      if (lowerCaseInput.includes('recommend') && lowerCaseInput.includes('product')) {
        // Mock data for demonstration
        const ingredients = ['tomatoes', 'onions', 'rice'];
        const location = 'Mumbai';
        const budget = 5000;
        responseContent = await generateProductRecommendations(ingredients, location, budget);
      } 
      else if (lowerCaseInput.includes('order') && (lowerCaseInput.includes('pattern') || lowerCaseInput.includes('analysis') || lowerCaseInput.includes('analyze'))) {
        // Mock order data
        const mockOrders = [
          { id: '1', product: 'Rice', quantity: 50, date: '2023-05-01', status: 'delivered' },
          { id: '2', product: 'Tomatoes', quantity: 20, date: '2023-05-03', status: 'delivered' },
          { id: '3', product: 'Onions', quantity: 30, date: '2023-05-05', status: 'delivered' },
          { id: '4', product: 'Rice', quantity: 50, date: '2023-05-10', status: 'delivered' },
          { id: '5', product: 'Spices', quantity: 10, date: '2023-05-12', status: 'rejected' },
        ];
        responseContent = await analyzeOrderPatterns(mockOrders, userType);
      }
      else if (lowerCaseInput.includes('reject') || lowerCaseInput.includes('cancel')) {
        // Mock rejection data
        const mockRejections = [
          { id: '1', reason: 'Price too high', date: '2023-05-02' },
          { id: '2', reason: 'Quality concerns', date: '2023-05-07' },
          { id: '3', reason: 'Delivery time too long', date: '2023-05-12' },
          { id: '4', reason: 'Out of stock', date: '2023-05-15' },
          { id: '5', reason: 'Price too high', date: '2023-05-20' },
        ];
        responseContent = await analyzeRejectionReasons(mockRejections);
      }
      else if (lowerCaseInput.includes('delivery') && lowerCaseInput.includes('optim')) {
        // Mock delivery data
        const mockDeliveryData = {
          averageTime: 45, // minutes
          locations: ['Mumbai Central', 'Andheri', 'Bandra', 'Juhu'],
          peakHours: ['12:00-14:00', '19:00-21:00'],
          vehicleTypes: ['Bike', 'Van']
        };
        responseContent = await generateDeliveryOptimizations(mockDeliveryData, 'Mumbai');
      }
      else {
        // Default to general chat for other queries
        const response = await ai.chat({
          messages: [
            { role: 'system', content: `You are an AI assistant for SupplyLink, a platform connecting street food vendors with suppliers in India. 
            If the user is a vendor, help them with inventory management, finding suppliers, and optimizing costs.
            If the user is a supplier, help them with market trends, pricing strategies, and connecting with vendors.
            Always be helpful, concise, and provide actionable advice. Current user type: ${userType}.` },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ]
        });
        responseContent = response.text() || 'I\'m sorry, I couldn\'t generate a response. Please try again.';
      }
      
      // Add AI response to chat
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: responseContent
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the assistant. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  // Generate insights based on user type
  const generateInsights = async () => {
    setIsLoading(true);
    try {
      let insightContent = '';
      
      if (userType === 'vendor') {
        // Mock data for demonstration - in a real app, this would come from the database
        const mockIngredients = [
          { name: 'Tomatoes', cost: 60, quantity: 'kg' },
          { name: 'Onions', cost: 40, quantity: 'kg' },
          { name: 'Rice', cost: 80, quantity: 'kg' },
          { name: 'Cooking Oil', cost: 120, quantity: 'liter' },
          { name: 'Spices', cost: 200, quantity: '500g' }
        ];
        
        const mockMenuItems = [
          { name: 'Pav Bhaji', ingredients: ['Tomatoes', 'Onions', 'Spices', 'Butter'] },
          { name: 'Vada Pav', ingredients: ['Potatoes', 'Spices', 'Cooking Oil'] },
          { name: 'Biryani', ingredients: ['Rice', 'Spices', 'Vegetables', 'Cooking Oil'] }
        ];
        
        insightContent = await generateCostOptimizationSuggestions(mockIngredients, mockMenuItems);
      } else {
        // For suppliers, generate market insights
        const productCategories = ['Vegetables', 'Grains', 'Spices', 'Oils'];
        insightContent = await generateMarketInsights(productCategories);
      }
      
      const insightMessage: Message = { 
        role: 'assistant', 
        content: insightContent || 'I\'m sorry, I couldn\'t generate insights. Please try again.'
      };
      setMessages([insightMessage]);
    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate insights. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-headline">AI Assistant</h1>
        <p className="text-muted-foreground">Get personalized recommendations and insights for your business.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="h-[60vh] overflow-y-auto p-4 space-y-4 rounded-md border">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex max-w-[80%] rounded-lg p-4 ${message.role === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'}`}
                    >
                      <div className="mr-2 mt-0.5">
                        {message.role === 'user' ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <Bot className="h-5 w-5" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] rounded-lg p-4 bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="ml-2">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestions.map((suggestion, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSuggestionClick(suggestion.prompt)}
                      className="text-xs"
                    >
                      {suggestion.title}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your business..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!input.trim() || isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Business Insights</CardTitle>
              <CardDescription>
                Get AI-powered insights and recommendations tailored to your business needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                    {userType === 'vendor' ? 'Vendor Insights' : 'Supplier Insights'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {userType === 'vendor' 
                      ? 'Get personalized recommendations to optimize your ingredient sourcing and reduce costs.' 
                      : 'Get market insights and strategies to better serve street food vendors.'}
                  </p>
                </div>
                
                <div className="h-[40vh] overflow-y-auto p-4 space-y-4 rounded-md border">
                  {messages.length > 0 && (
                    <div className="whitespace-pre-wrap">
                      {messages[messages.length - 1].content}
                    </div>
                  )}
                  {isLoading && (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="ml-2">Generating insights...</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateInsights} 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Generating
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Fresh Insights
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}