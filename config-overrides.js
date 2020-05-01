const { override, fixBabelImports, addLessLoader,addWebpackAlias } = require('customize-cra');
// 从nodejs内置模块path中引入resolve方法
const { resolve } = require("path");

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': 'purple' },
  }),
  addWebpackAlias({
		"@": resolve(__dirname, "src")
	})
);