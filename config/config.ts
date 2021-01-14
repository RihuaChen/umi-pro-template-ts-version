/* eslint disabled */
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const { REACT_APP_ENV, GA_KEY } = process.env;

export default defineConfig({
  // base: '/',
  // publicPath: '/',
  hash: true,
  antd: {},
  analytics: GA_KEY ? { ga: GA_KEY } : false,
  dva: {
    hmr: true,
    immer: true,
  },
  locale: {
    // default en-US
    default: 'en-US',
    // default true, when it is true, will use `navigator.language` overwrite default
    // antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    localsConvention: 'camelCase',
    modules: {
      // @ts-ignore
      getLocalIdent: (context: { resourcePath: string }, _: string, localName: string) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        // return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
