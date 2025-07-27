'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Shield, Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoleGuard from '@/hooks/use-role-guard';

interface ProductsPageProps {
  userRole?: 'supplier' | 'vendor';
}

const products = [
  {
    name: "Fresh Tomatoes (Grade A)",
    status: "Active",
    price: "₹45/kg",
    inventory: 250,
    image: "https://placehold.co/100x100.png",
    aiHint: "fresh tomatoes",
    category: "Vegetables",
    quality: "Premium",
    verified: true,
    bulkPricing: "₹40/kg (50kg+)"
  },
  {
    name: "Organic Onions",
    status: "Active",
    price: "₹35/kg",
    inventory: 150,
    image: "https://placehold.co/100x100.png",
    aiHint: "organic onions",
    category: "Vegetables",
    quality: "Organic",
    verified: true,
    bulkPricing: "₹30/kg (100kg+)"
  },
  {
    name: "Premium Cooking Oil",
    status: "Active",
    price: "₹120/liter",
    inventory: 300,
    image: "https://placehold.co/100x100.png",
    aiHint: "cooking oil",
    category: "Oils & Fats",
    quality: "Premium",
    verified: true,
    bulkPricing: "₹100/liter (50L+)"
  },
  {
    name: "Fresh Ginger",
    status: "Active",
    price: "₹180/kg",
    inventory: 50,
    image: "https://placehold.co/100x100.png",
    aiHint: "fresh ginger",
    category: "Spices",
    quality: "Fresh",
    verified: true,
    bulkPricing: "₹160/kg (25kg+)"
  },
  {
    name: "Quality Rice (Basmati)",
    status: "Active",
    price: "₹85/kg",
    inventory: 200,
    image: "https://placehold.co/100x100.png",
    aiHint: "basmati rice",
    category: "Grains",
    quality: "Premium",
    verified: true,
    bulkPricing: "₹75/kg (100kg+)"
  },
];

const qualityColors = {
  "Premium": "bg-purple-100 text-purple-800",
  "Organic": "bg-green-100 text-green-800",
  "Fresh": "bg-blue-100 text-blue-800",
  "Standard": "bg-gray-100 text-gray-800"
};

export default function ProductsPage({ userRole = 'supplier' }: ProductsPageProps) {
  const guard = useRoleGuard('supplier', userRole);
  if (guard) return guard;

  const [productList, setProductList] = useState(products);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    quality: '',
    description: '',
    price: '',
    unit: '',
    inventory: '',
    bulkPricing: '',
    image: '',
    aiHint: '', // Added default value for aiHint
  });

  const handleAddProduct = () => {
    setProductList((prev) => [
      ...prev,
      {
        ...newProduct,
        status: 'Active',
        verified: false,
        aiHint: newProduct.name.toLowerCase(), // Generate aiHint dynamically
        inventory: parseInt(newProduct.inventory, 10), // Convert inventory to number
      },
    ]);
    setNewProduct({
      name: '',
      category: '',
      quality: '',
      description: '',
      price: '',
      unit: '',
      inventory: '',
      bulkPricing: '',
      image: '',
      aiHint: '',
    });
  };

  const handleRemoveProduct = (productName: string) => {
    setProductList((prev) => prev.filter((product) => product.name !== productName));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your food ingredients and view their performance.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new food ingredient to your catalog with quality specifications.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Fresh Tomatoes (Grade A)"
                    className="col-span-3"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Select
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="oils">Oils & Fats</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat & Poultry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quality" className="text-right">Quality Grade</Label>
                  <Select
                    onValueChange={(value) => setNewProduct({ ...newProduct, quality: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="fresh">Fresh</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product description and specifications"
                    className="col-span-3"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Base Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="45.00"
                    className="col-span-3"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">Unit</Label>
                  <Select
                    onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="l">Liter (L)</SelectItem>
                      <SelectItem value="ml">Milliliter (ml)</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="inventory" className="text-right">Inventory</Label>
                  <Input
                    id="inventory"
                    type="number"
                    placeholder="250"
                    className="col-span-3"
                    value={newProduct.inventory}
                    onChange={(e) => setNewProduct({ ...newProduct, inventory: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bulk-pricing" className="text-right">Bulk Pricing</Label>
                  <Input
                    id="bulk-pricing"
                    placeholder="₹40/kg (50kg+)"
                    className="col-span-3"
                    value={newProduct.bulkPricing}
                    onChange={(e) => setNewProduct({ ...newProduct, bulkPricing: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="picture" className="text-right">Image</Label>
                   <Input
                     id="picture"
                     type="file"
                     className="col-span-3"
                     onChange={(e) => {
                       if (e.target.files && e.target.files[0]) {
                         const reader = new FileReader();
                         reader.onload = () => {
                           if (reader.result) {
                             setNewProduct({ ...newProduct, image: reader.result as string });
                           }
                         };
                         reader.readAsDataURL(e.target.files[0]);
                       }
                     }}
                   />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleAddProduct}>Save Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Inventory</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.image}
                    width="64"
                    data-ai-hint={product.aiHint}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <div className="flex items-center gap-2">
                      {product.name}
                      {product.verified && <Shield className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="text-sm text-muted-foreground">{product.bulkPricing}</div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Badge className={qualityColors[product.quality as keyof typeof qualityColors]}>
                    {product.quality}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.status === 'Archived' ? 'secondary' : 'outline'}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="hidden md:table-cell">{product.inventory}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => handleRemoveProduct(product.name)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{productList.length}</strong> of <strong>{productList.length}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
