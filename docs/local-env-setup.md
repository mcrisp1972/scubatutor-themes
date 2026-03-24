# Local Environment Setup

## Installing Dependencies

   - Ensure you have Node.js and npm installed.
   - In your terminal, navigate to this directory (wp-content/themes/capitola)
   - Run:
     ```bash
     npm install
     ```

## WP Scripts

The following scripts are available:
   - To watch for changes in your blocks, css and js:
     ```bash
     npm run start
     ```
   - To create a production build:
     ```bash
     npm run build
     ```
   - To run a js lint check:
	 ```bash
	 npm run lint:js
	 ```
   - To run a js lint check and fix autofixable issues:
	 ```bash
	 npm run lint:js:fix
	 ```
   - To run a css lint check:
	 ```bash
	 npm run lint:css
	 ```
   - To run a css lint check and fix autofixable issues:
	 ```bash
	 npm run lint:css:fix
	 ```
   - To run a php lint check:
	 ```bash
	 npm run lint:php
	 ```
   - To run a php lint check and fix autofixable issues:
	 ```bash
	 npm run lint:php:fix
	 ```

## Git Workflow

1. **Branching:**
   - Create a new branch for each feature or bug fix.
     ```bash
     git checkout -b my-feature
     ```
2. **Commit messages:**
   - Use clear, descriptive commit messages.
   - Example:
     ```
     Fix: update block styles for scuba-tutor theme
     ```
3. **Syncing with main:**
   - Regularly pull changes from main:
     ```bash
     git pull origin main
     ```
