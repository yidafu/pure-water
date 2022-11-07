/**
 * @see https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts
*/

const path = require('path');

const vue = require('@vitejs/plugin-vue');
const AutoImport = require('unplugin-auto-import/vite');
const IconsResolver = require('unplugin-icons/resolver');
const Icons = require('unplugin-icons/vite');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const Components = require('unplugin-vue-components/vite');
const { defineConfig } = require('vite');
const { createSvgIconsPlugin } = require('vite-plugin-svg-icons');
const svgLoader = require('vite-svg-loader');

module.exports = (ctx) => {
  const pathSrc = path.join(ctx.paths.projectRoot, 'src');

  return {
    viteConfig: defineConfig({

      resolve: {
        alias: {
          '@': pathSrc,
        },
      },

      plugins: [
        vue(),
        AutoImport({
          imports: ['vue'],

          resolvers: [
            ElementPlusResolver(),
            IconsResolver({
              prefix: 'Icon',
            }),
          ],

          dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        }),
        Components({
          resolvers: [
            IconsResolver({
              enabledCollections: ['ep'],
            }),
            ElementPlusResolver(),
          ],

          dts: path.resolve(pathSrc, 'components.d.ts'),
        }),

        Icons({
          autoInstall: true,
        }),

        svgLoader(),

        createSvgIconsPlugin({
        // Specify the icon folder to be cached
          iconDirs: [path.resolve(pathSrc, '/icons')],
          // Specify symbolId format
          symbolId: 'icon-[dir]-[name]',

          /**
         * custom insert position
         * @default: body-last
         */
          inject: 'body-first',

          /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
          customDomId: '__svg__icons__dom__',
        }),
      ],
      server: {
        port: 8201,
      },
    }),
    plugins: {
      lint: {
        presetEslint: 'vue',
        eslint: {
          entry: ['src/**/*.ts', 'src/**/*.vue'],
        },
        stylelint: {
          entry: ['src/**/*.css', 'src/**/*.scss'],
        },
        presetCommitlint: 'recommended',
      },
    },
  };
};
