const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//HTMLファイルも自動で出力する
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//エントリーポイント
	entry: './src/index.js',
	//出力先
	output: {
		//絶対パスを取得する　現在のフォルダの階層
		path: path.resolve(__dirname, './dist'),
		//ファイル名を変更する場合
		//filename: 'main.js',
	},
	//モジュールというオプションを追加
	module: {
		//ルールという配列を追加
		rules: [
			{
				//配列を追加  バックスラッシュでドットをエスケープ正規表現(//で囲まれた書き方をする）
				//.cssを検出する指示
				test: /\.css/,
				//配列を追加.cssがあったらローダーを使いなさいという指示
				use: [
					//注意、loaderは下から適応される
					{
					//読み込んだモジュールを下記で処理 cssをスタイルで読み込む
						//loader: 'style-loader',
						// loader: 'style-loader', 削除
            loader: MiniCssExtractPlugin.loader, // ローダーを別のを追加
					},
					//スタイルを適応
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
	  // プラグイン追加
  plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
  ],
}
