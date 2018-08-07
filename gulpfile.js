'use strict';

var gulp          = require('gulp'),
  concat        = require('gulp-concat'),
  babel         = require('gulp-babel'),
  uglify        = require('gulp-uglify'),
  cleanCSS      = require('gulp-clean-css'),
  gulpSequence  = require('gulp-sequence'),
  rename        = require('gulp-rename'),
  pump          = require('pump'),
  htmlmin       = require('gulp-htmlmin'),
  sass          = require('gulp-sass'),
  maps          = require('gulp-sourcemaps'),
  del           = require('del');

  gulp.task('cleanTasks', function(){
    return del('dist');
  });

  gulp.task('compileSass', ['cleanTasks'], function(){
    return gulp.src('src/scss/*.scss')
        .pipe(maps.init())
          .pipe(sass())
          .pipe(maps.write('./'))
          .pipe(gulp.dest('dist/css'))
    });

    gulp.task('processCSS', ['compileSass'], function(){
      gulp.src('dist/css/*.css')
          .pipe(rename(function(path){
              path.basename += ".min";
          }))
          .pipe(cleanCSS({
              level: {
                1: {
                },
                2: {
                }
              }
            }))
          .pipe(gulp.dest('dist/css'))
    });

    gulp.task('concatScriptsApp', function(){
      return gulp.src([
                'src/js/lazysizes.js',
                'src/js/app.js'
              ])
                 .pipe(maps.init())
                 .pipe(babel({
                   presets: ['env']
                 }))
                 .pipe(concat('app.js'))
                 .pipe(maps.write('./'))
                 .pipe(gulp.dest('dist/js'))
    });

    gulp.task('concatScriptsHome', ['concatScriptsApp'], function(){
      return gulp.src([
                'src/js/lazysizes.js',
                'src/js/app.js',
                'src/js/slider.js'
              ])
                 .pipe(maps.init())
                 .pipe(babel({
                   presets: ['env']
                 }))
                 .pipe(concat('homepage.js'))
                 .pipe(maps.write('./'))
                 .pipe(gulp.dest('dist/js'))
    });

    gulp.task('concatScriptsCasino', ['concatScriptsHome'], function(){
      return gulp.src([
                'src/js/lazysizes.js',
                'src/js/app.js',
                'src/js/sticky-header.js'
              ])
                 .pipe(maps.init())
                 .pipe(babel({
                   presets: ['env']
                 }))
                 .pipe(concat('casino.js'))
                 .pipe(maps.write('./'))
                 .pipe(gulp.dest('dist/js'))
    });

    gulp.task('compressJS', ['concatScriptsCasino'], function(err){
      pump([
        gulp.src('dist/js/*.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
      ],err)
    });

    gulp.task('copyHtmlImg', function(){
      return gulp.src(['src/images/**', 'src/**.html'],
                  {base:'src'})
                  .pipe(gulp.dest('dist'))
    });

    gulp.task('watchFiles', function(){
      gulp.watch(['src/scss/**/*.scss', 'src/js/*.js', 'src/index.html'], ['default']);
    });

    gulp.task('default', gulpSequence('processCSS', 'compressJS', 'copyHtmlImg'));
