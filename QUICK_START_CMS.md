# Quick Start - Vezo CMS

## Installation (5 minutes)

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Database
```bash
# Option 1: Docker (requires Docker installed)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Option 2: Download MongoDB locally from mongodb.com
# Or use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas
```

Set `MONGODB_URI` in `server/.env` to your MongoDB connection string.

## First Login

1. Open http://localhost:5173/admin/login
2. Click "Create Admin Account"
3. Fill in username, email, password
4. Click "Login" after account created
5. You're in the admin dashboard! 🎉

## Features at a Glance

| Feature | Details |
|---------|---------|
| 🔐 **Auth** | JWT tokens + password hashing |
| ⚠️ **Validation** | Input sanitization against XSS |
| 🚫 **Rate Limit** | Brute force protection |
| 📝 **Content Types** | Industries, Materials, Testimonials, Products, Features |
| 👤 **Admin Panel** | Create/edit/delete content easily |
| 📊 **Database** | MongoDB with flexible schema |

## Environment Variables

**server/.env:**
```env
MONGODB_URI=mongodb://localhost:27017/vezo-cms
JWT_SECRET=change-me-in-production
SMTP_HOST=smtp.gmail.com
...
```

**client/.env:**
```env
VITE_API_URL=http://localhost:4000
```

## API Examples

### Login
```javascript
const res = await fetch('/api/admin/login', {
  method: 'POST',
  body: JSON.stringify({ username: 'admin', password: 'pass' })
});
const { token } = await res.json();
```

### Create Content
```javascript
const res = await fetch('/api/content', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'industry',
    title: 'Pharmaceuticals',
    description: 'For medicine packaging'
  })
});
```

### Get Content (Public)
```javascript
const res = await fetch('/api/content?type=industry');
const content = await res.json();
```

## Deployment

### Backend (Render.com example)
1. Push code to GitHub
2. Connect Render to your repo
3. Set environment variables
4. Deploy

### Frontend (Vercel example)
1. Push code to GitHub
2. Connect Vercel to repo
3. Update `VITE_API_URL` to production backend
4. Deploy

## Troubleshooting

| Issue | Fix |
|-------|-----|
| MongoDB error | Ensure MongoDB is running on localhost:27017 |
| Login fails | Check username/password match |
| Can't create content | Verify JWT token is valid (expires in 7 days) |
| Rate limited | Wait 15 mins for login, 1 min for content |

## Next Steps

1. ✅ Start both servers (backend on 4000, frontend on 5173)
2. ✅ Create first admin account
3. ✅ Add your content (industries, materials, etc.)
4. ✅ Deploy when ready

See `CMS_SETUP.md` for complete documentation.
