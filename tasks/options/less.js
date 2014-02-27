module.exports = {
  compile: {
    files: [{
      expand: true,
      cwd: 'vendor/bootstrap3-less-js/less',
      src: ['bootstrap.less'],
      dest: 'tmp/result/assets/',
      ext: '.css'
    }]
  }
};
//	{
//     expand: true,
//      cwd: 'app/styles',
//      src: ['**/*.less', '!**/_*.less'],
//      dest: 'tmp/result/assets/',
//     ext: '.css'
//   },