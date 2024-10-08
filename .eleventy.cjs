// Essential module imports for the configuration
const path = require('path')
const htmlmin = require('html-minifier')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')
const { VitePWA } = require('vite-plugin-pwa')
const { PassThrough } = require('stream')

module.exports = function (eleventyConfig) {
  // Configuring the Eleventy server to run on port 3000
  eleventyConfig.setServerOptions({
    port: 3000,
    showAllHosts: true,
  })

  // Integrate Vite with Eleventy using the Eleventy Vite Plugin
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    // Specify the directory where Vite-specific temporary files will be stores
    tempFolderName: '.11ty-vite',
    // Options tailores for the Vite build tool
    viteOptions: {
      // Directory to server static assets from
      publicDir: 'public',
      // Set the root directory for Vite
      root: 'src',
      // List of Vite plugins to use
      plugins: [
        // PWA (Progressive Web App)
        VitePWA({
          injectRegister: 'script',
          registerType: 'autoUpdate',
          includeAssets: [],
          workbox: {
            globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff,woff2}'],
          }
        })
      ],

      // Module resolve options
      resolve: {
        // Create alias for directories, simplifying import paths
        alias: {
          '@styles': path.resolve('.', 'src', 'styles'),
          '@app': path.resolve('.', 'src', 'app'),
          '@utils': path.resolve('.', 'src', 'app', 'utils'),
          '@components': path.resolve('.', 'src', 'app', 'components'),
          '@shaders': path.resolve('.', 'src', 'app', 'shaders'),
          '@classes': path.resolve('.', 'src', 'app', 'classes'),
          '@animations': path.resolve('.', 'src', 'app', 'animations'),
          '@pages': path.resolve('.', 'src', 'app', 'pages'),
          '@canvas': path.resolve('.', 'src', 'app', 'components', 'Canvas'),
        }
      }
    }
  })

  // Specify directories and files that should bypass Eleventy's processing and be copied 'as-is'
  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy('src/app');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.setServerPassthroughCopyBehavior('copy');

  // Minify HTML files before writing to the output directory
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if(outputPath && outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }
    return content
  })

  // Define input and output directories for Evelenty, set passthrough copy, and set template engine to Pug
  return {
    dir: {
      input: 'src/views',
      output: '_site',
      includes: '_includes',
      data: '_data' // In case we want to define a CMS like prismic
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'pug'
  }
}
