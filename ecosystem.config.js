module.exports = {
  apps: [
    {
      name: 'chatgpt-ui',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};