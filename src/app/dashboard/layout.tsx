'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Home,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  UserCircle,
  LogOut,
  Store,
  Search,
  PanelLeft,
  Settings,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

type UserRole = 'supplier' | 'vendor';

const supplierNavItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

const vendorNavItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/marketplace', label: 'Marketplace', icon: Store },
  { href: '/dashboard/suppliers', label: 'Find Suppliers', icon: Search },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

function NavLink({ item, isMobile = false }: { item: { href: string; label: string; icon: React.ElementType }; isMobile?: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;
  const isNew = item.label === 'AI Assistant';

  if (isMobile) {
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-4 px-2.5 ${isActive ? 'text-foreground bg-accent' : 'text-muted-foreground'} hover:text-foreground rounded-lg py-2 transition-colors`}
      >
        <Icon className="h-5 w-5" />
        <span className="flex items-center gap-2">
          {item.label}
          {isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
        </span>
      </Link>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 md:h-9 md:w-9 ${isActive ? 'bg-accent text-accent-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}
          >
            <Icon className="h-5 w-5" />
            {isNew && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></div>
            )}
            <span className="sr-only">{item.label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {item.label}
          {isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('vendor');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'vendor' || storedRole === 'supplier') {
        setUserRole(storedRole);
      }
    }
  }, []);

  const navItems = userRole === 'supplier' ? supplierNavItems : vendorNavItems;

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore errors for now
    }
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-border/50 bg-background/80 backdrop-blur-md sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Shield className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">VendorTrust</span>
          </Link>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                 <button onClick={handleLogout} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-foreground hover:bg-destructive/10 md:h-8 md:w-8">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                 </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:pl-14">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PanelLeft className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg">{userRole === 'supplier' ? 'Supplier' : 'Vendor'} Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back to VendorTrust</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full hover:shadow-md transition-shadow">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button onClick={handleLogout} className="w-full text-left">Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-6 p-6 sm:px-8 sm:py-6 md:gap-8">
            {React.cloneElement(children as React.ReactElement, { userRole })}
        </main>
      </div>
    </div>
  );
}
