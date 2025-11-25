# 🚀 Production Deployment Checklist

This checklist ensures safe and successful deployments to production/preview environments.

## 📋 Pre-Deployment Checklist

### 1. Local Testing ✅
- [ ] All features work correctly in development (`pnpm dev`)
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No TypeScript errors (`pnpm generate:types`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Tests pass (if applicable)

### 2. Database Verification 🗄️
MongoDB schema verification:

- [ ] MongoDB running in development (`docker-compose up -d`)
- [ ] Dev server connects successfully (`pnpm dev`)
- [ ] Build succeeds (`pnpm build`)
- [ ] MongoDB Atlas configured for production
- [ ] Production `MONGODB_URI` set in Vercel environment variables

### 3. Git Preparation 📝
- [ ] All changes committed
- [ ] Descriptive commit message:
  ```bash
  git commit -m "feat: [description of changes]"
  ```
- [ ] No sensitive data in commits (API keys, passwords, etc.)

### 4. Environment Variables 🔐
- [ ] Production environment variables set in Vercel dashboard
- [ ] No `.env.production` file in repository
- [ ] All required variables documented:
  - `MONGODB_URI` - MongoDB Atlas connection string
  - `PAYLOAD_SECRET` - JWT secret
  - `NEXT_PUBLIC_SERVER_URL` - Production URL
  - `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage
  - `PREVIEW_SECRET` - Preview mode security
  - `RESEND_API_KEY` - Email service
  - `CRON_SECRET` - Vercel cron authentication

### 5. Pre-Push Verification 🔍
- [ ] One final local build test:
  ```bash
  pnpm build
  ```
- [ ] Check for any uncommitted changes:
  ```bash
  git status
  ```
- [ ] Verify branch is up to date:
  ```bash
  git pull origin main  # or your base branch
  ```

## 🚢 Deployment Process

### Option A: Preview Deployment (Recommended First)
1. Push to a preview branch:
   ```bash
   git push origin feature/your-branch
   ```
2. Vercel automatically creates preview deployment
3. Test preview URL thoroughly
4. If everything works, merge to main

### Option B: Direct Production Deployment
1. Push to main branch:
   ```bash
   git push origin main
   ```
2. Vercel automatically deploys to production

## 🔍 Post-Deployment Verification

### Immediate Checks
- [ ] Deployment succeeded in Vercel dashboard
- [ ] Website loads correctly
- [ ] Admin panel accessible at `/admin`
- [ ] No console errors in browser
- [ ] Core functionality works (navigation, forms, etc.)

### Database Verification
- [ ] MongoDB Atlas connection is successful
- [ ] New features/fields appear in admin panel
- [ ] Data displays correctly on frontend

### Performance Checks
- [ ] Page load times acceptable
- [ ] Images loading properly
- [ ] No 404 errors for assets

## 🚨 Rollback Plan

If something goes wrong:

### Quick Rollback
1. In Vercel dashboard, click "Redeploy"
2. Select a previous successful deployment
3. Click "Redeploy" to restore

### Migration Issues
If database connection failed:
1. Check error in Vercel logs
2. Verify `MONGODB_URI` is correctly set
3. Check MongoDB Atlas network access allows Vercel IPs
4. Verify database user credentials are correct

### Emergency Database Recovery
- MongoDB Atlas maintains automatic backups
- Use Atlas dashboard to restore from backup if needed

## 📝 Common Issues & Solutions

### "Cannot connect to MongoDB" in production
**Cause:** MongoDB Atlas not configured or network access restricted
**Fix:**
1. Verify `MONGODB_URI` is set in Vercel
2. Add Vercel IPs to MongoDB Atlas network access
3. Or allow access from anywhere: `0.0.0.0/0`

### Build fails on Vercel but works locally
**Cause:** Environment variables missing
**Fix:** Check all required env vars in Vercel dashboard

### MongoDB connection timeout
**Cause:** Network access restrictions
**Fix:** Configure MongoDB Atlas network access to allow Vercel connections

### Preview mode not working
**Cause:** Missing PREVIEW_SECRET
**Fix:** Set PREVIEW_SECRET in Vercel environment variables

## 🎯 Best Practices

1. **Always deploy to preview first** - Test in preview before production
2. **Test MongoDB connection** - Verify database connectivity before major deployments
3. **Monitor after deployment** - Watch logs for 10-15 minutes post-deployment
4. **Backup before major changes** - Use MongoDB Atlas backups before significant updates

## 📊 Deployment Timeline

Typical deployment takes:
- Build: 2-5 minutes
- MongoDB connection: 1-5 seconds
- Cache invalidation: 1-2 minutes
- **Total: 3-8 minutes**

## 🆘 Getting Help

If you encounter issues:
1. Check Vercel function logs
2. Review this checklist
3. Check `/docs/ENVIRONMENT.md` for configuration help
4. Review `/docs/MONGODB_MIGRATION.md` for MongoDB setup
5. Create an issue with error details and logs

---

**Remember:** It's better to be cautious and test thoroughly than to rush a deployment! 🚀