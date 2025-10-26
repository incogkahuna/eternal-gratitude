# 🧾 ThankYouCindy.com

A surreal, high-effort-looking web experience that gives the illusion of massive infrastructure behind a very small and poetic idea: endlessly thanking Cindy.

## 🚀 Local Development

### Option 1: Simple HTTP Server (Recommended for testing)

Since this is primarily a static site, you can test it with any simple HTTP server:

```bash
# Using Python 3
python -m http.server 3000

# Using Python 2
python -m SimpleHTTPServer 3000

# Using Node's http-server (install globally first: npm install -g http-server)
http-server -p 3000
```

Then open `http://localhost:3000` in your browser.

### Option 2: With Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run local dev server (mirrors Vercel deployment environment)
vercel dev
```

The site will be available at `http://localhost:3000`

## 📦 Deployment

### Deploy to Vercel

1. **Install Git** (if not already installed): Download from https://git-scm.com/
2. **Initialize repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ThankYouCindy.com"
   ```
3. **Create GitHub repository** and push:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/thankyoucindy-site.git
   git push -u origin main
   ```
4. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up/Login (can use GitHub account)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings and deploy

### Automatic Deployments

Once connected to Vercel:
- Push to `main` branch → automatic production deploy
- Push to feature branches → automatic preview deploy

### Manual Deploy
```bash
vercel --prod
```

## 🎨 Design System

**Colors:**
- Background: Black to deep gray
- Accents: Cyan (#00f3ff), Magenta (#ff00ff), Amber (#ffb700)

**Typography:**
- Body: IBM Plex Mono
- Headers: Space Grotesk

## 📁 Project Structure

```
/
├── index.html          # Infinite Thank-You Feed
├── counter.html        # Gratitude Counter Wall
├── send.html           # Gratitude Generator API
├── languages.html      # Multilingual Page
├── style.css           # Shared styles
├── script.js           # Shared JavaScript
├── pages/              # Page-specific assets
│   ├── feed.css
│   ├── feed.js
│   ├── counter.css
│   ├── counter.js
│   ├── send.css
│   ├── send.js
│   ├── languages.css
│   └── languages.js
└── api/
    └── storeThanks.js  # Backend endpoint (Vercel serverless)
```

## 🧠 Features

- **Infinite Scroll Feed:** Endless "thank you"s in different fonts/colors
- **Gratitude Counter:** Large odometer counting up forever
- **API Generator:** Fake JSON response terminal interface
- **Multilingual:** Web Speech API cycling through 50+ languages
- **Visual Polish:** Animated gradients, smooth transitions, glowing effects
- **Easter Egg:** Type "CINDY" anywhere to activate rainbow color-cycle mode! 🎨

## 🎮 Easter Eggs

- Type **CINDY** on any page to toggle psychedelic color-cycling mode
- The counter starts at a random billion+ number to look like it's been running forever
- Some thank-yous in the feed have rainbow gradient animations

## 🔧 Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- Web Speech API for multilingual audio
- Vercel for hosting + serverless functions
- Google Fonts (IBM Plex Mono, Space Grotesk)

---

Built with 💜 for Cindy
