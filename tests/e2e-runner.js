import { execSync } from 'child_process';
try {
  console.log('Running e2e tests...');
  execSync('npm run test:e2e', { stdio: 'inherit' });
} catch (e) {
  process.exit(1);
}
