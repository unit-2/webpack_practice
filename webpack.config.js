const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//HTMLファイルも自動で出力する
const HtmlWebpackPlugin = require('html-webpack-plugin');
//不要なファイル削除
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	//エントリーポイント
	entry: './src/javascript/main.js',
	//出力先
	output: {
		//絶対パスを取得する　現在のフォルダの階層
		path: path.resolve(__dirname, './dist'),
		//ファイル名を変更する場合
		filename: 'javascripts/main.js', // 変更
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
			{
				//画像を読み込む
				test: /\.(png|jpg)/,
				use: [
					{
						//loader: 'url-loader',画像の読み込みから変更
						loader: 'file-loader',
						options: {
							esModule: false,
							//オリジナルファイルのファイル名 オリジナルファイルの拡張子
							name: 'images/[name].[ext]',
						},
					},
				]
			},
		],
	},
	  // プラグイン追加
  plugins: [
		new MiniCssExtractPlugin({
			filename: './stylesheets/main.css',
		}),
		new HtmlWebpackPlugin({
			template: './src/templates/index.html',
		}),
		new CleanWebpackPlugin(),
  ],
}
