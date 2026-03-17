# Main Themes Repository

## Local Environment Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. **Install dependencies:**
   - Ensure you have Node.js and npm installed.
   - From the main repo directory (wp-content/themes/), Run:
     ```bash
     npm install
     ```
   - This will install dependencies for all both themes using npm workspaces.

## Scripts
The following scripts can be executed from the themes directory to run scripts on both the parent and child theme simultateously:
   - To watch for changes in both themes:
     ```bash
     npm run start
     ```
   - To create a production build in both themes:
     ```bash
     npm run build
     ```
   - To run a js lint check in both themes:
	 ```bash
	 npm run lint:js
	 ```
   - To run a js lint check and fix auto-fixable issues in both themes:
	 ```bash
	 npm run lint:js: fix
	 ```
   - To run a css lint check in both themes:
	 ```bash
	 npm run lint:css
	 ```
   - To run a css lint check and fix auto-fixable issues in both themes:
	 ```bash
	 npm run lint:css: fix
	 ```

## Git Workflow

1. **Branching:**
   - Create a new branch for each feature or bugfix:
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

## Parent Theme (capitola) Syncs
The Capitola theme lives as it's own repository. It's currently setup as a subtree in the main repo. This ensures updates to the Capitola theme can be easily updated across different websites.

Updates you make to the Capitola theme will automatically be added to this repo's copy of the theme after merging, but will not affect other sites using the Capitola theme.

### Pulling the latest version of Capitola
Before making any change to the Capitola theme, be sure you have the latest version. This will help prevent merge conflicts.

From the themes directory:

```bash
git subtree pull --prefix capitola git@github.com:mcrisp1972/capitola.git main --squash
```

If you get a commit message form, just type ```:qa```.

This must be run before any changes are made to the theme from this repo, otherwise you will get an error.

### Pushing your updates to Capitola to the capitola repository
Changes to the Capitola theme will eventually be merged into other sites, so it's important you only make necessary updates. Examples of proper updates include:
- Bug fixes
- New non-breaking features

To push updates to the Capitola theme for others to pull, from the themes directory:

```bash
git subtree push --prefix capitola git@github.com:mcrisp1972/capitola.git main
```
Reminder, these changes won't deploy to other sites until the parent theme is pulled and merged into their individual repos.

---

For theme-specific instructions, see the README in each theme folder.
