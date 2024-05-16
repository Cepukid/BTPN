module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      plugins: [
        [
          '@babel/plugin-transform-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: [
          {'@assets': './src/assets'},
          {'@bootstrap': './src/bootstrap'},
          {'@configs': './src/configs'},
          {'@components-cards': './src/components/cards'},
          {'@components-containers': './src/components/containers'},
          {'@components-generics': './src/components/generics'},
          {'@components-derivatives': './src/components/derivatives'},
          {'@components-modals': './src/components/modals'},
          {'@components-widgets': './src/components/widgets'},
          {'@dummy': ['./src/dummy/']},
          {'@hook': './src/hooks'},
          {'@metadata': './src/metadata'},
          {'@middleware': './src/middlewares'},
          {'@modules': './src/modules'},
          {'@navigation': './src/navigation'},
          {'@routes': './src/routes'},
          {'@stores': './src/stores'},
          {'@utils': './src/utils'},
          {'@wrapper': './src/wrapper'},
          {'@themes': './src/themes'},
        ],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.ios.js',
          '.android.js',
          'json',
          '.png',
          '.svg',
          '.jpeg',
          '.jpg',
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'], //removing consoles.log from app during release (production) versions
    },
  },
};
