# Skool Blur

> Chrome extension that blurs member names, profile photos, and @mentions on Skool.com for privacy-safe screen recordings.

![Status: Functional](https://img.shields.io/badge/status-functional-brightgreen)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Overview

Skool Blur is a Chrome extension that applies a configurable Gaussian blur to member-identifying elements on [Skool.com](https://skool.com) -- including avatars, usernames, profile images, and @mention links. It is designed for content creators, community managers, and educators who need to record or screenshot their Skool communities without exposing member identities.

## Features

- **Avatar Blurring** -- Blurs all avatar wrappers across Skool's various component styles
- **Username Blurring** -- Hides displayed member names in posts, comments, and sidebars
- **Profile Image Blurring** -- Applies blur to profile images within avatar containers
- **@Mention Link Blurring** -- Detects and blurs all `/@username` links in post content
- **Adjustable Blur Intensity** -- Slider control (0-20px) to fine-tune the blur amount
- **Toggle On/Off** -- One-click button to enable or disable blurring without uninstalling
- **Smooth Transitions** -- Blur applies with a 0.3s ease transition for a polished look
- **Dynamic Content Support** -- MutationObserver watches for newly loaded content (infinite scroll, comments) and applies blur in real time
- **Persistent Settings** -- Blur level and enabled state saved via `chrome.storage.sync` across sessions
- **Minimal Permissions** -- Only requests `storage`, `tabs`, and `scripting` permissions; scoped to `*.skool.com`

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/izzydoesizzy/skool-blur.git
   ```

2. Open Chrome and navigate to `chrome://extensions`

3. Enable **Developer Mode** (toggle in the top-right corner)

4. Click **Load unpacked** and select the cloned `skool-blur` folder

5. The extension icon will appear in your Chrome toolbar

### How to Use

1. Navigate to any page on [skool.com](https://skool.com)
2. Click the **Skool Blur** extension icon in the toolbar
3. Use the **Blur Level** slider to adjust intensity (0-20px, default 10px)
4. Click **Toggle Blur** to enable or disable blurring
5. Start your screen recording or take screenshots -- member identities are hidden
6. Blurring persists as you navigate between pages and load new content

## Project Structure

```
skool-blur/
├── manifest.json     # Chrome Extension Manifest V3 configuration
├── content.js        # Content script -- blur logic, selectors, MutationObserver
├── popup.html        # Extension popup UI (slider + toggle button)
├── popup.js          # Popup logic -- reads/writes chrome.storage.sync
├── icon.png          # Extension icon (default)
├── icon16.png        # 16x16 toolbar icon
├── icon48.png        # 48x48 icon
└── icon128.png       # 128x128 Chrome Web Store icon
```

## How It Works

The extension injects `content.js` into all Skool pages at `document_start`. It queries the DOM for avatar wrappers, username text elements, profile images, and `/@` mention links, then applies a CSS `filter: blur()` with smooth transitions. A `MutationObserver` watches the entire document for dynamically added nodes (from infinite scroll, modal opens, etc.) and re-applies blur to any new matching elements. Settings are synced via `chrome.storage.sync` so they persist across browser sessions.

## Tags

`chrome-extension` `social-media`

## Created

September 2025

## Status

Functional

## Author

[Izzy Piyale-Sheard](https://github.com/izzydoesizzy)
