# Deployment Guide

This e-commerce application is a **fullstack project** with a React frontend and Express backend. Netlify can only host the static frontend; the backend needs separate hosting.

## Architecture

- **Frontend**: React + Vite (static files in `dist/public/`)
- **Backend**: Express.js + PostgreSQL (requires a server)
- **Database**: PostgreSQL

## Deployment Options

### Option 1: Frontend on Netlify + Backend on Replit (Recommended for Testing)

**Frontend (Netlify):**
1. Connect your GitHub repository to Netlify
2. Netlify will automatically use `netlify.toml` configuration
3. Build command: `npm run build`
4. Publish directory: `dist/public`
5. Set environment variable: `VITE_API_URL=https://your-replit-name.replit.dev`

**Backend (Replit):**
- Keep the Express server running on Replit
- The database connection is handled automatically
- No additional configuration needed

### Option 2: Frontend on Netlify + Backend on Railway/Render

**Backend Options:**
- [Railway.app](https://railway.app) - Simple, integrated PostgreSQL
- [Render.com](https://render.com) - Good free tier for web services
- [Heroku](https://heroku.com) - Popular option
- [Fly.io](https://fly.io) - Affordable and fast

**Steps:**
1. Deploy backend to your chosen platform
2. Get the backend URL (e.g., `https://your-app.railway.app`)
3. Deploy frontend to Netlify
4. In Netlify dashboard, set environment variable: `VITE_API_URL=<your-backend-url>`

### Option 3: Full Deployment to Alternative Platform

If you prefer not to use Netlify:
- **Vercel** - Best for Next.js, but works with full-stack apps
- **Railway/Render** - Can host both frontend and backend
- **Keep on Replit** - Perfect for development and testing

## Environment Variables

### Frontend (.env.production)

```
VITE_API_URL=https://your-backend-url.com
```

This tells the React app where to make API calls.

### Backend (.env)

```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

## Production Build

Test the production build locally:

```bash
npm run build
npm run start
```

The frontend will be at `dist/public/index.html` and the server at `dist/index.cjs`.

## API Endpoints

All API calls should use the `VITE_API_URL` environment variable:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fetch products
fetch(`${API_BASE}/api/products`)

// Create order
fetch(`${API_BASE}/api/orders`, { method: 'POST', ... })
```

The frontend is already configured to use this pattern via the query client.

## Database Migration for Production

Before running the backend:

```bash
npm run db:push
```

This creates all tables in your production PostgreSQL database.

## SSL/HTTPS

- Netlify provides free HTTPS for frontend
- Railway, Render, and Heroku provide free HTTPS for backend
- Ensure both frontend and backend are HTTPS to avoid mixed content warnings

## Monitoring & Logs

- **Netlify**: View deploy logs in dashboard
- **Backend Service**: Check service dashboard for application logs
- **Database**: Most services provide database access tools

## Rollback

If something goes wrong:
- **Netlify**: Deploy previous commit via dashboard
- **Backend Service**: Use service's rollback feature
- **Database**: Replit supports rollback checkpoints

## Support

- Netlify docs: https://docs.netlify.com
- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs
