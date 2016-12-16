var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry: './mailReact/app.js',
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
        	loader: "style-loader!css-loader?modules"
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