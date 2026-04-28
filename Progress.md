# 🚀 CampusCart – Project Progress

## 📌 Project Overview
CampusCart is a web-based pre-order platform designed to streamline campus printing and stationery purchases. The system reduces long queues and manual workflows by allowing students to browse, select, and order items in advance, with a unified checkout and receipt system.

---

## 🧠 Problem Statement
Students face delays due to:
- Long queues for printouts and stationery
- Manual ordering processes
- Lack of pre-order or scheduling system
- Inefficient workflow for both students and staff

---

## 💡 Solution Implemented
CampusCart provides:
- Category-based stationery browsing
- Print upload system for document services
- Centralized cart system
- Seamless checkout experience
- Digital receipt with PDF export

---

## 🏗️ System Architecture

### Frontend
- React (Create React App)
- React Router for navigation
- Context API for global cart state

### Backend (Planned / Partial)
- Node.js + Express
- MongoDB (future integration)

---

## 🔁 Application Flow

Dashboard → Category → Add to Cart → Cart → Checkout → Receipt → Print PDF


---

## 📦 Features Implemented

### 🧭 Dashboard
- Navigation-based UI
- Category routing using `useNavigate`
- Covers all categories:
  - Writing
  - Correction
  - Paper
  - Measuring
  - Office
  - Print / Report

---

### 📂 Category System
- Dynamic routing using `useParams`
- Item customization:
  - Pen → Type + Color
  - Pencil → Type
  - Mechanical Pencil → Size
- Quantity selector with increment/decrement
- Dynamic pricing logic
- Add-to-cart integration

---

### 🛒 Cart System
- Implemented using Context API (`useCart`)
- Features:
  - Add items
  - Remove items
  - Update quantity
  - Real-time total calculation
- Unified cart supports:
  - Stationery items
  - Print items

---

### 💳 Checkout System
- Multiple payment methods:
  - UPI
  - Card
  - Net Banking
  - Pay at Counter
- Dynamic total fetched from CartContext
- Payment simulation (frontend-based)
- Clean UI layout with order summary

---

### 🧾 Receipt System
- Fully structured receipt UI
- Includes:
  - Order ID
  - Date
  - Payment method
  - Itemized breakdown
  - Total paid
  - Transaction ID
- Print / Save as PDF functionality using browser print API
- Cleaned UX by removing unnecessary pickup slot logic

---

## 🔧 Bugs Fixed & Improvements

### 🐞 Critical Fixes
- Fixed quantity mismatch between category and cart
- Fixed `clearCart is not a function` issue
- Fixed undefined total in checkout
- Fixed routing issues (App.js structure)

### 🧹 UX Improvements
- Removed pickup slot for simplicity
- Simplified checkout flow
- Improved navigation between pages
- Cleaned unused dependencies and code

---

## 🤝 Collaboration & Integration

- Integrated features inspired from teammate Nandan’s `Cart_Payments` branch
- Performed selective code extraction instead of full merge
- Refactored code to match existing architecture
- Ensured consistent UI and data flow across modules

---

## 🧪 Testing & Validation

- Verified complete user flow:
  - Add items → Cart → Checkout → Receipt
- Tested:
  - Quantity updates
  - Total calculations
  - Navigation
  - Payment simulation
  - PDF generation

---

## 📦 Current Status

✔ Fully functional frontend system  
✔ End-to-end flow implemented  
✔ Clean UI and UX  
✔ No major bugs  
✔ Ready for hackathon demo  

---

## 🎯 Future Enhancements

- 🔐 User authentication system
- 🗄️ Backend order storage (MongoDB)
- 📊 Admin dashboard for order management
- 🔔 Notification system
- 💳 Real payment gateway integration (Razorpay)
- 🎨 UI/UX enhancements and animations

---

## 🏁 Conclusion

CampusCart successfully demonstrates a practical and scalable solution for campus-based ordering systems. The project integrates real-world workflows with a clean, user-friendly interface and lays a strong foundation for future full-stack expansion.
