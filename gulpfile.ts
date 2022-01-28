const { watch, src, dest, series } = require('gulp')
const ts = require('gulp-typescript')
const rename = require("gulp-rename")
const uglify = require('gulp-uglify')
const gls = require('gulp-live-server');


const buildFn = () => {
  return src('./src/index.ts')
    .pipe(ts())
    .pipe(dest('./lib'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./lib'))
}

const serveFn = () => {
  const server = gls.static(['demo'])
  server.start()

  watch(['./src/**', './demo/**'], (file: any) => {
    buildFn()

    server.notify.apply(server, [file])
  })
}

exports.build = buildFn
exports.serve = serveFn