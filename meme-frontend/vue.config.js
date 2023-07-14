const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "^/(admin|api|static|blocklist)": {
        target: "http://127.0.0.1:8000"
      }
    }
  },
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Memes";
            return args;
        })
    }
}
)