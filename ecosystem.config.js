module.exports = {
  apps: [
    {
      name: "monitor-naborow",
      script: "index.js",
      cwd: __dirname,
      watch: false,
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
