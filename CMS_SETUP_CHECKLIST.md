# CMS Setup Checklist

Complete this checklist as you set up and deploy your CMS.

## 📋 Pre-Setup
- [ ] Node.js installed (v16+)
- [ ] npm installed and working
- [ ] Git repository set up
- [ ] Docker installed (optional, for MongoDB)
- [ ] GitHub account (for deployment)

## 🔧 Backend Setup

### Installation
- [ ] Navigated to `server` directory
- [ ] Run `npm install`
- [ ] All dependencies installed successfully

### MongoDB Setup
- [ ] **Choose option:**
  - [ ] Docker: `docker run -d -p 27017:27017 mongo:latest`
  - [ ] Local MongoDB installed and running
  - [ ] MongoDB Atlas account created and cluster ready
- [ ] MongoDB connection string obtained
- [ ] `MONGODB_URI` added to `server/.env`

### Environment Configuration
- [ ] `server/.env` file exists with:
  - [ ] `MONGODB_URI=...`
  - [ ] `JWT_SECRET=...` (random string)
  - [ ] `SMTP_HOST=smtp.gmail.com`
  - [ ] `SMTP_USER=your-email@gmail.com`
  - [ ] `SMTP_PASS=your-app-password`
  - [ ] `CONTACT_RECEIVER=abhisheek227@gmail.com`
  - [ ] `PORT=4000`

### Backend Testing
- [ ] Run `npm run dev`
- [ ] Server starts without errors
- [ ] Server listening on http://localhost:4000
- [ ] Test health check: `curl http://localhost:4000/api/health`
- [ ] MongoDB connection successful (no connection errors in console)

## 🎨 Frontend Setup

### Installation
- [ ] Navigated to `client` directory
- [ ] Run `npm install`
- [ ] All dependencies installed successfully

### Environment Configuration
- [ ] `client/.env` file exists with:
  - [ ] `VITE_API_URL=http://localhost:4000`

### Frontend Testing
- [ ] Run `npm run dev`
- [ ] Frontend starts without errors
- [ ] Server accessible at http://localhost:5173
- [ ] No console errors in browser

## 👤 First Admin Account

### Create Admin
- [ ] Opened http://localhost:5173/admin/login
- [ ] Clicked "Create Admin Account"
- [ ] Entered valid credentials:
  - [ ] Username: `admin` (or your choice)
  - [ ] Email: `admin@example.com` (or your email)
  - [ ] Password: Strong password (12+ chars, uppercase, numbers)
- [ ] Account created successfully
- [ ] Redirected to login page
- [ ] Login with created credentials works
- [ ] Redirected to admin dashboard

## 🎯 Admin Dashboard Testing

### Content Management
- [ ] Can navigate between content type tabs
- [ ] Can add new industry
  - [ ] Fill title and description
  - [ ] Click "Add Content"
  - [ ] Item appears in list
- [ ] Can edit industry
  - [ ] Click edit icon
  - [ ] Update fields
  - [ ] Click "Update Content"
  - [ ] Changes saved
- [ ] Can delete industry
  - [ ] Click delete icon
  - [ ] Confirm deletion
  - [ ] Item removed from list

### Test All Content Types
- [ ] Industries (✓ or ☐)
- [ ] Packing Materials (✓ or ☐)
- [ ] Testimonials (✓ or ☐)
- [ ] Products (✓ or ☐)
- [ ] Features (✓ or ☐)

### Security Testing
- [ ] Logout button works
- [ ] Redirects to login after logout
- [ ] Can't access /admin/dashboard without login
- [ ] Token expires after 7 days (tested manually)
- [ ] Rate limiting works (try 6 rapid logins)

## 📝 Content Creation

### Add Sample Data
- [ ] Added 3+ industries
- [ ] Added 2+ materials
- [ ] Added 1+ testimonial
- [ ] Added 1+ product
- [ ] Data displays correctly in lists

### Verify Public Access
- [ ] Content visible on public pages
- [ ] Industries appear on home page
- [ ] Materials display correctly
- [ ] Testimonials showing in testimonials section

## 🔐 Security Verification

### Before Production
- [ ] JWT_SECRET changed from default (in `server/.env`)
- [ ] Passwords are strong (12+ characters)
- [ ] `.env` files in `.gitignore`
- [ ] No secrets in code or comments
- [ ] CORS configured for production domain
- [ ] HTTPS ready (for production)

### Test Security Features
- [ ] XSS protection: Add `<script>` in title → escaped
- [ ] SQL injection attempt rejected
- [ ] Rate limiting active (test with rapid requests)
- [ ] Invalid tokens rejected (401 error)
- [ ] Expired tokens rejected (403 error)

## 🚀 Production Deployment

### Backend Deployment (Render.com example)
- [ ] Pushed code to GitHub
- [ ] Created Render account
- [ ] Connected Render to GitHub repo
- [ ] Set environment variables:
  - [ ] `MONGODB_URI` (MongoDB Atlas connection)
  - [ ] `JWT_SECRET` (production secret)
  - [ ] `SMTP_*` (email credentials)
- [ ] Build successful
- [ ] Server running on production URL
- [ ] Health check working
- [ ] MongoDB connection successful

### Frontend Deployment (Vercel example)
- [ ] Pushed code to GitHub
- [ ] Created Vercel account
- [ ] Connected Vercel to GitHub repo
- [ ] Set `VITE_API_URL` to production backend URL
- [ ] Build successful
- [ ] Site accessible at production URL
- [ ] Admin dashboard accessible at `/admin/login`

### API Integration
- [ ] Updated frontend API URL to production
- [ ] Admin login works on production
- [ ] Can create/edit/delete content on production
- [ ] Contact form sends emails
- [ ] No CORS errors in production

## 📊 Monitoring & Maintenance

### Setup Monitoring
- [ ] Server logs accessible
- [ ] Error tracking set up (optional: Sentry, DataDog)
- [ ] Backup strategy defined
- [ ] Database backups automated (if using MongoDB Atlas)

### Post-Deployment Tasks
- [ ] Document admin credentials (store securely)
- [ ] Create backup of `.env` files (stored securely)
- [ ] Train team on CMS usage
- [ ] Set up admin user accounts for team members
- [ ] Document update procedures

## 📚 Documentation

### Created Files Review
- [ ] `CMS_SETUP.md` - Comprehensive setup guide
- [ ] `QUICK_START_CMS.md` - Quick reference
- [ ] `SECURITY_GUIDELINES.md` - Security docs
- [ ] `CMS_IMPLEMENTATION_SUMMARY.md` - Overview
- [ ] This checklist file

### Team Documentation
- [ ] Shared setup instructions with team
- [ ] Shared admin credentials (securely)
- [ ] Shared security guidelines
- [ ] Created runbooks for common tasks

## ✨ Optional Enhancements

### Nice-to-Have Features
- [ ] Multi-language support
- [ ] Image upload functionality
- [ ] Content scheduling (publish date)
- [ ] Revision history/versioning
- [ ] Email notifications for content changes
- [ ] Advanced search and filtering
- [ ] Content export (CSV, JSON)
- [ ] Team collaboration features

### Future Security Improvements
- [ ] Two-factor authentication (2FA)
- [ ] IP whitelist for admin access
- [ ] Audit logging for all actions
- [ ] Automated security scanning (OWASP)
- [ ] API key authentication for integrations
- [ ] OAuth2 social login support

## 🎓 Team Training

- [ ] Admin showed how to login
- [ ] Team trained on creating content
- [ ] Team trained on editing content
- [ ] Team trained on deleting content
- [ ] Security best practices explained
- [ ] Password change procedures documented
- [ ] Emergency contact procedures documented

## 📞 Handoff Checklist

- [ ] Admin dashboard is fully functional
- [ ] All team members have access
- [ ] Documentation is complete and accessible
- [ ] Backups are configured
- [ ] Monitoring is set up
- [ ] Support process documented
- [ ] Deployment procedures documented
- [ ] Rollback procedures documented

---

## Progress Summary

**Setup Complete:** ☐ Not Started / ☐ In Progress / ☐ Complete

**Date Started:** ___________

**Date Completed:** ___________

**Deployed to Production:** ☐ Yes / ☐ No / ☐ Scheduled for: ___________

**Notes:**
```
_________________________________
_________________________________
_________________________________
```

---

## 🆘 Help & Support

If stuck on any step:
1. Check the relevant documentation (CMS_SETUP.md)
2. Review the troubleshooting section
3. Check server and browser console for errors
4. Verify all environment variables are set
5. Ensure MongoDB is running

**Common Issues:**
- MongoDB not running → Start MongoDB first
- API not responding → Check `VITE_API_URL`
- Admin dashboard blank → Check browser console for errors
- Can't login → Verify admin was created, check password

Good luck! 🚀
