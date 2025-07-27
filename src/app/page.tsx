import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, UploadCloud, Package, Users, MessageSquare, Search, Store, Shield, MapPin, Truck, Star, CheckCircle, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline">VendorTrust</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" className="shadow-lg hover:shadow-xl transition-shadow" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Trusted by 1000+ Street Food Vendors
            </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Trusted Supply Chain for Street Food Vendors
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Connect with verified suppliers, get quality raw materials at competitive prices, and grow your street food business with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105 group" asChild>
              <Link href="/signup">Join as Street Food Vendor</Link>
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all group" asChild>
              <Link href="/signup">Register as Supplier</Link>
            </Button>
          </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-card/50 to-muted/30 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Store className="h-4 w-4" />
                  For Vendors
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Grow Your Street Food Business</h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  Get access to quality raw materials from trusted suppliers, with verified quality and competitive pricing.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Verified Suppliers Only</h3>
                      <p className="text-muted-foreground">All suppliers are quality-checked and rated by other vendors for your peace of mind.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Local Supplier Network</h3>
                      <p className="text-muted-foreground">Find suppliers near your location for faster delivery and lower transportation costs.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Bulk Order Benefits</h3>
                      <p className="text-muted-foreground">Join group buying to get better prices and access to premium quality ingredients.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full h-96 relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                 <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Street food vendor using mobile app" data-ai-hint="street food vendor mobile app" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="w-full h-96 relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow order-last md:order-first">
                        <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Quality supplier warehouse" data-ai-hint="supplier warehouse quality ingredients"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className='md:pl-12'>
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                          <Truck className="h-4 w-4" />
                          For Suppliers
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Expand Your Customer Base</h2>
                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            Expand your customer base by connecting with verified street food vendors who need reliable, quality ingredients.
                        </p>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                  <Star className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Build Trust & Reputation</h3>
                                    <p className="text-muted-foreground">Get rated and reviewed by vendors to build credibility and attract more customers.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                  <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Efficient Order Management</h3>
                                    <p className="text-muted-foreground">Manage bulk orders, track deliveries, and maintain inventory all in one place.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                  <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
                                    <p className="text-muted-foreground">Chat directly with vendors to understand requirements and build lasting relationships.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-gradient-to-r from-muted/30 to-card/50 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Why Choose VendorTrust?</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                We understand the unique challenges of street food vendors and have built a platform specifically for your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    All suppliers undergo quality verification. Products are tested and certified for safety and quality standards.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Location Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Find suppliers closest to your location for faster delivery and reduced transportation costs.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Bulk Purchasing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Join group buying programs to access wholesale prices and premium quality ingredients.
                  </p>
                </CardContent>
              </Card>
                </div>
            </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
                <div className="text-primary-foreground/80">Active Vendors</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80">Verified Suppliers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                <div className="text-primary-foreground/80">Orders Completed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
                <div className="text-primary-foreground/80">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-card border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VendorTrust. Empowering street food vendors across India.</p>
        </div>
      </footer>
    </div>
  );
}
