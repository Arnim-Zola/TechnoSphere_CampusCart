# CampusCart 🎓🛒

Your Campus Essentials, Simplified.

CampusCart is a premium stationery and campus essentials e-commerce platform built for the modern student. It features a beautiful, dynamic user interface, real-time inventory tracking, and a robust admin dashboard for managing orders and products.

## 🚀 Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS, Framer Motion
- **Backend/Database**: Firebase (Auth, Firestore, Storage)
- **Icons**: Lucide React
- **Payments**: Razorpay (Integration Ready)

## 🛠️ Getting Started (Local Development)

1. **Clone the repository**
```bash
git clone https://github.com/Arnim-Zola/TechnoSphere_CampusCart.git
cd techfusion-stationery
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Environment Variables**
Copy the `.env.example` file to `.env.local` and add your Firebase configuration:
```bash
cp .env.example .env.local
```

4. **Run the Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing / Demo Credentials

To make it easy for judges to review the platform, we have included test accounts:

**Admin Portal Bypass (For Hackathon Review):**
- Click the **Admin Toggle Icon** on the login screen.
- **Email**: `admin123@gmail.com`
- **Password**: `admin123`
*(This will bypass standard auth and drop you directly into the Admin Dashboard so you can see the inventory/order management system!)*

## 📦 Features Highlight
- **Dual Portals**: Separate, secure experiences for Users (shopping) and Admins (management).
- **Dark Mode**: Fully supported, sleek dark mode toggle for late-night studying.
- **Mock Data Ready**: Pre-populated with high-quality mock data (`src/lib/mockData.js`) so the store is instantly testable.
- **Dynamic Animations**: Smooth transitions and hover effects using Tailwind and Framer Motion.
- **Live Order Tracking**: Customers receive live UI updates when admins mark their orders as "Completed".

---
*Built with ❤️ for the Hackathon.*
