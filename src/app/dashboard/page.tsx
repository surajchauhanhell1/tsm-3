'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, Users, Store, Search, MapPin, Star, Truck, TrendingUp, ArrowUpRight, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type UserRole = 'supplier' | 'vendor';

interface DashboardPageProps {
  userRole?: UserRole;
}

const StatCard = ({ title, value, icon: Icon, description, trend }: { title: string, value: string, icon: React.ElementType, description: string, trend?: string }) => (
    <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-4 w-4 text-primary" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{description}</p>
                {trend && (
                    <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {trend}
                    </Badge>
                )}
            </div>
        </CardContent>
    </Card>
);

const SupplierDashboard = () => (
    <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Monthly Revenue" value="₹2,45,000" icon={DollarSign} description="from last month" trend="+15.2%" />
            <StatCard title="Active Orders" value="47" icon={ShoppingCart} description="12 pending approval" trend="+8%" />
            <StatCard title="Products Listed" value="89" icon={Package} description="new this month" trend="+8" />
            <StatCard title="Vendor Network" value="156" icon={Users} description="new vendors" trend="+23" />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                    <CardTitle>Welcome back, FreshFarm Supplies!</CardTitle>
                    <CardDescription>Your quality ingredients are helping street food vendors across Mumbai serve delicious food.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="h-5 w-5 text-green-600" />
                                <span className="font-semibold text-green-800">Quality Rating: 4.8/5</span>
                            </div>
                            <p className="text-sm text-green-700">Your products are highly rated by street food vendors!</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">Quick Actions:</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="flex-1 group" asChild>
                                    <Link href="/dashboard/products">
                                        Manage Products
                                        <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button variant="outline" className="flex-1 group" asChild>
                                    <Link href="/dashboard/orders">
                                        View Orders
                                        <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Assistant
                        <Badge variant="secondary" className="text-xs">New</Badge>
                    </CardTitle>
                    <CardDescription>Get intelligent insights and recommendations for your business</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            • Market trend analysis
                            • Pricing optimization
                            • Inventory recommendations
                        </div>
                        <Button variant="outline" className="w-full group" asChild>
                            <Link href="/dashboard/assistant">
                                Try AI Assistant
                                <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

const VendorDashboard = () => (
    <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Active Orders" value="8" icon={ShoppingCart} description="3 in transit" trend="+2" />
            <StatCard title="Trusted Suppliers" value="24" icon={Users} description="All verified" trend="+3" />
            <StatCard title="Products Explored" value="156" icon={Store} description="This month" trend="+12%" />
            <StatCard title="Savings This Month" value="₹12,450" icon={DollarSign} description="Through bulk buying" trend="+18%" />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                    <CardTitle>Welcome back, Street Food Vendor!</CardTitle>
                    <CardDescription>Find quality ingredients from trusted suppliers and grow your business.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-5 w-5 text-blue-600" />
                                <span className="font-semibold text-blue-800">Local Suppliers: 12 nearby</span>
                            </div>
                            <p className="text-sm text-blue-700">Fast delivery options available in your area!</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">Quick Actions:</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="flex-1 group" asChild>
                                    <Link href="/dashboard/marketplace">
                                        Explore Marketplace
                                        <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button variant="outline" className="flex-1 group" asChild>
                                    <Link href="/dashboard/suppliers">
                                        Find Suppliers
                                        <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Assistant
                        <Badge variant="secondary" className="text-xs">New</Badge>
                    </CardTitle>
                    <CardDescription>Get personalized recommendations for your street food business</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            • Ingredient recommendations
                            • Cost optimization tips
                            • Supplier suggestions
                        </div>
                        <Button variant="outline" className="w-full group" asChild>
                            <Link href="/dashboard/assistant">
                                Try AI Assistant
                                <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="mt-8">
            <Card className="border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest orders and supplier interactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Truck className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Order #1234 delivered</p>
                                <p className="text-sm text-muted-foreground">Fresh tomatoes from FreshFarm Supplies</p>
                            </div>
                            <Badge variant="outline" className="text-xs">2h ago</Badge>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Star className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">New supplier verified</p>
                                <p className="text-sm text-muted-foreground">Spice Garden added to your network</p>
                            </div>
                            <Badge variant="outline" className="text-xs">1d ago</Badge>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <Package className="h-4 w-4 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Bulk order discount available</p>
                                <p className="text-sm text-muted-foreground">15% off on rice orders above 100kg</p>
                            </div>
                            <Badge variant="outline" className="text-xs">3d ago</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

export default function DashboardPage({ userRole = 'vendor' }: DashboardPageProps) {
    return userRole === 'supplier' ? <SupplierDashboard /> : <VendorDashboard />;
}
