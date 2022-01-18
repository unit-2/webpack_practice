const path = require('path');

module.exports = {
	//エントリーポイント
	entry: './src/index.js',
	//出力先
	output: {
		//絶対パスを取得する　現在のフォルダの階層
		path: path.resolve(__dirname, './dist'),
		//ファイル名を変更する場合
		filename: 'main.js',
	},
	//モジュールというオプションを追加
	module: {
		//ルールという配列を追加
		rules: [
			{
				//配列を追加  バックスラッシュでドットをエスケープ　正規表現(//で囲まれた書き方をする）
				//.cssを検出する指示
				test: /\.css/,
				//配列を追加　.cssがあったらローダーを使いなさいという指示
				use: [
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
}
