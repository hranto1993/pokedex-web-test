const path = require('path');

const CracoAlias = require('craco-alias');
const CracoSassLoaderPlugin = require('sass-loader');

module.exports = {
  eslint: {
    mode: 'file',
  },
  style: {
    modules: {
      localIdentName: '[local]___[hash:base64:5]',
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: '.',
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
    {
      plugin: CracoSassLoaderPlugin,
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        enforce: 'pre',
        test: /.scss$/,
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, 'src/styles/resources.scss'),
        },
      });

      return webpackConfig;
    },
  },
};
