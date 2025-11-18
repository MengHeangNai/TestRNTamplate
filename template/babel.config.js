module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['react-native-worklets/plugin'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@styles': './app/_styles',
          '@customs': './customs',
          '@environments': './environments',
          '@images': './assets/images',
          '@boot': './boot',
        },
      },
    ],
  ],
};
