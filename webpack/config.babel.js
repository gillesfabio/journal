import path from 'path'

import ManifestPlugin from 'webpack-manifest-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const ROOT = process.cwd()

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProduction = mode === 'production'

const hashes = {
  hash: isProduction ? '[hash:10]' : 'dev',
  chunkhash: isProduction ? '[chunkhash:10]' : 'dev'
}

const plugins = [
  CopyWebpackPlugin([
    {
      from: './static/js/sw.js',
      to: `${ROOT}/public/[name]-${hashes.hash}.[ext]`
    },
    {
      from: './static/manifest.json',
      to: `${ROOT}/public/[name]-${hashes.hash}.[ext]`
    }
  ]),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
    map(file) {
      // https://github.com/webpack-contrib/copy-webpack-plugin/issues/104
      // We need to do this until copy-webpack-plugin supports webpack hashing
      if (isProduction) {
        file.name =  file.name.replace(/\-[a-f0-9]{10}\./, '.')
      } else {
        file.name =  file.name.replace(/\-dev\./, '.')
      }

      return file
    }
  })
]

module.exports = {
  context: path.resolve(ROOT, 'src'),
  mode: mode,
  entry: {
    admin: './static/js/admin.js',
    journal: './static/js/journal.js',
  },
  output: {
    filename: `js/[name]-${hashes.chunkhash}.js`,
    path: path.resolve(ROOT, 'public'),
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}