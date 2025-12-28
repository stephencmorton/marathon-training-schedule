# Installing
This project was started with CRA and was migrated to Vite.

The starter is built on top of Vite 7.x and prepared for writing libraries in TypeScript. It generates a package with support for ESM modules and IIFE.

## Available Scripts

In the project directory, you can run:
- `dev` - starts dev server
- `build` - generates the following bundles: ESM (`.js`) and IIFE (`.iife.js`). The name of bundle is automatically taken from `package.json` name property
- `test` - starts vitest and runs all tests


## To Do notes for development
- Fix up date routines and variables. And various 0- vs 1-based index code.
- Remove _m variables or at least rename them _d as they're dates not moments.
- Allow modular drop-in of races
- Allow arbitrary race dates.
- Remove crazy race schedule code with filename to variable to filename
- Filter training schedules based on whether race is a half or a full marathon.

**MORE**

- Ask AI about improvements
