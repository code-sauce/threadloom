"use strict";

var gulp = require('gulp');
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var browserify = require('browserify'); // Bundles JS
var fs = require('fs');
var sass = require('gulp-sass');
var path = require('path');

var config = {
    paths: {
        js: './threadloom/forum/static/javascript/**/*.*',
        mainJs: './threadloom/forum/static/javascript/app.js',
        bundleJs: './threadloom/forum/static/bundle',
        scss: './threadloom/forum/static/sass/**/*.scss',
        scssOutput: './threadloom/forum/static/stylesheets',
        tests: './threadloom/forum/static/tests/**/test*.js',
        testsDir: 'threadloom/forum/static/tests'
    }
};

gulp.task('clean', function () {
    return del([
        config.paths.scssOutput,
        'xunit.xml', // not configurable test output file
        config.paths.bundleJs + 'bundle.js'
    ]);
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.bundleJs))
});

gulp.task('sass', function () {
    gulp.src(config.paths.scss)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(config.paths.scssOutput));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.scss, ['sass']);
});

gulp.task('default', ['js', 'sass', 'watch']);
