module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', path.resolve(__dirname, '.'));  // 确保这里能准确指向包含 uni_modules 的根目录
  }
}