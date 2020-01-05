const del = require(`del`);
const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const mqpacker = require(`css-mqpacker`);
const minify = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);
const mocha = require(`gulp-mocha`);
const commonjs = require(`rollup-plugin-commonjs`);

gulp.task(`style`, function () {
  return gulp.src(`sass/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          `last 1 version`,
          `last 2 Chrome versions`,
          `last 2 Firefox versions`,
          `last 2 Opera versions`,
          `last 2 Edge versions`
        ]
      }),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest(`docs/css`))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`docs/css`));
});

gulp.task(`scripts`, function () {
  return gulp.src(`js/main.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, `iife`))
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`docs/js`));
});

gulp.task(`test`, function () {
  return gulp
    .src([`js/test/**/*.js`])
    .pipe(rollup({
      plugins: [
        commonjs()
      ]
    }, `cjs`))
    .pipe(gulp.dest(`docs/test`))
    .pipe(mocha({
      reporter: `spec`
    }));
});

gulp.task(`copy-html`, function () {
  return gulp.src(`*.html`)
    .pipe(gulp.dest(`docs`))
    .pipe(server.stream());
});

gulp.task('copy-img', function () {
  return gulp.src([
    `img/*.*`
  ], {base: `.`})
    .pipe(gulp.dest(`docs`));
})

gulp.task(`copy`, gulp.series([`copy-html`, `scripts`, `style`, 'copy-img']));

gulp.task(`clean`, function () {
  return del(`docs`);
});

gulp.task(`assemble`, gulp.series([`clean`, `copy`, `style`]));

gulp.task(`test`, function () {
});

gulp.task(`imagemin`, gulp.series([`copy`]), function () {
  gulp.src(`docs/img/**/*.{jpg,png,gif}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(`docs/img`));
});


gulp.task(`js-watch`, gulp.series([`scripts`]), function (done) {
  server.reload();
  done();
});

gulp.task(`serve`, gulp.series([`assemble`]), function () {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`sass/**/*.{scss,sass}`, [`style`]);
  gulp.watch(`*.html`, [`copy-html`]);
  gulp.watch(`js/**/*.js`, [`js-watch`]);
});


gulp.task(`build`, gulp.series([`assemble`, `imagemin`]));
