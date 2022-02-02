'use strict';

const { watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

function buildStyles() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function minify_css () {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css/min'));
}

function browsersyncServe(cb){
    browserSync.init({
      server: {
        baseDir: '.'
      }    
    });
    cb();
}

function browsersyncReload(cb){
    browserSync.reload();
    cb();
}

function watchTask(){
    watch('./*.html', browsersyncReload);
    watch(['./sass/**/*.scss'], series(buildStyles, browsersyncReload));
}

exports.default = series(
    buildStyles,
    minify_css,
    browsersyncServe,
    watchTask
  );

//npm init
//npm install --save-dev gulp
//gulpfile.js
//npm install sass gulp-sass --save-dev
//npm install browser-sync gulp --save-dev