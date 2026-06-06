# Portfolio

A clean editorial portfolio built with React + Vite (client) and Express (server), deployable to Railway.

## Project Structure

```
portfolio/
├── client/          # React + Vite frontend
│   ├── public/      # Static assets (images, downloads)
│   │   ├── art/     # Art samples & animations
│   │   ├── thesis/  # Thesis screenshots, sprites, video
│   │   ├── semester/ # Semester project assets
│   │   └── downloads/ # Downloadable files (scripts, etc.)
│   └── src/
│       ├── pages/   # Home, Writing, Art, Thesis, Semester
│       └── components/
└── server/
    └── index.js     # Express API + serves built client in production
```

## Local Development

```bash
# Install all deps
npm install

# Run both dev servers concurrently
npm run dev
# → Client: http://localhost:5173
# → Server: http://localhost:3001
```

## Adding Your Content

### 1. Update your info
Edit `server/index.js` → find the `portfolioData` object at the top.
Fill in your name, bio, email, GitHub, and all your project entries.

### 2. Add your assets
Put your files in `client/public/` using this structure:

```
client/public/
├── art/
│   ├── sample1.jpg      # matches src in portfolioData.art.samples
│   ├── thumb1.jpg       # thumbnail (smaller version, ~400px wide)
│   └── anim1.gif
├── thesis/
│   ├── screen1.jpg
│   ├── sprite1.png
│   └── demo.mp4
├── semester/
│   ├── screen1.jpg
│   └── sprite1.png
└── downloads/
    └── city-of-hinnom-script.pdf
```

### 3. Update the data arrays
In `server/index.js`, match the `src` and `thumb` paths in the data arrays
to whatever filenames you used (e.g. `src: '/art/my-painting.jpg'`).

## Deploying to Railway

1. Push this repo to GitHub.
2. In Railway: **New Project → Deploy from GitHub repo**.
3. Railway auto-detects the `railway.toml` and runs build + start.
4. Set environment variable: `NODE_ENV=production`
5. **Custom domain**: In Railway project settings → Domains → add your domain.
   Then point your domain's DNS to Railway's provided CNAME.

### Recommended domain registrars
- **Namecheap** — affordable, straightforward DNS management
- **Porkbun** — great prices, clean UI
- **Cloudflare Registrar** — at-cost pricing, built-in CDN + DDoS protection (recommended)

After buying a domain, set a CNAME record:
```
CNAME  www   →  <your-railway-app>.up.railway.app
```
And an ALIAS/ANAME or redirect from the root domain to www.

## Environment Variables (Railway)

| Variable       | Value                        |
|---------------|------------------------------|
| `NODE_ENV`    | `production`                 |
| `PORT`        | Set automatically by Railway |
| `CLIENT_URL`  | `https://yourdomain.com`     |
