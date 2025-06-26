const { execSync } = require('child_process');

const msg = process.argv[2] || 'update';

try {
    console.log('🟢 Adding files...');
    execSync('git add .', { stdio: 'inherit' });

    console.log(`📦 Committing with message: "${msg}"`);
    execSync(`git commit -m "${msg}"`, { stdio: 'inherit' });

    console.log('⬆️ Pushing to GitHub...');
    execSync('git push', { stdio: 'inherit' });

    console.log('🚀 Deploying to GitHub Pages...');
    execSync('npm run deploy', { stdio: 'inherit' });

    console.log('✅ Done!');
} catch (error) {
    console.error('❌ Something went wrong:', error.message);
}
// npm run commit-deploy -- "update commit message here"
// This script automates the process of committing changes, pushing to GitHub, and deploying to GitHub Pages.
// It uses Node.js to execute shell commands and handle errors gracefully.
// You can run this script with a custom commit message by passing it as an argument, e.g.:
// node deploy.cjs "Your commit message here"
// If no message is provided, it defaults to "update".
// Make sure to have the necessary permissions and configurations set up for GitHub Pages deployment.

