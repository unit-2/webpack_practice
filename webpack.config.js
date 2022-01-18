const path = require('path');

module.exports = {
	//エントリーポイント
	entry: './src/index.js',
	//出力先
	output: {
		//絶対パスを取得する　現在のフォルダの階層
		path: path.resolve(__dirname, './dist'),
	}
}
