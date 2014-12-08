var gulp = require('gulp'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  ngAnnotate = require('gulp-ng-annotate');

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    livereload: true,
    root: './dist'
  })
});

gulp.task('concat', function() {
  gulp.src([
    'src/js/*.js',
    'src/js/**/*.js'
  ])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

gulp.task('lib', function() {
  gulp.src([
    'lib/**/*.min.js',
    'lib/**/**/*.min.js'
  ])
    .pipe(sourcemaps.init())
      .pipe(concat('lib.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function() {
  gulp.src(['src/*.html', 
    'src/**/*.html',
    'src/*.json'
    ])
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})


gulp.task('watch', function() {
  gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['concat']);
  gulp.watch(['src/*.html', 'src/**/*.html'], ['html']);
})

gulp.task('default', ['lib', 'concat', 'html', 'connect', 'watch']);

