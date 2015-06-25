// http://jslog.com/2014/10/02/react-with-webpack-part-1/

module.exports = {
  context: __dirname + '/src',
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
