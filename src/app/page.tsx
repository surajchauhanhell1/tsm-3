import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, UploadCloud, Package, Users, MessageSquare, Search, Store, Shield, MapPin, Truck, Star } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-headline">VendorTrust</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight mb-4">
            Trusted Supply Chain for Street Food Vendors
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with verified suppliers, get quality raw materials at competitive prices, and grow your street food business with confidence.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Join as Street Food Vendor</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Register as Supplier</Link>
            </Button>
          </div>
        </section>

        <section className="bg-card py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">For Street Food Vendors</h2>
                <p className="text-muted-foreground mb-6">
                  Get access to quality raw materials from trusted suppliers, with verified quality and competitive pricing.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full"><Shield className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold">Verified Suppliers Only</h3>
                      <p className="text-sm text-muted-foreground">All suppliers are quality-checked and rated by other vendors for your peace of mind.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full"><MapPin className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold">Local Supplier Network</h3>
                      <p className="text-sm text-muted-foreground">Find suppliers near your location for faster delivery and lower transportation costs.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full"><Package className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold">Bulk Order Benefits</h3>
                      <p className="text-sm text-muted-foreground">Join group buying to get better prices and access to premium quality ingredients.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-xl">
                 <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Street food vendor using mobile app" data-ai-hint="street food vendor mobile app" />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-xl order-last md:order-first">
                        <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Quality supplier warehouse" data-ai-hint="supplier warehouse quality ingredients"/>
                    </div>
                    <div className='md:pl-10'>
                        <h2 className="text-3xl font-bold font-headline mb-4">For Quality Suppliers</h2>
                        <p className="text-muted-foreground mb-6">
                            Expand your customer base by connecting with verified street food vendors who need reliable, quality ingredients.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full"><Star className="h-6 w-6 text-primary" /></div>
                                <div>
                                    <h3 className="font-semibold">Build Trust & Reputation</h3>
                                    <p className="text-sm text-muted-foreground">Get rated and reviewed by vendors to build credibility and attract more customers.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full"><Truck className="h-6 w-6 text-primary" /></div>
                                <div>
                                    <h3 className="font-semibold">Efficient Order Management</h3>
                                    <p className="text-sm text-muted-foreground">Manage bulk orders, track deliveries, and maintain inventory all in one place.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full"><MessageSquare className="h-6 w-6 text-primary" /></div>
                                <div>
                                    <h3 className="font-semibold">Direct Communication</h3>
                                    <p className="text-sm text-muted-foreground">Chat directly with vendors to understand requirements and build lasting relationships.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-card py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline mb-4">Why Choose VendorTrust?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We understand the unique challenges of street food vendors and have built a platform specifically for your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All suppliers undergo quality verification. Products are tested and certified for safety and quality standards.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Location Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Find suppliers closest to your location for faster delivery and reduced transportation costs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Bulk Purchasing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join group buying programs to access wholesale prices and premium quality ingredients.
                  </p>
                </CardContent>
              </Card>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VendorTrust. Empowering street food vendors across India.</p>
        </div>
      </footer>
    </div>
  );
}
