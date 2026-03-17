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
3. **Building Assets:**
	The build can be run from the themes directory, which will build assets in both themes. If desired, you can also run the scripts for individual themes by running the script from that theme's directory.
   - To watch for changes:
     ```bash
     npm run start
     ```
   - To create a production build:
     ```bash
     npm run build
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

Updates to the Capitola theme can be made from within this repo.

---

For theme-specific instructions, see the README in each theme folder.
