const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = {
  transformer: {
    babelTransformerPath: require.resolve("nativewind/babel"),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
