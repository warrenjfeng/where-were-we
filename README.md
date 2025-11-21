# Where Were We? 💕

A lightweight, couples-oriented mini-GeoGuessr experience that runs 100% on GitHub Pages. Test your memory of shared adventures or guess new spots together!

![Where Were We Banner](https://img.shields.io/badge/Made%20with-Love-ff69b4)

## 🎯 Features

- **Two Game Modes:**
  - **Memory Mode**: Relive preloaded shared memories with custom captions
  - **Guess My Spot Mode**: Take turns inputting locations for your partner to guess

- **Location Input:** Accepts Google Maps URLs, city names, or street addresses
- **Street View Integration:** Immersive panoramic views (with static map fallback)
- **Interactive Guessing:** Drop a pin on the map to make your guess
- **Distance Scoring:** See how close you were with fun, personalized messages
- **Room Codes:** Share a room code to play together
- **LocalStorage Persistence:** Your progress is saved automatically

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- A Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Street View Static API
  - Geocoding API

### Installation

1. **Clone or download this repository:**
   ```bash
   git clone <your-repo-url>
   cd where-were-we
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your Google Maps API key:**
   
   Open `index.html` and replace `YOUR_API_KEY` with your actual Google Maps API key:
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places,geometry"></script>
   ```
   
   Also update the API key in `src/components/StreetViewViewer.jsx` (line with staticmap URL).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📦 Building for Production

To build the app for GitHub Pages:

```bash
npm run build
```

The production files will be in the `dist/` folder.

## 🌐 Deploy to GitHub Pages

### Option 1: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to a `gh-pages` branch:
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

3. Go to your repository settings → Pages → Set source to `gh-pages` branch

### Option 2: Automated with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🎨 Customization

### Adding Your Own Memories

Edit `src/memoryData.json` to add your own shared locations:

```json
{
  "memories": [
    {
      "id": 1,
      "lat": 37.7749,
      "lng": -122.4194,
      "caption": "That sunset at the Golden Gate 🌅",
      "location": "San Francisco, CA"
    }
  ]
}
```

### Changing Colors

The app uses a soft, romantic color palette. To customize:

- Main colors are defined in `src/index.css` and component CSS files
- Primary pink gradient: `#ffb6c1` to `#ff69b4`
- Background gradient: `#ffeef8` to `#e6f2ff`

## 🗂️ Project Structure

```
/src
  /components
    StreetViewViewer.jsx    # Street View panorama display
    GuessMap.jsx            # Interactive guessing map
    RoundSummary.jsx        # Results and scoring display
    MemoryModePicker.jsx    # Memory selection interface
    LocationInput.jsx       # Location input form
  /utils
    parseLocationInput.js   # Parse various location formats
    distance.js             # Distance calculation and scoring
  memoryData.json          # Preloaded memory locations
  App.jsx                  # Main application logic
  main.jsx                 # React entry point
  index.css               # Global styles
```

## 🔑 Getting a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable these APIs:
   - Maps JavaScript API
   - Street View Static API
   - Geocoding API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Restrict your key (recommended):
   - HTTP referrers: Add your domain (e.g., `yourusername.github.io/*`)
   - API restrictions: Only allow the three APIs above

## 💡 Tips

- **For best results:** Use locations with Street View coverage
- **Mobile-friendly:** Works great on phones and tablets
- **Share room codes:** Send your partner the URL with the room code to play together
- **Memory captions:** Make them personal and funny for the best experience!

## 🐛 Troubleshooting

**Maps not loading?**
- Check that your API key is correctly added in `index.html`
- Ensure all required APIs are enabled in Google Cloud Console
- Check the browser console for error messages

**Street View not available?**
- The app automatically falls back to satellite view
- Some locations don't have Street View coverage

**Room codes not persisting?**
- Make sure localStorage is enabled in your browser
- Check that you're not in private/incognito mode

## 📝 License

This project is open source and available under the MIT License.

## 💖 Made With Love

Created for couples who love exploring together. Share your adventures, test your memory, and have fun!

---

**Note:** This is a client-side application with no backend. All data is stored locally in your browser.


