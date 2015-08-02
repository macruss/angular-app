var gulp = require('gulp'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  ngAnnotate = require('gulp-ng-annotate'),
  htmlreplace = require('gulp-html-replace'),

  paths = {
    app: ['public/src/js/*.js', 'public/src/js/**/*.js'],
    lib: ['public/src/bower_components/**/*.min.js', 'public/src/bower_components/**/*.min.js' ],
    html: ['public/src/*.html', 'public/src/**/*.html', 'public/src/*.json' ]
  };

gulp.task('connectDist', function() {
  connect.server({
    port: 1337,
    livereload: true,
    root: './dist'
  })
});

gulp.task('connectDev', function() {
  connect.server({
    port: 1338,
    livereload: true,
    root: './src'
  })
});

gulp.task('concat', function() {
  gulp.src(paths.app)
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

gulp.task('lib', function() {
  gulp.src(paths.lib)
    .pipe(sourcemaps.init())
      .pipe(concat('lib.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(htmlreplace({
      lib: 'js/lib.js',
      app: 'js/app.js'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})

gulp.task('reload', function() {
  gulp.src(paths.html)
    .pipe(connect.reload());

})


gulp.task('watch', function() {
  gulp.watch(paths.app, ['concat']);
  gulp.watch(paths.html, ['html']);
})
gulp.task('watchDev', function() {
  gulp.watch([paths.html, paths.app], ['reload']);
})

gulp.task('default', ['lib', 'concat', 'html', 'connectDist', 'watch']);
gulp.task('dist', ['lib', 'concat', 'html']);

gulp.task('dev', ['connectDev', 'watchDev']);