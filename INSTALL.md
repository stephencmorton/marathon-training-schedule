# Installing
This project was started with CRA and was migrated to Vite.

The starter is built on top of Vite 7.x and prepared for writing libraries in TypeScript. It generates a package with support for ESM modules and IIFE.

## Adding Races
- Races can be added to the src/public/races.json file before building, but the races.json file is separate in the built version, so it can be added after the fact to update races every year without having to rebuild the application.

## Available Scripts

In the project directory, you can run:
- `dev` - starts dev server
- `build` - generates the following bundles: ESM (`.js`) and IIFE (`.iife.js`). The name of bundle is automatically taken from `package.json` name property
- `test` - starts vitest and runs all tests


## To Do notes for development
- Allow arbitrary race dates.
- Filter training schedules based on whether race is a half or a full marathon.

**MORE**

- Ask AI about improvements
