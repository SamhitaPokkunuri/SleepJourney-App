const { execSync } = require('child_process');

execSync(`next start -p ${process.env.PORT || 3000}`, { stdio: 'inherit' });
