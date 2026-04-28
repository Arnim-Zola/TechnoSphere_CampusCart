CampusCart – Development Progress (Evaluation 2)

Phase 0: Ideation and Planning (Completed)

Finalized project idea: CampusCart – Campus Pre-Order and Shopping Platform
Identified problem: Long queues and inefficient manual ordering in campuses
Defined solution: Centralized web platform for pre-ordering printouts and stationery
Selected technology stack: MERN (MongoDB, Express, React, Node.js)
Identified core features:
Pre-order system
Document upload (PDF support)
Order management
Responsive user interface
Formed team and assigned roles

Phase 1: Repository Setup (Completed)

Created GitHub repository
Added README.md with project description and tech stack
Initialized project structure:
backend/
frontend/
Configured version control and collaboration
Established branch-based workflow (feature/dashboard)

Phase 2: Environment Setup (Completed)

Set up backend using Node.js and Express
Initialized frontend using React (Create React App)
Installed required dependencies
Configured environment variables using dotenv
Successfully ran both frontend and backend servers

Phase 3: Backend Development (Partially Completed)

Set up Express server and routing
Connected MongoDB using Mongoose
Created Product schema
Implemented product APIs:
GET /api/products
POST /api/products
Tested APIs using browser/Postman
Inserted sample product data into database

Phase 4: Frontend Development (Partially Completed)

Created core pages:
Dashboard
Category Page
Cart Page
Print Page (PDF upload system)

Implemented routing using React Router
Connected frontend with backend API
Fetched products dynamically based on category
Displayed products in UI
Handled loading and empty states

Phase 5: Core Feature Implementation (In Progress)

Implemented Cart system using Context API (global state)
Developed Add to Cart functionality
Implemented Cart page UI
Added core cart features:
Add to Cart
Remove from Cart
Quantity update
Total price calculation

Implemented Print System:
PDF upload functionality
Auto-detection of number of pages using PDF.js
Selection of print type (Black & White / Color)
Selection of number of copies
Dynamic price calculation based on pages and copies
Added print jobs to cart

Integrated mixed cart support (stationery + print jobs)

Phase 6: Integration and Testing (Pending)

Planned Tasks:
Ensure smooth data flow between frontend and backend
Test complete ordering workflow
Fix UI and functional bugs
Validate cart and order system

Phase 7: Finalization and Deployment (Pending)

Planned Tasks:
Improve UI/UX design
Add final features (checkout/payment system)
Prepare documentation
Deploy application
Perform final testing and presentation

Notes

Project follows a modular MERN architecture
Focus on scalability and maintainability
Development is iterative with continuous debugging
Regular commits maintained for hackathon progress tracking
Clean and structured code practices are followed
