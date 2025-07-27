# VendorTrust - Street Food Supply Chain Platform

A comprehensive B2B platform designed specifically for Indian street food vendors to connect with trusted, verified suppliers for raw materials.

## Problem Statement
Street food vendors in India face significant challenges in sourcing quality raw materials from reliable suppliers at competitive prices. Issues include:
- Lack of trust in supplier quality
- Difficulty finding local suppliers
- No quality verification systems
- Inconsistent pricing and availability
- Limited access to bulk purchasing benefits

## Solution
VendorTrust provides:
- **Verified Supplier Network**: Quality-checked suppliers with ratings and reviews
- **Location-Based Matching**: Connect vendors with nearby suppliers
- **Quality Assurance**: Product quality verification and certification
- **Bulk Purchasing**: Group buying for better prices
- **Real-time Tracking**: Order and delivery tracking
- **Trust System**: Vendor and supplier verification with ratings

## Features
- **Role-Based Dashboards**: Vendors and suppliers see different dashboards and navigation based on their role.
- **Authentication & Authorization**: Secure login, signup, and role-based route protection.
- **Profile Management**: Users can view and update their company name and see their role and email.
- **Logout**: Secure logout clears all user data and signs out from Firebase Auth.
- **Supplier & Product Discovery**: Vendors can browse suppliers and products, place orders, and track activity.
- **Real-Time Chat**: Communication between vendors and suppliers (WIP).
- **AI-Powered Recommendations**: (Planned) Intelligent product and supplier suggestions.

## Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI Components, shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: Genkit for intelligent matching
- **Deployment**: Vercel

## Getting Started

1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   ```
2. **Set up Firebase:**
   - Create a Firebase project (see docs or [Firebase Console](https://console.firebase.google.com/)).
   - Enable Authentication (Email/Password) and Firestore Database.
   - Copy your Firebase config and update `src/lib/firebase.ts`.
   - (Optional) Use `.env.local` for environment-specific configs.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` (or as shown in your terminal).

## Key Pages
- `/` - Landing page with value proposition
- `/login` - User authentication
- `/signup` - User registration (vendor/supplier)
- `/dashboard` - Role-based dashboard
- `/dashboard/marketplace` - Product marketplace (vendors only)
- `/dashboard/suppliers` - Supplier discovery (vendors only)
- `/dashboard/products` - Product management (suppliers only)
- `/dashboard/orders` - Order management
- `/dashboard/chat` - Real-time communication
- `/dashboard/profile` - Profile management (view/edit company name)

## Development vs Production
- Use separate Firebase projects for development and production.
- Update your Firebase config in `src/lib/firebase.ts` or use environment variables.
- Set appropriate Firestore security rules for production.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Future Improvements
- Password reset and email verification flows
- Enhanced analytics and reporting
- Supplier/vendor reviews and ratings
- Notification system
- Admin panel for platform management
- Improved mobile responsiveness and accessibility

---

**Built with ❤️ for the Indian street food community.**
