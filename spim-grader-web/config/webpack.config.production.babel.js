import baseConfig, { paths, srcEntry } from './webpack.config.base.babel'

export default {
  ...baseConfig,
  entry: [srcEntry],
  output: {
    filename: 'bundle.[chunkhash].js',
    path: paths.dist // path.resolve(__dirname, '..', 'dist')
  }
}
