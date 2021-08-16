const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = config => {
  return {
    ...config,
    plugins: [
      ...config.plugins.filter(plugin => plugin.constructor.name !== 'CopyPlugin'),
      new CopyPlugin({
        patterns: [
          ...(config.plugins.find(plugin => plugin.constructor.name === 'CopyPlugin')?.patterns ?? []),
          { from: path.resolve(__dirname, 'libs/prisma/schema.prisma') },
        ],
      }),
    ],
  };
};
