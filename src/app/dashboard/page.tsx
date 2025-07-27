'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, Users, Store, Search, MapPin, Star, Truck } from 'lucide-react';

type UserRole = 'supplier' | 'vendor';

interface DashboardPageProps {
  userRole?: UserRole;
}

const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: string, icon: React.ElementType, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

const SupplierDashboard = () => (
    <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Monthly Revenue" value="₹2,45,000" icon={DollarSign} description="+15.2% from last month" />
            <StatCard title="Active Orders" value="47" icon={ShoppingCart} description="12 pending approval" />
            <StatCard title="Products Listed" value="89" icon={Package} description="+8 new this month" />
            <StatCard title="Vendor Network" value="156" icon={Users} description="+23 new vendors" />
        </div>
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back, FreshFarm Supplies!</CardTitle>
                    <CardDescription>Your quality ingredients are helping street food vendors across Mumbai serve delicious food.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">Quick Actions:</p>
                            <div className="flex gap-4">
                       <Button asChild><Link href="/dashboard/products">Manage Products</Link></Button>
                       <Button variant="secondary" asChild><Link href="/dashboard/orders">View Orders</Link></Button>
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="h-5 w-5 text-green-600" />
                                <span className="font-semibold text-green-800">Quality Rating: 4.8/5</span>
                            </div>
                            <p className="text-sm text-green-700">Your products are highly rated by street food vendors!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

const VendorDashboard = () => (
    <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Active Orders" value="8" icon={ShoppingCart} description="3 in transit" />
            <StatCard title="Trusted Suppliers" value="24" icon={Users} description="All verified" />
            <StatCard title="Products Explored" value="156" icon={Store} description="This month" />
            <StatCard title="Savings This Month" value="₹12,450" icon={DollarSign} description="Through bulk buying" />
        </div>
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back, Street Food Vendor!</CardTitle>
                    <CardDescription>Find quality ingredients from trusted suppliers and grow your business.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">Quick Actions:</p>
                            <div className="flex gap-4">
                       <Button asChild><Link href="/dashboard/marketplace">Explore Marketplace</Link></Button>
                       <Button variant="secondary" asChild><Link href="/dashboard/suppliers">Find Suppliers</Link></Button>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-5 w-5 text-blue-600" />
                                <span className="font-semibold text-blue-800">Local Suppliers: 12 nearby</span>
                            </div>
                            <p className="text-sm text-blue-700">Fast delivery options available in your area!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest orders and supplier interactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Truck className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Order #1234 delivered</p>
                                <p className="text-sm text-muted-foreground">Fresh tomatoes from FreshFarm Supplies</p>
                            </div>
                            <span className="text-sm text-muted-foreground">2 hours ago</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Star className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">New supplier verified</p>
                                <p className="text-sm text-muted-foreground">Spice Garden added to your network</p>
                            </div>
                            <span className="text-sm text-muted-foreground">1 day ago</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Package className="h-4 w-4 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Bulk order discount available</p>
                                <p className="text-sm text-muted-foreground">15% off on rice orders above 100kg</p>
                            </div>
                            <span className="text-sm text-muted-foreground">3 days ago</span>
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
