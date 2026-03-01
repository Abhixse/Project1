# Vezo CMS - Content Management System

A secure, modern CMS for managing all content on your Vezo website. Built with MongoDB, Express, React, and Node.js with comprehensive security features.

## Features

### 🔐 Security
- **JWT Authentication**: Secure token-based authentication for admin access
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation & Sanitization**: All user inputs are validated and sanitized to prevent XSS attacks
- **Rate Limiting**: Protection against brute force attacks and API abuse
  - Login: 5 attempts per 15 minutes
  - Content operations: 30 requests per minute
  - General API: 100 requests per 15 minutes
- **CORS Protection**: Restricted cross-origin requests
- **Environment Variables**: Sensitive data stored securely in `.env`

### 📝 Content Management
Manage all dynamic content:
- **Industries** - Industry cards with descriptions
- **Packing Materials** - Material types and features
- **Testimonials** - Client testimonials and reviews
- **Products** - Product listings and details
- **Features** - Feature highlights
- **Sections** - Custom sections and blocks

### 👤 Admin Features
- Secure admin login/registration
- Create, read, update, delete (CRUD) operations for all content
- Drag-and-drop reordering (order field)
- Bulk operations support
- Admin dashboard with organized content management
- Role-based access control (admin, editor)

## Setup Instructions

### Backend Setup

#### 1. Install Dependencies
```bash
cd server
npm install
```

#### 2. Configure Environment Variables
Create or update `server/.env`:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/vezo-cms
# For MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/vezo-cms

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production

# Gmail SMTP (existing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=abhisheek227@gmail.com
SMTP_PASS=your-app-password
CONTACT_RECEIVER=abhisheek227@gmail.com

# Server
PORT=4000
```

#### 3. Set up MongoDB
**Option A: Local MongoDB**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: MongoDB Atlas (Cloud)**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

#### 4. Start Backend Server
```bash
npm start       # Production
npm run dev     # Development with auto-reload (nodemon)
```

Server runs on `http://localhost:4000`

### Frontend Setup

#### 1. Install Dependencies
```bash
cd client
npm install
```

#### 2. Start Frontend Development Server
```bash
npm run dev
```

### First Time Setup

#### 1. Access Admin Registration
- Navigate to `http://localhost:5173/admin/login`
- Click "Create Admin Account"
- Register with username, email, and password
- The first registered user becomes an admin

#### 2. Login
- Use your credentials to login
- You'll be redirected to the admin dashboard

## API Endpoints

### Authentication

#### Register Admin (First time only)
```bash
POST /api/admin/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepassword"
}
```

#### Login
```bash
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "securepassword"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "_id": "...",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Get Current Admin
```bash
GET /api/admin/me
Authorization: Bearer {token}
```

### Content CRUD

#### Get All Content (Public - No Auth Required)
```bash
GET /api/content
GET /api/content?type=industry
GET /api/content?type=material&isActive=true
```

#### Get Single Content Item
```bash
GET /api/content/:id
```

#### Create Content (Requires Auth)
```bash
POST /api/content
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "industry",
  "title": "Pharmaceutical",
  "description": "For pharmaceutical and medicine packaging",
  "icon": "Pill",
  "color": "#006ac0",
  "isActive": true,
  "order": 1,
  "metadata": {}
}
```

#### Update Content (Requires Auth)
```bash
PUT /api/content/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "industry",
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

#### Delete Content (Requires Admin Role)
```bash
DELETE /api/content/:id
Authorization: Bearer {token}
```

#### Reorder Content (Bulk)
```bash
POST /api/content/reorder
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    { "id": "123", "order": 1 },
    { "id": "456", "order": 2 },
    { "id": "789", "order": 3 }
  ]
}
```

## Content Types

### Industry
```json
{
  "type": "industry",
  "title": "Pharmaceutical",
  "description": "For medicines and tablets",
  "icon": "Pill",
  "color": "#FF6B6B",
  "order": 1,
  "isActive": true
}
```

### Packing Material
```json
{
  "type": "material",
  "title": "Bio-Degradable",
  "description": "100% biodegradable packaging materials",
  "icon": "Leaf",
  "color": "#51CF66",
  "order": 1,
  "isActive": true
}
```

### Testimonial
```json
{
  "type": "testimonial",
  "title": "Amazing Quality",
  "content": "The packaging quality is exceptional...",
  "author": "John Doe",
  "company": "ABC Corporation",
  "rating": 5,
  "imageUrl": "https://...",
  "isActive": true
}
```

### Product
```json
{
  "type": "product",
  "title": "Custom Boxes",
  "description": "Custom printed packaging boxes",
  "icon": "Box",
  "imageUrl": "https://...",
  "order": 1,
  "isActive": true
}
```

## Using the Admin Dashboard

### Login
1. Navigate to `/admin/login`
2. Enter your credentials
3. Click "Login"

### Manage Content
1. Select content type from tabs (Industries, Materials, etc.)
2. Fill in the form with content details
3. Click "Add Content" to create new content
4. Click edit icon on any item to modify it
5. Click delete icon to remove content

### Security Features in Action
- **Sessions**: Auto-logout after 7 days (token expiration)
- **Rate Limiting**: Attempts to bypass rate limits will receive "Too many requests" errors
- **Validation**: Invalid data is rejected with clear error messages
- **Input Sanitization**: HTML tags and scripts are automatically escaped

## Deployment

### Backend (Render, Heroku, etc.)
1. Set environment variables on hosting platform
2. Connect your Git repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

### Frontend (Vercel, Netlify, etc.)
1. Update `VITE_API_URL` in client/.env to production backend URL
2. Deploy as usual
3. Admin dashboard accessible at `yourdomain.com/admin/login`

## Security Best Practices

### ✅ Do's
- Change `JWT_SECRET` in production (use a strong random string)
- Use environment variables for all sensitive data
- Keep `.env` files in `.gitignore` (already configured)
- Regularly update npm packages
- Use HTTPS in production
- Monitor rate limit logs for suspicious activity
- Use strong, unique admin passwords

### ❌ Don'ts
- Commit `.env` files to Git
- Share JWT tokens or secrets
- Use default/weak passwords
- Store sensitive data in code
- Allow public access to admin routes
- Disable CORS validation

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB or check `MONGODB_URI` in `.env`

### JWT Secret Error
```
Error: invalid signature
```
**Solution**: Set `JWT_SECRET` in `.env` and restart server

### Rate Limit Exceeded
```
Too many requests from this IP
```
**Solution**: Wait 15 minutes for login, 1 minute for content operations

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure frontend API URL matches backend configuration

## Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, min 3 chars),
  email: String (unique, email format),
  password: String (hashed with bcrypt),
  role: String (enum: ["admin", "editor"]),
  createdAt: Date,
  lastLogin: Date
}
```

### Content Collection
```javascript
{
  _id: ObjectId,
  type: String (enum: ["industry", "material", "testimonial", "product", "feature", "section"]),
  title: String (required),
  description: String,
  content: String,
  icon: String,
  color: String,
  imageUrl: String,
  rating: Number,
  author: String,
  company: String,
  isActive: Boolean,
  order: Number,
  metadata: Mixed (flexible additional data),
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId (reference to Admin)
}
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error messages in browser console and server logs
3. Ensure MongoDB is running
4. Verify all environment variables are set correctly
5. Check network tab in browser DevTools for API calls

## License

This project is part of the Vezo website and is proprietary.
