const path = require('path');
const withPlugins = require('next-compose-plugins');
const Dotenv = require('dotenv-webpack');
const withOffline = require('next-offline')({
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [{
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'https-calls',
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }]
  }
})

const nextConfig = {
  target: "serverless",
  transformManifest: (manifest) => ['/'].concat(manifest),
  generateInDevMode: false,
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

module.exports = withPlugins([withOffline], nextConfig);
