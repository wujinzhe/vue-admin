module.exports = [
  {
    name: 'layout',
    ...require('./webpack.layout.conf')
  },
  {
    name: 'library',
    ...require('./webpack.library.conf')
  }
]
