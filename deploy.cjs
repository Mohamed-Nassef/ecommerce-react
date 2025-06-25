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
