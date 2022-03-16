module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // This exists to keep the package size below the lambda 50mb zipped limit
    if (isServer) {
      if (!dev) {
        config.externals = ['chrome-aws-lambda'];
      }
    }

    return config;
  },
};
