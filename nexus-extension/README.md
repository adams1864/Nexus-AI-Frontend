# Nexus Extension - Upwork Job Scraper

A Chrome extension built with Vue 3 and TypeScript that automatically scrapes job information from Upwork job listings to streamline the application process.

## 🚀 Features

- **Automatic Job Detection**: Monitors Upwork job pages and automatically detects when job details are loaded
- **Real-time Scraping**: Extracts key job information including title, description, budget, posting date, and client location
- **Vue 3 Popup Interface**: Clean, modern popup interface for viewing scraped job data
- **Smart Page Detection**: Only activates on Upwork pages for optimal performance
- **TypeScript Support**: Fully typed codebase for better development experience

## 📋 What Gets Scraped

The extension automatically extracts the following job information:
- Job title
- Job description
- Budget/payment information
- Posted date
- Client location
- Job URL

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **Extension Framework**: CRXJS Vite Plugin
- **Manifest Version**: Chrome Extension Manifest V3

## 📦 Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexus-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

### Production Build

```bash
npm run build
```

The built extension will be available in the `dist` folder.

## 🎯 Usage

1. **Navigate to Upwork**: Go to any Upwork job listing page
2. **Open Extension**: Click the Nexus extension icon in your browser toolbar
3. **Scrape Job Data**: Click "Apply with Nexus" to extract job information
4. **View Results**: The scraped data will be displayed in the popup interface

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the extension for production

### Project Structure

```
nexus-extension/
├── src/
│   ├── content/
│   │   ��── content.ts          # Content script for job scraping
│   ├── popup/
│   │   ├── App.vue            # Main popup component
│   │   ├── index.html         # Popup HTML template
│   │   ├── main.ts            # Popup entry point
│   │   └── style.css          # Popup styles
│   ├── components/            # Shared Vue components
│   └── assets/               # Static assets
├── manifest.config.ts         # Extension manifest configuration
├── vite.config.ts            # Vite build configuration
└── package.json              # Project dependencies
```

### Key Components

#### Content Script (`src/content/content.ts`)
- Monitors Upwork pages for job detail panels
- Uses MutationObserver to detect dynamic content changes
- Extracts job information using CSS selectors
- Handles retries and error cases gracefully

#### Popup Interface (`src/popup/App.vue`)
- Vue 3 component with Composition API
- Detects if current tab is on Upwork
- Communicates with content script to trigger scraping
- Displays scraped job data in a clean interface

## 🔒 Permissions

The extension requires the following permissions:
- `scripting` - To inject content scripts
- `activeTab` - To access the current tab
- `https://www.upwork.com/*` - To run on Upwork pages

## 🚧 Future Enhancements

- Backend integration for storing scraped job data
- Automated application submission
- Job filtering and categorization
- Export functionality for scraped data
- Support for additional job platforms

## 🐛 Troubleshooting

### Extension Not Working
- Ensure you're on a Upwork job listing page
- Check that the extension is enabled in Chrome
- Refresh the page and try again

### No Data Scraped
- The job details panel might not be fully loaded
- Try waiting a moment and clicking "Apply with Nexus" again
- Check the browser console for any error messages

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For internal development guidelines, please refer to the team documentation.

---

**Note**: This extension is designed specifically for Upwork and requires an active Upwork session to function properly.