module.exports = {
  apps: [
    {
      name: 'reswara-website',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/your/app',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};