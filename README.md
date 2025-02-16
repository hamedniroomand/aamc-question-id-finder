# AAMC Question ID Finder

A lightweight Chrome extension built with Svelte, TypeScript, and Vite that helps identify question IDs on the AAMC Official Prep website. The extension creates a draggable window overlay that displays the question ID for any question on mcatofficialprep.org.

## Features

- Displays question IDs in a draggable overlay window
- Works exclusively on mcatofficialprep.org
- Minimal performance impact
- Clean UI integration

## Tech Stack

- Svelte
- TypeScript
- Vite
- Chrome Extensions API

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Build the extension:
   ```bash
   yarn build
   ```

## Installing the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `dist` directory from your build

## Development
During development, you can run Vite’s dev server to test changes:

```bash
yarn dev
```
Note: For content scripts, changes may require a manual reload of the extension in Chrome and refreshing the target webpage.

## Usage

1. Navigate to [AAMC Official Prep](https://www.mcatofficialprep.org/app/)
2. The question ID finder will automatically appear as a draggable window
3. Move the window around as needed
4. Close the window using the built-in close button

## Permissions

- Only requires access to mcatofficialprep.org
- No additional permissions needed
