# 🚀 Production Deployment Checklist

This checklist ensures safe and successful deployments to production/preview environments.

## 📋 Pre-Deployment Checklist

### 1. Local Testing ✅
- [ ] All features work correctly in development (`pnpm dev`)
- [ ] Build succeeds locally (`pnpm build`)
- [ ] No TypeScript errors (`pnpm generate:types`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Tests pass (if applicable)

### 2. Database Schema Changes 🗄️
If you made any changes to collections, fields, or database structure:

- [ ] Dev server auto-synced schema (verified by running `pnpm dev`)
- [ ] Build works after schema sync (`pnpm build`)
- [ ] **Created migration for production:**
  ```bash
  pnpm payload migrate:create
  # or
  pnpm migrate:create
  ```
- [ ] Migration files generated in `src/migrations/`
- [ ] Reviewed migration files for accuracy
- [ ] Both `.ts` and `.json` migration files exist

### 3. Git Preparation 📝
- [ ] All changes committed
- [ ] Migration files added to git (if created):
  ```bash
  git add src/migrations/
  ```
- [ ] Descriptive commit message:
  ```bash
  git commit -m "feat: [description of changes]"
  ```
- [ ] No sensitive data in commits (API keys, passwords, etc.)

### 4. Environment Variables 🔐
- [ ] Production environment variables set in Vercel dashboard
- [ ] No `.env.production` file in repository
- [ ] All required variables documented:
  - `POSTGRES_URL` - Production database
  - `PAYLOAD_SECRET` - JWT secret
  - `NEXT_PUBLIC_SERVER_URL` - Production URL
  - `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage
  - `PREVIEW_SECRET` - Preview mode security
  - `RESEND_API_KEY` - Email service (if using)

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
- [ ] Check Vercel function logs for migration success
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
If migration failed:
1. Check error in Vercel logs
2. Fix migration locally
3. Create new migration with fix:
   ```bash
   pnpm migrate:create fix_[issue]
   ```
4. Push fix and redeploy

### Emergency Database Recovery
- Vercel/Neon maintains automatic backups
- Contact support if data recovery needed

## 📝 Common Issues & Solutions

### "Column does not exist" in production
**Cause:** Forgot to create migration
**Fix:**
```bash
pnpm migrate:create
git add src/migrations/
git commit -m "fix: add missing migration"
git push
```

### Build fails on Vercel but works locally
**Cause:** Environment variables missing
**Fix:** Check all required env vars in Vercel dashboard

### Migration timeout
**Cause:** Large data transformation
**Fix:** Split into smaller migrations or increase timeout

### Preview mode not working
**Cause:** Missing PREVIEW_SECRET
**Fix:** Set PREVIEW_SECRET in Vercel environment variables

## 🎯 Best Practices

1. **Always deploy to preview first** - Test in preview before production
2. **Name migrations clearly** - Use descriptive names when creating migrations
3. **Keep migrations small** - One feature per migration
4. **Document breaking changes** - Note any changes that might affect existing data
5. **Monitor after deployment** - Watch logs for 10-15 minutes post-deployment

## 📊 Deployment Timeline

Typical deployment takes:
- Build: 2-5 minutes
- Migration run: 10-30 seconds
- Cache invalidation: 1-2 minutes
- **Total: 5-10 minutes**

## 🆘 Getting Help

If you encounter issues:
1. Check Vercel function logs
2. Review this checklist
3. Check `/docs/DATABASE_PREVIEW_STRATEGY.md` for database issues
4. Create an issue with error details and logs

---

**Remember:** It's better to be cautious and test thoroughly than to rush a deployment! 🚀