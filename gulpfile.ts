const { watch, src, dest, series } = require('gulp')
const rename = require("gulp-rename")
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync');
const babel = require('gulp-babel');


const buildFn = () => {
  return src('./src/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(dest('./lib'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./lib'))
}

const serveFn = () => {

  browserSync({
    files: '*/**',
    browser: '',
    server: {
      baseDir: './'
    },
    startPath: 'demo/index.html',
    open: 'external'
  });


  watch(['./src/**', './demo/**'], (file) => {
    buildFn()
  })
}

exports.build = buildFn
exports.serve = serveFn