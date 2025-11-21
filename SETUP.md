# Setup Guide for "Where Were We?"

This guide will walk you through setting up the app from scratch.

## Step 1: Install Dependencies

Make sure you have Node.js installed (version 16 or higher).

```bash
npm install
```

## Step 2: Get a Google Maps API Key

### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "Where Were We")
4. Click "Create"

### 2.2 Enable Required APIs

1. In your project, go to "APIs & Services" → "Library"
2. Search for and enable these three APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Street View Static API**

### 2.3 Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy your new API key

### 2.4 Secure Your API Key (Recommended)

1. Click on your API key to edit it
2. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add: `localhost:*` (for development)
   - Add: `yourusername.github.io/*` (for production)
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose only the three APIs listed above
4. Click "Save"

## Step 3: Add Your API Key to the Project

### 3.1 Update index.html

Open `index.html` and find this line:

```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geometry"></script>
```

Replace `YOUR_API_KEY` with your actual API key:

```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1234567890abcdefghijklmnop&libraries=places,geometry"></script>
```

### 3.2 Update StreetViewViewer.jsx

Open `src/components/StreetViewViewer.jsx` and find the static map URL (around line 72):

```javascript
src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=800x600&maptype=satellite&key=YOUR_API_KEY`}
```

Replace `YOUR_API_KEY` with your actual API key.

## Step 4: Customize Memory Data (Optional)

Edit `src/memoryData.json` to add your own shared memories:

```json
{
  "memories": [
    {
      "id": 1,
      "lat": 37.7749,
      "lng": -122.4194,
      "caption": "Our first date at the pier 🌉",
      "location": "San Francisco, CA"
    },
    {
      "id": 2,
      "lat": 48.8584,
      "lng": 2.2945,
      "caption": "That magical Paris evening 💕",
      "location": "Paris, France"
    }
  ]
}
```

**Tips for adding memories:**
- Use Google Maps to find exact coordinates
- Keep captions personal and fun
- Include emojis for personality
- Add a readable location name

## Step 5: Run Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Step 6: Test the App

1. **Test Memory Mode:**
   - Click "Memory Mode"
   - Select a memory
   - Wait for Street View to load
   - Drop a pin on the guess map
   - Submit and see your results!

2. **Test Guess My Spot Mode:**
   - Click "Guess My Spot"
   - Try different location inputs:
     - Google Maps URL
     - City name (e.g., "Tokyo, Japan")
     - Street address
   - Check that it geocodes correctly

3. **Test Room Codes:**
   - Click "Create Room & Get Code"
   - Copy the room code from the URL
   - Open in another browser/tab
   - Verify the room code persists

## Step 7: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

## Step 8: Deploy to GitHub Pages

### Option A: Using GitHub Actions (Recommended)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The workflow in `.github/workflows/deploy.yml` will auto-deploy on push

### Option B: Manual Deploy

1. Build the project: `npm run build`
2. Install gh-pages: `npm install -D gh-pages`
3. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Run: `npm run deploy`
5. Go to Settings → Pages → Set source to `gh-pages` branch

## Troubleshooting

### API Key Issues

**Error: "This page can't load Google Maps correctly"**
- Check that your API key is correct
- Verify all three APIs are enabled
- Check API key restrictions match your domain

### Street View Not Loading

**Black screen or "Street View not available"**
- This is normal for some locations
- The app will show a satellite fallback image
- Try a well-known city center for better results

### Build Errors

**"Module not found" errors**
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check that all files are in correct locations

### LocalStorage Issues

**Room codes not saving**
- Check browser localStorage is enabled
- Disable private/incognito mode
- Clear browser cache and try again

## Tips for Best Experience

1. **Use well-known locations** with good Street View coverage
2. **Test on mobile** - the app is fully responsive
3. **Customize memory captions** to make them personal
4. **Share the room code URL** with your partner (not just the code)
5. **Add more memories** in `memoryData.json` for longer gameplay

## Need Help?

- Check the main [README.md](README.md) for general info
- Google Maps API docs: https://developers.google.com/maps/documentation
- React + Vite docs: https://vitejs.dev/guide/

## Enjoy! 💕

Now you're ready to test your shared memories and explore the world together!


