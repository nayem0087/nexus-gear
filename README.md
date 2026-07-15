# NexusGear

A full-stack tech marketplace platform where users can browse, list, and manage premium tech gear. Built with a modern TypeScript stack, secure role-based authentication, and a clean, responsive dark-themed UI.

🔗 **Live Site:** [Add your deployed URL here]
📦 **Frontend Repo:** [Add your frontend GitHub link here]
📦 **Backend Repo:** [Add your backend GitHub link here]

---

## Demo Credentials

| Role  | Email             | Password       |
|-------|-------------------|----------------|
| User  | `user@demo.com`   | `[password]`   |
| Admin | `admin@demo.com`  | `[password]`   |

> Update the table above with your actual seeded demo accounts before submission.

---

## Tech Stack

**Frontend**
- Next.js (App Router) + TypeScript
- Tailwind CSS
- HeroUI (component library)
- Recharts (admin analytics charts)
- react-hot-toast (notifications)

**Backend**
- Node.js + Express.js (product & admin data API)
- Next.js Route Handlers (authentication API)
- better-auth (authentication & session management)
- MongoDB Atlas (database)

**Auth Providers**
- Email & Password
- Google OAuth

---

## Features

### 🏠 Landing Page
- Sticky, fully responsive navbar (route count adapts based on auth state)
- Hero section with clear call-to-action
- Multiple content sections (features, categories, highlights, testimonials, stats, newsletter, FAQ)
- Fully functional footer with working links and contact/social info

### 🧱 Product Listing
- Responsive card grid (4 columns on desktop, scaling down for tablet/mobile)
- Consistent card sizing, spacing, and border radius
- Skeleton loaders while data is fetching
- Each card shows image, title, short description, price, and a **View Details** link

### 🔍 Explore / Items Page
- Live search by title
- Filtering by **priority** and **price range** (2+ fields)
- Sorting: newest, oldest, price (low–high / high–low), title (A–Z)
- Client-side pagination with page controls
- "Clear filters" and live result count

### 📄 Item Details Page
- Publicly accessible
- Media display, Overview, Key Information / Specifications sections
- Conditional Reviews and Related Items sections (only rendered when data exists)
- Inline **Edit** and **Delete** available to the item's owner

### 🔐 Authentication
- Email/password registration and login with validation and error handling
- Google social login
- Role-based session data (`user` / `admin`)
- Protected routes redirect unauthenticated users to sign-in

### ➕ Add Item (Protected — `/items/add`)
- Accessible only when logged in
- Fields: title, short description, full description, price, date, priority, optional image URL
- Submits directly to MongoDB via the backend API

### 🗂️ Manage Items (Protected)
- Grid/table view of the current user's listed items
- View and Delete actions
- Clean, responsive layout

### 🛠️ Admin Dashboard
- Protected by role check (`admin` only)
- Stat cards: total users, total products, total revenue
- Platform distribution donut chart (user vs. admin breakdown)
- **Manage Users**: view all registered users, block/unblock access
- Dedicated admin profile page

### 👤 Profile Pages
- Dynamic profile view/edit for both user and admin roles
- Editable name, bio, and skills, persisted via the auth backend

### 📱 Responsive Navigation
- Desktop navbar with dropdown account menu
- Mobile slide-out drawer sidebar with role-aware navigation links

### 📃 Additional Pages
- About
- Contact
- (Add any further pages — Blog, Help/Support, Privacy/Terms — as implemented)

---

## Project Structure

```
nexus-gear/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/route.ts   # better-auth handler
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx             # admin stats + chart
│   │   │   │   ├── users/page.tsx       # manage users
│   │   │   │   └── profile/page.tsx
│   │   │   └── user/
│   │   │       ├── page.tsx
│   │   │       ├── form/page.tsx        # add item
│   │   │       └── profile/page.tsx
│   │   ├── items/
│   │   │   ├── page.tsx                 # explore page
│   │   │   ├── add/page.tsx
│   │   │   └── [id]/page.tsx            # details page
│   │   ├── layout.tsx
│   │   └── page.tsx                     # landing page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── Footer.tsx
│   │   └── ProfileView.tsx
│   └── lib/
│       ├── auth.ts                      # better-auth server config
│       ├── auth-client.ts               # better-auth client
│       └── mongodb.ts
├── server/                              # Express backend (products & admin data)
│   └── index.js
├── .env
└── README.md
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-generated-secret

MONGO_DB_URL=your-mongodb-connection-string
AUTH_DB_NAME=your-database-name

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> Generate a secret with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## Getting Started

```bash
# 1. Clone the repository
git clone [your-repo-url]
cd nexus-gear

# 2. Install dependencies
npm install

# 3. Set up environment variables (see above)

# 4. Run the Express backend (in a separate terminal)
cd server
npm install
node index.js

# 5. Run the Next.js frontend
npm run dev
```

The app will be available at `http://localhost:3000`, with the backend API running on `http://localhost:5000`.

---

## API Endpoints

### Auth (handled by better-auth)
| Method | Endpoint                     | Description          |
|--------|-------------------------------|-----------------------|
| POST   | `/api/auth/sign-up/email`     | Register new user     |
| POST   | `/api/auth/sign-in/email`     | Log in                |
| GET    | `/api/auth/get-session`       | Get current session   |
| POST   | `/api/auth/sign-out`          | Log out               |

### Products (Express backend)
| Method | Endpoint                | Description             |
|--------|--------------------------|--------------------------|
| GET    | `/api/products`          | List all products        |
| GET    | `/api/products/:id`      | Get a single product     |
| POST   | `/api/products`          | Create a new product     |
| PUT    | `/api/products/:id`      | Update a product         |
| DELETE | `/api/products/:id`      | Delete a product         |

### Admin (Express backend, admin-only)
| Method | Endpoint                             | Description                  |
|--------|----------------------------------------|-------------------------------|
| GET    | `/api/admin/stats`                     | Platform statistics           |
| GET    | `/api/admin/users`                     | List all non-admin users      |
| PATCH  | `/api/admin/users/:id/block`           | Block or unblock a user       |

---

## Design System

- **Primary colors:** Blue, Purple (+ neutral black/zinc for backgrounds and cards)
- **Consistent card styling:** rounded-xl/2xl, `zinc-900` background, `zinc-800` border
- **Fully responsive:** mobile, tablet, and desktop breakpoints throughout

---

## Author

Built by **[Your Name]** as a full-stack TypeScript project demonstrating frontend development, backend API design, authentication/authorization, database management, and professional UI/UX practices.