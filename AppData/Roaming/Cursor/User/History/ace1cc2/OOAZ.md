# 🧾 ThankYouCindy.com

A surreal, high-effort-looking web experience that gives the illusion of massive infrastructure behind a very small and poetic idea: endlessly thanking Cindy.

## 🚀 Local Development

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Run local dev server (mirrors Vercel deployment environment)
vercel dev
```

The site will be available at `http://localhost:3000`

## 📦 Deployment

This site is configured for automatic deployment via Vercel:

1. Push to `main` branch → automatic production deploy
2. Push to feature branches → automatic preview deploy

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
└── api/
    └── storeThanks.js  # Backend endpoint (optional)
```

## 🧠 Features

- **Infinite Scroll Feed:** Endless "thank you"s in different fonts/colors
- **Gratitude Counter:** Large odometer counting up forever
- **API Generator:** Fake JSON response terminal interface
- **Multilingual:** Web Speech API cycling through languages
- **Visual Polish:** Animated gradients, smooth transitions, glowing effects

---

Built with 💜 for Cindy

