const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

module.exports = (async () => {
  // Get the default configuration
  const defaultConfig = await getDefaultConfig(__dirname);

  // Destructure needed properties from the default configuration
  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  // Define the custom configuration
  const customConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };

  // Merge the default and custom configurations
  return mergeConfig(defaultConfig, customConfig);
})();