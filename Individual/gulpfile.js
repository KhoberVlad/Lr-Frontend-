const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

// --- компіляція SCSS у CSS без перезапису ---
function buildStyles() {
  return src([
      'scss/**/*.scss',
      'section/**/*.scss',
      'Лр7/**/*.scss',
      'Лр8/**/*.scss',
      'Лр9/**/*.scss',
      'Лр10/**/*.scss'
    ], { base: '.' }) // зберігаємо структуру папок
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      // прибираємо папку 'scss' з шляху, щоб CSS був у 'css/...'
      if(path.dirname.startsWith('scss')) {
        path.dirname = path.dirname.replace('scss', 'css');
      } else if(path.dirname.startsWith('section')) {
        path.dirname = path.dirname.replace('section', 'css/section');
      } else {
        path.dirname = 'css/' + path.dirname; // для Лр7-Лр10
      }
    }))
    .pipe(dest('.')); // вихідний корінь
}

// --- спостереження за змінами ---
function watchTask() {
  watch([
    'scss/**/*.scss',
    'section/**/*.scss',
    'Лр7/**/*.scss',
    'Лр8/**/*.scss',
    'Лр9/**/*.scss',
    'Лр10/**/*.scss'
  ], buildStyles);
}

exports.default = series(buildStyles, watchTask);
