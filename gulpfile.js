const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const nodeNormalizeSCSS = require('node-normalize-scss');
const rimraf = require('gulp-rimraf');

const { reload } = browserSync;

const path = {
  build: {
    html: 'dist/',
    css: 'dist/style/',
    img: 'dist/img/',
    js: 'dist/js/',
  },
  src: {
    html: 'src/*.pug',
    style: 'src/style/*.scss',
    img: 'src/img/**/*.+(jpeg|jpg|png|tiff|webp|svg)',
    js: 'src/js/*.js',
  },
  watch: {
    html: 'src/**/*.pug',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    js: 'src/js/**/*.js',
  },
  clean: './dist',
};

const config = {
  server: {
    baseDir: './dist',
  },
  tunnel: false,
  host: 'localhost',
  port: 9999,
  logPrefix: 'front_log',
};

gulp.task('html:build', () => {
  gulp.src(path.src.html)
    .pipe(pug())
    .pipe(plumber())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});

gulp.task('js:build', () => {
  gulp.src(path.src.js)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});


gulp.task('style:build', () => {
  gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: nodeNormalizeSCSS.includePaths,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});


gulp.task('image:build', () => {
  gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});


gulp.task('fonts:build', () => {
  gulp.src(path.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.fonts));
});


gulp.task('build', [
  'html:build',
  'style:build',
  'image:build',
  'js:build',
]);


gulp.task('watch', () => {
  watch([path.watch.html], () => {
    gulp.start('html:build');
  });
  watch([path.watch.style], () => {
    gulp.start('style:build');
  });
  watch([path.watch.js], () => {
    gulp.start('js:build');
  });
  watch([path.watch.img], () => {
    gulp.start('image:build');
  });
});


gulp.task('webserver', () => {
  browserSync(config);
});


gulp.task('clean', (cb) => {
  rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'webserver', 'watch']);
