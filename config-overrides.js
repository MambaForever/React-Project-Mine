const {addWebpackAlias} = require('customize-cra');
const { resolve } = require("path");
module.exports = override(
	addWebpackAlias({
		"@": resolve(__dirname, "src")
	})
);