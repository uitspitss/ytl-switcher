const path = require('path');
const withPlugins = require('next-compose-plugins');
const Dotenv = require('dotenv-webpack');

const nextConfig = {
  target: "serverless",
  webpack: (config, options) => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
