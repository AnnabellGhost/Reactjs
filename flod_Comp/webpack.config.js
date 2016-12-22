var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry: './project/blogComp.js',
	output: {
		path: __dirname, // 输出文件的保存路径
		filename: 'bundle.js' // 输出文件的名称
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		},
		{
      test: /\.css$/,
      loader: "style-loader!css-loader?modules",

    },
   {
　　　　test: /\.(png|jpg)$/,
　　　　loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
　　},
		{
			test:/\.(svg|ttf)\??.*$/,
			loader:'url-loader?name=fonts/limit=10000&[name].[md5:hash:hex:7].[ext]',
		},
		{
			test: /\.(eot|woff)\??.*$/, 
			loader: "file-loader?name=project/fonts/[hash:8].[name].[ext]" 
		},

	 ]
		
	},
	resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
};