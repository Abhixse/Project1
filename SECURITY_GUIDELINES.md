# Vezo CMS - Security Guidelines

## 🔐 Security Features Implemented

### 1. Authentication & Authorization
- ✅ JWT (JSON Web Token) based authentication
- ✅ Bcrypt password hashing with salt rounds
- ✅ Token expiration (7 days)
- ✅ Role-based access control (admin vs editor)
- ✅ Protected routes on frontend and backend

### 2. Input Validation & Sanitization
- ✅ All user inputs validated before processing
- ✅ Email format validation
- ✅ Username length validation (min 3 chars)
- ✅ Password strength enforcement (min 6 chars)
- ✅ HTML escaping to prevent XSS attacks
- ✅ Sanitization of all string inputs

### 3. Rate Limiting
- ✅ **Login attempts**: 5 per 15 minutes (prevents brute force)
- ✅ **Content operations**: 30 per minute (prevents spam)
- ✅ **General API**: 100 per 15 minutes
- ✅ IP-based tracking and throttling

### 4. API Security
- ✅ CORS enabled with proper configuration
- ✅ Authorization header validation
- ✅ Error messages don't leak sensitive info
- ✅ Proper HTTP status codes (401, 403, 400, etc.)

### 5. Data Security
- ✅ Passwords hashed before storage (never plain text)
- ✅ Sensitive data (JWT_SECRET) in environment variables
- ✅ `.env` files in `.gitignore` (not committed)
- ✅ No sensitive data in logs or error responses

### 6. Session Management
- ✅ Token stored in localStorage (not cookies to prevent CSRF)
- ✅ Token expiration enforced
- ✅ Logout clears all auth data
- ✅ Token verified on every protected request

---

## 🛡️ Security Best Practices

### For Administrators
1. **Use Strong Passwords**
   - Minimum 6 characters (enforced by validation)
   - More is better: Use 12+ characters, mix of upper/lower/numbers/symbols
   - Example: `MyVezo2024!@#Secure`

2. **Keep JWT_SECRET Safe**
   - Change default value in `.env` BEFORE deployment
   - Use a random, strong string (32+ characters)
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Never share or commit to version control

3. **Regular Password Changes**
   - Consider changing admin password every 3 months
   - Especially after staff changes

4. **Monitor Admin Activity**
   - Check `lastLogin` field to detect suspicious activity
   - Review content modification logs
   - Set up email alerts for failed login attempts (future enhancement)

### For Deployment

#### Environment Variables - CRITICAL
```bash
# CHANGE THESE IN PRODUCTION
JWT_SECRET=your-super-secret-key-at-least-32-characters
MONGODB_URI=your-production-mongodb-connection-string

# Ensure these are set correctly
SMTP_*=your-gmail-credentials
```

#### MongoDB Security
1. **Enable Authentication**
   - Create user with strong password
   - Use role-based access control

2. **Network Security**
   - Whitelist IP addresses (Render, Vercel, etc.)
   - Avoid allowing all IPs (0.0.0.0/0)

3. **Backups**
   - Regular automated backups (MongoDB Atlas does this)
   - Test restore procedures

4. **Connection String**
   - Use strong passwords in connection string
   - Never use connection string with credentials in code

#### HTTPS Enforcement
- Always use HTTPS in production
- Get SSL certificate (Let's Encrypt is free)
- Redirect HTTP to HTTPS

#### CORS Configuration
- Whitelist only trusted domains
- Don't use wildcard `*` in production
- Specify exact frontend URL

---

## 🚨 Common Security Mistakes to Avoid

| Mistake | Risk | Solution |
|---------|------|----------|
| Storing JWT in cookies | CSRF attacks | Use localStorage + secure httpOnly cookies |
| Weak JWT_SECRET | Token forgery | Use 32+ char random string |
| Allowing all CORS | Cross-origin attacks | Whitelist specific domains |
| Logging sensitive data | Data leaks | Never log passwords, tokens, or secrets |
| Hardcoding secrets | Exposure in git | Always use environment variables |
| No input validation | SQL/XSS injection | Validate and sanitize all inputs |
| Trusting user IDs from frontend | Authorization bypass | Always verify user ID from token |
| Rate limits too loose | API abuse/flooding | Strict limits on sensitive operations |

---

## 🔍 Security Testing Checklist

### Manual Testing
- [ ] Try SQL injection in title field: `'; DROP TABLE--`
- [ ] Try XSS in description: `<script>alert('XSS')</script>`
- [ ] Try CSRF with forged token
- [ ] Access protected routes without token
- [ ] Verify old tokens are rejected
- [ ] Test rate limiting with rapid requests
- [ ] Verify error messages don't leak info

### Automated Testing
```bash
# Check for known vulnerabilities in dependencies
npm audit
npm audit fix  # Auto-fix where possible

# Keep dependencies updated
npm outdated
npm update
```

### Penetration Testing (Advanced)
- Use tools like OWASP ZAP or Burp Suite
- Test password reset functionality
- Check for information disclosure
- Verify TLS/SSL configuration

---

## 🎯 Security Incident Response

If you suspect a security breach:

1. **Immediate Actions**
   - Revoke all user tokens (change JWT_SECRET)
   - Disable compromised admin account
   - Check MongoDB access logs
   - Review Git commit history for exposed secrets

2. **Investigation**
   - Check server logs for unusual activity
   - Review failed login attempts
   - Verify no unauthorized content modifications
   - Check network traffic (Render dashboard)

3. **Remediation**
   - Rotate all secrets (MONGODB_URI, SMTP_PASS, JWT_SECRET)
   - Update all admin passwords
   - Re-enable users one by one
   - Monitor closely for 7 days

4. **Communication**
   - Notify affected users if data accessed
   - Document incident for records
   - Implement improved monitoring

---

## 📊 Security Headers (For Production)

Add these headers to your responses (middleware):

```javascript
// Example middleware to add
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

---

## 🔄 Maintenance & Updates

### Monthly
- [ ] Check `npm audit` output
- [ ] Review user access logs
- [ ] Verify backups are working
- [ ] Check for unused admin accounts

### Quarterly
- [ ] Update all npm packages
- [ ] Review and update security policies
- [ ] Rotate JWT_SECRET (if possible without breaking sessions)
- [ ] Security training or review

### Yearly
- [ ] Full security audit
- [ ] Penetration test
- [ ] Update security documentation
- [ ] Review and update incident response plan

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [Node.js Security Practices](https://nodejs.org/en/docs/guides/nodejs-security/)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)

---

## ✅ Production Deployment Checklist

Before going live:

- [ ] Change all default secrets (JWT_SECRET, MONGODB_URI)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS whitelist with production domain
- [ ] Set up automated backups
- [ ] Enable MongoDB authentication
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerts
- [ ] Review and test rate limiting
- [ ] Verify error handling doesn't leak info
- [ ] Set up log aggregation (e.g., Sentry)
- [ ] Test disaster recovery procedures
- [ ] Document security procedures for team

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Security Level**: Production Ready
