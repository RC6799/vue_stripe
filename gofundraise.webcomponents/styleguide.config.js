const loaders = require('vue-webpack-loaders');
const glob = require('glob').sync;
const basename = require('path').basename;
const join = require('path').join;

function getDocSections() {
  b = p => basename(p, '.md');
  return glob('docs/*.md')
  .filter(path => b(path)!=='Introduction')
  .map(path => ({
    name: b(path),
    content: path
  }));
}

/**
 * More info about this styleguide configuration in
 * vue-styleguidist/vue-styleguidist github repository
 */
module.exports = {
  sections: [
    {
      /* The component itself */
      name: 'gf-payments documentation',
      content: 'docs/Introduction.md',
      components: 'src/**/*.vue',
      // ignore: ['src/ignored-component/ignored-component.vue'],
      sections: getDocSections()
    },
  ],
  webpackConfig: {
    module: {
			loaders,
		},
    devtool: 'inline-source-map'
  },
  serverPort: 6062,
  require: [
    join(__dirname, 'styleguide.global.js'),
  ],
  template: {
    head: {
      scripts: [
      ],
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css'
        }
      ]
    }
  }
};
