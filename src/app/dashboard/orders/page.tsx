'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, Star, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersPageProps {
  userRole?: 'supplier' | 'vendor';
}

const orders = [
  {
    id: "#1234",
    supplier: "FreshFarm Supplies",
    items: [
      { name: "Fresh Tomatoes (Grade A)", quantity: "25kg", price: "₹1,125" },
      { name: "Organic Onions", quantity: "15kg", price: "₹525" }
    ],
    total: "₹1,650",
    status: "Delivered",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    rating: 5,
    review: "Excellent quality tomatoes, very fresh!"
  },
  {
    id: "#1235",
    supplier: "Pure Oil Co.",
    items: [
      { name: "Premium Cooking Oil", quantity: "10L", price: "₹1,200" }
    ],
    total: "₹1,200",
    status: "In Transit",
    orderDate: "2024-01-17",
    deliveryDate: "2024-01-18",
    tracking: "Expected delivery by 2 PM today"
  },
  {
    id: "#1236",
    supplier: "Spice Garden",
    items: [
      { name: "Fresh Ginger", quantity: "5kg", price: "₹900" },
      { name: "Coriander Seeds", quantity: "2kg", price: "₹300" }
    ],
    total: "₹1,200",
    status: "Pending",
    orderDate: "2024-01-18",
    deliveryDate: "2024-01-19"
  },
  {
    id: "#1237",
    supplier: "Rice Paradise",
    items: [
      { name: "Quality Rice (Basmati)", quantity: "50kg", price: "₹3,750" }
    ],
    total: "₹3,750",
    status: "Cancelled",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-15",
    reason: "Supplier out of stock"
  },
  {
    id: "#1238",
    supplier: "Green Valley Farms",
    items: [
      { name: "Organic Carrots", quantity: "20kg", price: "₹800" },
      { name: "Fresh Spinach", quantity: "10kg", price: "₹400" }
    ],
    total: "₹1,200",
    status: "Delivered",
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-14",
    rating: 4,
    review: "Good quality, but delivery was slightly delayed"
  }
];

const statusColors = {
  "Delivered": "bg-green-100 text-green-800",
  "In Transit": "bg-blue-100 text-blue-800",
  "Pending": "bg-yellow-100 text-yellow-800",
  "Cancelled": "bg-red-100 text-red-800",
  "Approved": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800"
};

const statusIcons = {
  "Delivered": CheckCircle,
  "In Transit": Truck,
  "Pending": Clock,
  "Cancelled": AlertCircle,
  "Approved": CheckCircle,
  "Rejected": AlertCircle
};

export default function OrdersPage({ userRole = 'vendor' }: OrdersPageProps) {
  const router = useRouter();

  // Mock supplier orders data
  const supplierOrders = [
    {
      id: "#S1234",
      vendor: "Street Food Corner",
      items: [
        { name: "Fresh Tomatoes (Grade A)", quantity: "25kg", price: "₹1,125" },
        { name: "Organic Onions", quantity: "15kg", price: "₹525" }
      ],
      total: "₹1,650",
      status: "Pending",
      orderDate: "2024-01-18",
      deliveryDate: "2024-01-19",
      vendorLocation: "Mumbai Central"
    },
    {
      id: "#S1235",
      vendor: "Tasty Bites",
      items: [
        { name: "Premium Cooking Oil", quantity: "20L", price: "₹2,400" }
      ],
      total: "₹2,400",
      status: "Approved",
      orderDate: "2024-01-17",
      deliveryDate: "2024-01-18",
      vendorLocation: "Andheri West"
    },
    {
      id: "#S1236",
      vendor: "Spice Route",
      items: [
        { name: "Fresh Ginger", quantity: "10kg", price: "₹1,800" },
        { name: "Coriander Seeds", quantity: "5kg", price: "₹750" }
      ],
      total: "₹2,550",
      status: "Rejected",
      orderDate: "2024-01-16",
      deliveryDate: "2024-01-17",
      vendorLocation: "Bandra East",
      reason: "Insufficient inventory"
    }
  ];

  if (userRole === 'supplier') {
    return (
      <div>
          <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                  <div>
                      <h1 className="text-2xl font-bold font-headline">Incoming Orders</h1>
                      <p className="text-muted-foreground">Manage orders from street food vendors.</p>
                  </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search orders, vendors..." className="pl-8" />
                  </div>
                  <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">All Orders</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </div>

          <div className="grid gap-6">
              {supplierOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
  return (
                      <Card key={order.id} className="overflow-hidden">
                          <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                  <div>
                                      <CardTitle className="text-lg">{order.id}</CardTitle>
                                      <CardDescription>{order.vendor} • {order.vendorLocation}</CardDescription>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                                          <StatusIcon className="h-3 w-3 mr-1" />
                                          {order.status}
                                      </Badge>
                                  </div>
                              </div>
      </CardHeader>
      <CardContent>
                              <div className="space-y-4">
                                  <div>
                                      <h4 className="font-medium mb-2">Order Items:</h4>
                                      <div className="space-y-2">
                                          {order.items.map((item, index) => (
                                              <div key={index} className="flex justify-between items-center text-sm">
                                                  <div>
                                                      <span className="font-medium">{item.name}</span>
                                                      <span className="text-muted-foreground ml-2">({item.quantity})</span>
                                                  </div>
                                                  <span className="font-medium">{item.price}</span>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                                  
                                  <div className="flex justify-between items-center pt-2 border-t">
                                      <div className="text-sm text-muted-foreground">
                                          <div>Ordered: {order.orderDate}</div>
                                          <div>Expected: {order.deliveryDate}</div>
                                      </div>
                                      <div className="text-right">
                                          <div className="text-lg font-bold">{order.total}</div>
                                      </div>
                                  </div>
                                  
                                  {order.reason && (
                                      <div className="bg-red-50 p-3 rounded-md">
                                          <p className="text-sm text-red-700">Rejection reason: {order.reason}</p>
                                      </div>
                                  )}
                                  
                                  <div className="flex gap-2 pt-2">
                                      <Button size="sm" variant="outline">View Details</Button>
                                      {order.status === "Pending" && (
                                        <>
                                          <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                                          <Button size="sm" variant="destructive">Reject</Button>
                                        </>
                                      )}
                                      {order.status === "Approved" && (
                                        <Button size="sm">Prepare for Delivery</Button>
                                      )}
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  );
              })}
          </div>
      </div>
    );
  }

  // Vendor view (existing code)
  return (
    <div>
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold font-headline">My Orders</h1>
                    <p className="text-muted-foreground">Track your ingredient orders and manage deliveries.</p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search orders, suppliers..." className="pl-8" />
                </div>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Order Date</SelectItem>
                        <SelectItem value="delivery">Delivery Date</SelectItem>
                        <SelectItem value="amount">Amount</SelectItem>
                        <SelectItem value="supplier">Supplier</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid gap-6">
            {orders.map((order) => {
                const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                return (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">{order.id}</CardTitle>
                                    <CardDescription>{order.supplier}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                                        <StatusIcon className="h-3 w-3 mr-1" />
                    {order.status}
                  </Badge>
                                    {order.rating && (
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium">{order.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Order Items:</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm">
                                                <div>
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-muted-foreground ml-2">({item.quantity})</span>
                                                </div>
                                                <span className="font-medium">{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2 border-t">
                                    <div className="text-sm text-muted-foreground">
                                        <div>Ordered: {order.orderDate}</div>
                                        <div>Expected: {order.deliveryDate}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold">{order.total}</div>
                                        {order.tracking && (
                                            <div className="text-sm text-muted-foreground">{order.tracking}</div>
                                        )}
                                    </div>
                                </div>
                                
                                {order.review && (
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <p className="text-sm italic">"{order.review}"</p>
                                    </div>
                                )}
                                
                                {order.reason && (
                                    <div className="bg-red-50 p-3 rounded-md">
                                        <p className="text-sm text-red-700">Cancellation reason: {order.reason}</p>
                    </div>
                                )}
                                
                                <div className="flex gap-2 pt-2">
                                    <Button size="sm" variant="outline">View Details</Button>
                                    {order.status === "Delivered" && !order.rating && (
                                        <Button size="sm">Rate & Review</Button>
                                    )}
                                    {order.status === "In Transit" && (
                                        <Button size="sm">Track Order</Button>
                                    )}
                                    {order.status === "Pending" && (
                                        <Button size="sm" variant="destructive">Cancel Order</Button>
                                    )}
                                </div>
                            </div>
      </CardContent>
    </Card>
                );
            })}
        </div>
    </div>
  );
}
