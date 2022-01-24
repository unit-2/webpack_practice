//const path = require('path'); 『output: 』には絶対パスが必要なため、こちらの記述が必要となる
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
				//JSに関する設定
				//babelを使ってES6をトランスパイルする
				test: /\.js/,
				//node_modulesの中にあるファイルは対象外にする
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
							presets: [
								//optionの中にさらにoptionを配列で追加 トランスパイルするかブラウザを指定する
								['@babel/preset-env', { "targets": "> 0.25%, not dead" }],
							]
            },
          },
        ],
      },
			{
				//配列を追加  バックスラッシュでドットをエスケープ正規表現(//で囲まれた書き方をする）
				//.css .scss .sassを検出する指示
				test: /\.(css|scss|sass)$/,
				//配列を追加.cssがあったらローダーを使いなさいという指示
				use: [
					//注意、loaderは下から適応される
					{
					//読み込んだモジュールを下記で処理 cssをスタイルで読み込む
						//CSSを適用
						//loader: 'style-loader',
						//style-loaderの代わりにMiniCssExtractPlugin.loaderが役割を果たす
            loader: MiniCssExtractPlugin.loader,
					},
					//スタイルを適応
					//読み込んだCSS
					{
						loader: 'css-loader',
						options: {
							//scssのソースマップ(※ソースマップを出力すると重くなるので開発のとき以外はfalseにしておくとよい
							//sourceMap: true, //開発のときのみtrue
							// オプションでCSS内のurl()メソッドの取り込みを禁止する
							url: false,
						}
					},
					// PostCSSのための設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              // sourceMap: true,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  ["autoprefixer", { grid: true }],
                ],
              },
            },
					},
					// Sassをバンドルするための機能
					{
						loader: 'sass-loader',
						// options: {
            //   // ソースマップの利用有無
            //   sourceMap: true,
            // },
          },
				],
			},
			{
				//画像を読み込む
				test: /\.(png|jpg)/,
				// 追加
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
				// use: [
				// 	{
				// 		//loader: 'url-loader',画像の読み込みから変更
				// 		loader: 'file-loader',
				// 		options: {
				// 			esModule: false,
				// 			//オリジナルファイルのファイル名 オリジナルファイルの拡張子
				// 			name: 'images/[name].[ext]',
				// 		},
				// 	},
				// ],
			},
			{
				test: /\.pug/,
				use: [
					{
						loader: 'html-loader'
					},
					{
						loader: 'pug-html-loader',
						options: {
							pretty: true,
						},
					},
				],
			}
		],
	},
	// プラグイン追加
	//注意: 並列関係,「plugin:」ではなくplugins:
  plugins: [
		new MiniCssExtractPlugin({
			filename: './stylesheets/main.css',
		}),
		new HtmlWebpackPlugin({
			template: './src/templates/index.pug',
			filename: 'index.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/templates/access.pug',
			filename: 'access.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/templates/members/taro.pug',
			filename: 'members/taro.html',
		}),
		new CleanWebpackPlugin(),
  ],
}
