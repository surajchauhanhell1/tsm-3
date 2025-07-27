'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, MapPin, Star, Shield, Phone, MessageSquare, Truck, Package, Mail, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoleGuard from '@/hooks/use-role-guard';

interface SuppliersPageProps {
  userRole?: 'supplier' | 'vendor';
}

const suppliers = [
  {
    id: "supplier-1",
    name: "FreshFarm Supplies",
    rating: 4.8,
    reviews: 127,
    location: "Mumbai, Maharashtra",
    distance: "2.5 km",
    verified: true,
    image: "https://placehold.co/300x200.png",
    aiHint: "fresh farm supplier",
    specialties: ["Vegetables", "Fruits", "Herbs"],
    deliveryTime: "Same day",
    minOrder: "₹500",
    trustScore: 95,
    products: 45,
    joinedDate: "2022",
    phone: "+91 98765 43210",
    email: "contact@freshfarm.com",
    address: "123 Farm Road, Mumbai Central, Maharashtra 400008",
    businessHours: "6:00 AM - 8:00 PM",
    contactPerson: "Rajesh Kumar"
  },
  {
    id: "supplier-2",
    name: "Green Valley Farms",
    rating: 4.6,
    reviews: 89,
    location: "Mumbai, Maharashtra",
    distance: "1.8 km",
    verified: true,
    image: "https://placehold.co/300x200.png",
    aiHint: "organic farm supplier",
    specialties: ["Organic Vegetables", "Grains"],
    deliveryTime: "Next day",
    minOrder: "₹300",
    trustScore: 92,
    products: 32,
    joinedDate: "2021",
    phone: "+91 98765 43211",
    email: "info@greenvalley.com",
    address: "456 Valley Street, Andheri West, Mumbai 400058",
    businessHours: "7:00 AM - 7:00 PM",
    contactPerson: "Priya Sharma"
  },
  {
    id: "supplier-3",
    name: "Pure Oil Co.",
    rating: 4.9,
    reviews: 203,
    location: "Mumbai, Maharashtra",
    distance: "3.2 km",
    verified: true,
    image: "https://placehold.co/300x200.png",
    aiHint: "oil supplier",
    specialties: ["Cooking Oils", "Ghee", "Butter"],
    deliveryTime: "Same day",
    minOrder: "₹1000",
    trustScore: 98,
    products: 28,
    joinedDate: "2020",
    phone: "+91 98765 43212",
    email: "sales@pureoil.com",
    address: "789 Oil Lane, Bandra East, Mumbai 400051",
    businessHours: "8:00 AM - 6:00 PM",
    contactPerson: "Amit Patel"
  },
  {
    id: "supplier-4",
    name: "Spice Garden",
    rating: 4.7,
    reviews: 156,
    location: "Mumbai, Maharashtra",
    distance: "4.1 km",
    verified: true,
    image: "https://placehold.co/300x200.png",
    aiHint: "spice supplier",
    specialties: ["Spices", "Herbs", "Seasonings"],
    deliveryTime: "Next day",
    minOrder: "₹400",
    trustScore: 94,
    products: 67,
    joinedDate: "2021",
    phone: "+91 98765 43213",
    email: "hello@spicegarden.com",
    address: "321 Spice Road, Dadar West, Mumbai 400028",
    businessHours: "6:30 AM - 8:30 PM",
    contactPerson: "Meera Singh"
  },
  {
    id: "supplier-5",
    name: "Rice Paradise",
    rating: 4.5,
    reviews: 98,
    location: "Mumbai, Maharashtra",
    distance: "5.5 km",
    verified: true,
    image: "https://placehold.co/300x200.png",
    aiHint: "rice supplier",
    specialties: ["Rice", "Pulses", "Grains"],
    deliveryTime: "Same day",
    minOrder: "₹600",
    trustScore: 90,
    products: 23,
    joinedDate: "2022",
    phone: "+91 98765 43214",
    email: "contact@riceparadise.com",
    address: "654 Rice Street, Kurla West, Mumbai 400070",
    businessHours: "7:30 AM - 7:30 PM",
    contactPerson: "Vikram Mehta"
  },
  {
    id: "supplier-6",
    name: "Herb Haven",
    rating: 4.4,
    reviews: 67,
    location: "Mumbai, Maharashtra",
    distance: "2.1 km",
    verified: true,
    image: "https://placehold.co/300x200.png",
    aiHint: "herb supplier",
    specialties: ["Fresh Herbs", "Microgreens"],
    deliveryTime: "Same day",
    minOrder: "₹200",
    trustScore: 88,
    products: 18,
    joinedDate: "2023",
    phone: "+91 98765 43215",
    email: "info@herbhaven.com",
    address: "987 Herb Lane, Santacruz West, Mumbai 400054",
    businessHours: "6:00 AM - 9:00 PM",
    contactPerson: "Neha Gupta"
  },
];

export default function SuppliersPage({ userRole = 'vendor' }: SuppliersPageProps) {
  const router = useRouter();
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  const guard = useRoleGuard('vendor', userRole);
  if (guard) return guard;

  const handleChatClick = (supplier: any) => {
    setSelectedSupplier(supplier);
  };

  const handleCallClick = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsCalling(true);
  };

  const initiateCall = (phoneNumber: string) => {
    // In a real app, this would integrate with a calling service
    window.open(`tel:${phoneNumber}`, '_blank');
    setIsCalling(false);
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message to the chat system
      console.log(`Sending message to ${selectedSupplier.name}: ${chatMessage}`);
      setChatMessage("");
      setSelectedSupplier(null);
      // Navigate to chat page
      router.push(`/dashboard/chat?supplier=${selectedSupplier.id}&name=${encodeURIComponent(selectedSupplier.name)}`);
    }
  };

  return (
    <div>
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Find Suppliers</h1>
                    <p className="text-muted-foreground">Discover verified suppliers near you for quality ingredients.</p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search suppliers, specialties..." className="pl-8" />
                </div>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by specialty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="spices">Spices</SelectItem>
                        <SelectItem value="oils">Oils & Fats</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="distance">Nearest First</SelectItem>
                        <SelectItem value="trust">Trust Score</SelectItem>
                        <SelectItem value="products">Most Products</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
                <Card key={supplier.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0 relative">
                         <div className="aspect-video relative">
                            <Image
                                src={supplier.image}
                                alt={supplier.name}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint={supplier.aiHint}
                            />
                            {supplier.verified && (
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-green-500 text-white">
                                        <Shield className="h-3 w-3 mr-1" />
                                        Verified
                                    </Badge>
                                </div>
                            )}
                            <div className="absolute bottom-2 left-2">
                                <Badge className="bg-blue-500 text-white">
                                    Trust Score: {supplier.trustScore}%
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold mb-1">{supplier.name}</CardTitle>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1">{supplier.rating}</span>
                                <span className="text-xs text-muted-foreground ml-1">({supplier.reviews} reviews)</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{supplier.distance} away</span>
                        </div>
                        
                        <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                                {supplier.specialties.map((specialty) => (
                                    <Badge key={specialty} variant="outline" className="text-xs">
                                        {specialty}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-1">
                                <Truck className="h-4 w-4 text-green-600" />
                                <span>{supplier.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Package className="h-4 w-4 text-blue-600" />
                                <span>{supplier.products} products</span>
                            </div>
                        </div>
                        
                        <div className="mt-3 p-2 bg-gray-50 rounded-md">
                            <p className="text-xs text-muted-foreground">Min. Order: <span className="font-medium">{supplier.minOrder}</span></p>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => handleChatClick(supplier)}
                                >
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Chat
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Start Chat with {supplier.name}</DialogTitle>
                                    <DialogDescription>
                                        Send a quick message to start a conversation with {supplier.name}.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Your Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Hi! I'm interested in your products..."
                                            value={chatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={sendChatMessage}
                                            disabled={!chatMessage.trim()}
                                            className="flex-1"
                                        >
                                            Send Message
                                        </Button>
                                        <Button 
                                            variant="outline"
                                            onClick={() => setSelectedSupplier(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleCallClick(supplier)}
                                >
                                    <Phone className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Contact {supplier.name}</SheetTitle>
                                    <SheetDescription>
                                        Get in touch with {supplier.name} directly.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="space-y-6 mt-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <User className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium">Contact Person</p>
                                                <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Phone className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">Phone Number</p>
                                                <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Mail className="h-5 w-5 text-purple-600" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-sm text-muted-foreground">{supplier.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <MapPin className="h-5 w-5 text-red-600" />
                                            <div>
                                                <p className="font-medium">Address</p>
                                                <p className="text-sm text-muted-foreground">{supplier.address}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Clock className="h-5 w-5 text-orange-600" />
                                            <div>
                                                <p className="font-medium">Business Hours</p>
                                                <p className="text-sm text-muted-foreground">{supplier.businessHours}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <Button 
                                            className="w-full"
                                            onClick={() => initiateCall(supplier.phone)}
                                        >
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call Now
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="w-full"
                                            onClick={() => window.open(`mailto:${supplier.email}`, '_blank')}
                                        >
                                            <Mail className="h-4 w-4 mr-2" />
                                            Send Email
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
