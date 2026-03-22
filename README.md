# Main Themes Repository

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

### Deployments
This site is hosted on Hostinger. We use a combination of git actions and Webhooks to deploy updates to the server.

Any merge and push origin to the 'main' branch will deploy immediately to the server. Hostinger does not support pushing code to a staging environment, so we do not follow the trunk/production pattern.

Compiled assets in the build directory are not committed to the main branch. Instead, on deployment, we build each theme's assets and deploy the compliled assets using separate webhooks. This prevents the built assets from having to be included in the main branch, reducing commit change logs.

When you push an update to the main remote branch, the following happens:
- A Hostinger wekkhook detects a change to the main branch, and deploys the main branch to the server.
- Git actions runs, performing the following actions:
	1. Change dir to capitola.
	2. Checkout the parent-build branch.
	3. Install NPM dependencies.
	4. Run build
	5. Commit and push the built directory (parent-build branch contains only the build directory).
	6. A Hostinger wekkhook detects a change to the parent-build branch, and deploys the parent-build branch to the parent theme's build directory on the server.
	7. Change dir to the chiuld theme's.
	8. Checkout the child-build branch.
	9. Install NPM dependencies.
	10. Run build
	11. Commit and push the built directory (child-build branch contains only the build directory).
	12. A Hostinger wekkhook detects a change to the child-build branch, and deploys the child-build branch to the child theme's build directory on the server.

	After git actions completes, be sure to purge the site's cache.
---

For theme-specific documentation, see the main README.md and docs directory in each theme folder.
