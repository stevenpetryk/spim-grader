import baseConfig, { paths, srcEntry } from "./webpack.config.base.babel"
import { NamedModulesPlugin } from "webpack"

export default {
  ...baseConfig,
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    require.resolve("react-dev-utils/webpackHotDevClient"),
    require.resolve("react-error-overlay"),
    srcEntry,
  ],
  output: {
    filename: "bundle.[hash].js",
    path: paths.dist,
  },
  plugins: [...baseConfig.plugins, new NamedModulesPlugin()],
}
