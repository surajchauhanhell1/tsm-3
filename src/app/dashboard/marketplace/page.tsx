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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, MapPin, Star, Shield, Package, ShoppingCart, Truck, Calendar, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoleGuard from '@/hooks/use-role-guard';

interface MarketplacePageProps {
  userRole?: 'supplier' | 'vendor';
}

const products = [
  {
    name: "Fresh Tomatoes (Grade A)",
    supplier: "FreshFarm Supplies",
    price: "₹45/kg",
    image: "https://placehold.co/300x200.png",
    aiHint: "fresh tomatoes",
    rating: 4.8,
    reviews: 127,
    location: "Mumbai, Maharashtra",
    distance: "2.5 km",
    quality: "Premium",
    verified: true,
    bulkDiscount: "10% off on 50kg+",
    description: "Premium Grade A tomatoes, freshly harvested and carefully selected for the best quality. Perfect for street food vendors who need consistent, high-quality ingredients.",
    specifications: {
      "Origin": "Local Farms",
      "Shelf Life": "7-10 days",
      "Storage": "Cool, dry place",
      "Certification": "FSSAI Approved",
      "Packaging": "10kg boxes"
    },
    supplierInfo: {
      name: "FreshFarm Supplies",
      rating: 4.8,
      reviews: 127,
      location: "Mumbai Central",
      deliveryTime: "Same day",
      minOrder: "₹500"
    }
  },
  {
    name: "Organic Onions",
    supplier: "Green Valley Farms",
    price: "₹35/kg",
    image: "https://placehold.co/300x200.png",
    aiHint: "organic onions",
    rating: 4.6,
    reviews: 89,
    location: "Mumbai, Maharashtra",
    distance: "1.8 km",
    quality: "Organic",
    verified: true,
    bulkDiscount: "15% off on 100kg+",
    description: "Certified organic onions grown without synthetic pesticides or fertilizers. Sweet and flavorful, perfect for all your street food preparations.",
    specifications: {
      "Origin": "Organic Farms",
      "Shelf Life": "2-3 weeks",
      "Storage": "Cool, ventilated area",
      "Certification": "Organic Certified",
      "Packaging": "25kg bags"
    },
    supplierInfo: {
      name: "Green Valley Farms",
      rating: 4.6,
      reviews: 89,
      location: "Andheri West",
      deliveryTime: "Next day",
      minOrder: "₹300"
    }
  },
  {
    name: "Premium Cooking Oil",
    supplier: "Pure Oil Co.",
    price: "₹120/liter",
    image: "https://placehold.co/300x200.png",
    aiHint: "cooking oil",
    rating: 4.9,
    reviews: 203,
    location: "Mumbai, Maharashtra",
    distance: "3.2 km",
    quality: "Premium",
    verified: true,
    bulkDiscount: "20% off on 50L+",
    description: "High-quality cooking oil with excellent frying properties. Low in saturated fats and perfect for street food cooking. Long shelf life and consistent performance.",
    specifications: {
      "Type": "Refined Oil",
      "Shelf Life": "12 months",
      "Storage": "Cool, dark place",
      "Certification": "FSSAI Approved",
      "Packaging": "15L cans"
    },
    supplierInfo: {
      name: "Pure Oil Co.",
      rating: 4.9,
      reviews: 203,
      location: "Bandra East",
      deliveryTime: "Same day",
      minOrder: "₹1000"
    }
  },
  {
    name: "Fresh Ginger",
    supplier: "Spice Garden",
    price: "₹180/kg",
    image: "https://placehold.co/300x200.png",
    aiHint: "fresh ginger",
    rating: 4.7,
    reviews: 156,
    location: "Mumbai, Maharashtra",
    distance: "4.1 km",
    quality: "Fresh",
    verified: true,
    bulkDiscount: "12% off on 25kg+",
    description: "Fresh, aromatic ginger with intense flavor and medicinal properties. Hand-picked and cleaned for immediate use in your street food preparations.",
    specifications: {
      "Origin": "Local Farms",
      "Shelf Life": "2-3 weeks",
      "Storage": "Refrigerated",
      "Certification": "FSSAI Approved",
      "Packaging": "5kg bags"
    },
    supplierInfo: {
      name: "Spice Garden",
      rating: 4.7,
      reviews: 156,
      location: "Dadar West",
      deliveryTime: "Next day",
      minOrder: "₹400"
    }
  },
  {
    name: "Quality Rice (Basmati)",
    supplier: "Rice Paradise",
    price: "₹85/kg",
    image: "https://placehold.co/300x200.png",
    aiHint: "basmati rice",
    rating: 4.5,
    reviews: 98,
    location: "Mumbai, Maharashtra",
    distance: "5.5 km",
    quality: "Premium",
    verified: true,
    bulkDiscount: "18% off on 100kg+",
    description: "Premium Basmati rice with long, aromatic grains. Perfect for biryanis, pulao, and other rice-based street food dishes. Aged for enhanced flavor.",
    specifications: {
      "Type": "Basmati",
      "Shelf Life": "18 months",
      "Storage": "Cool, dry place",
      "Certification": "FSSAI Approved",
      "Packaging": "25kg bags"
    },
    supplierInfo: {
      name: "Rice Paradise",
      rating: 4.5,
      reviews: 98,
      location: "Kurla West",
      deliveryTime: "Same day",
      minOrder: "₹600"
    }
  },
  {
    name: "Fresh Coriander",
    supplier: "Herb Haven",
    price: "₹60/kg",
    image: "https://placehold.co/300x200.png",
    aiHint: "fresh coriander",
    rating: 4.4,
    reviews: 67,
    location: "Mumbai, Maharashtra",
    distance: "2.1 km",
    quality: "Fresh",
    verified: true,
    bulkDiscount: "8% off on 20kg+",
    description: "Fresh, vibrant coriander leaves with intense aroma and flavor. Perfect for garnishing and adding freshness to your street food dishes.",
    specifications: {
      "Origin": "Local Farms",
      "Shelf Life": "5-7 days",
      "Storage": "Refrigerated",
      "Certification": "FSSAI Approved",
      "Packaging": "1kg bundles"
    },
    supplierInfo: {
      name: "Herb Haven",
      rating: 4.4,
      reviews: 67,
      location: "Santacruz West",
      deliveryTime: "Same day",
      minOrder: "₹200"
    }
  },
];

const qualityColors = {
  "Premium": "bg-purple-100 text-purple-800",
  "Organic": "bg-green-100 text-green-800",
  "Fresh": "bg-blue-100 text-blue-800",
  "Standard": "bg-gray-100 text-gray-800"
};

export default function MarketplacePage({ userRole = 'vendor' }: MarketplacePageProps) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderQuantity, setOrderQuantity] = useState("");
  const guard = useRoleGuard('vendor', userRole);

  if (guard) return guard;

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
  };

  const handlePlaceOrder = () => {
    if (orderQuantity.trim()) {
      // In a real app, this would create an order
      console.log(`Placing order for ${orderQuantity} of ${selectedProduct.name}`);
      setOrderQuantity("");
      setSelectedProduct(null);
      // Navigate to orders page
      router.push('/dashboard/orders');
    }
  };

  return (
    <div>
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Marketplace</h1>
                    <p className="text-muted-foreground">Find quality ingredients from verified suppliers near you.</p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search products, suppliers..." className="pl-8" />
                </div>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by quality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Quality</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="fresh">Fresh</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="distance">Nearest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <Card key={product.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0 relative">
                         <div className="aspect-video relative">
                            <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint={product.aiHint}
                            />
                            {product.verified && (
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-green-500 text-white">
                                        <Shield className="h-3 w-3 mr-1" />
                                        Verified
                                    </Badge>
                                </div>
                            )}
                            <div className="absolute bottom-2 left-2">
                                <Badge className={qualityColors[product.quality as keyof typeof qualityColors]}>
                                    {product.quality}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-base font-semibold mb-1">{product.name}</CardTitle>
                        <CardDescription className="text-sm mb-2">by {product.supplier}</CardDescription>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1">{product.rating}</span>
                                <span className="text-xs text-muted-foreground ml-1">({product.reviews} reviews)</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{product.distance} away</span>
                        </div>
                        
                        <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mb-3">
                            <div className="flex items-center gap-1 text-sm">
                                <Package className="h-4 w-4 text-orange-600" />
                                <span className="text-orange-800 font-medium">{product.bulkDiscount}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <p className="text-lg font-bold text-primary">{product.price}</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button 
                                    size="sm"
                                    onClick={() => handleViewDetails(product)}
                                >
                                    View Details
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>{product.name}</DialogTitle>
                                    <DialogDescription>
                                        by {product.supplier} • {product.distance} away
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="aspect-video relative rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold">{product.price}</span>
                                                    <Badge className={qualityColors[product.quality as keyof typeof qualityColors]}>
                                                        {product.quality}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="font-medium">{product.rating}</span>
                                                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                                                </div>
                                                
                                                <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Package className="h-4 w-4 text-orange-600" />
                                                        <span className="text-orange-800 font-medium">{product.bulkDiscount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Description</h4>
                                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-semibold mb-2">Specifications</h4>
                                                <div className="space-y-2">
                                                    {Object.entries(product.specifications).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">{key}:</span>
                                                            <span className="font-medium">{value as string}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="border-t pt-4">
                                                <h4 className="font-semibold mb-2">Supplier Info</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <User className="h-4 w-4 text-blue-600" />
                                                        <span>{product.supplierInfo.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                        <span>{product.supplierInfo.rating} ({product.supplierInfo.reviews} reviews)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="h-4 w-4 text-green-600" />
                                                        <span>{product.supplierInfo.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Truck className="h-4 w-4 text-purple-600" />
                                                        <span>{product.supplierInfo.deliveryTime} delivery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="quantity">Order Quantity</Label>
                                                <Input
                                                    id="quantity"
                                                    placeholder="e.g., 25kg, 10L"
                                                    value={orderQuantity}
                                                    onChange={(e) => setOrderQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button 
                                                    onClick={handlePlaceOrder}
                                                    disabled={!orderQuantity.trim()}
                                                    className="flex-1"
                                                >
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    Place Order
                                                </Button>
                                                <Button 
                                                    variant="outline"
                                                    onClick={() => setSelectedProduct(null)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
