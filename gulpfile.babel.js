// Gulpコンパイルに必要なもの
import gulp         from 'gulp'
import plumber      from 'gulp-plumber'
import babel        from 'gulp-babel'
import sass         from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import browser      from 'browser-sync'

// サーバ
gulp.task('server', () => {
    browser({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });
});

// リロード
gulp.task('reload', () => {
    browser.reload();
});

// デフォルト(監視とコンパイル)
gulp.task('default', ['sass', 'js', 'server'], () => {
    gulp.watch(['src/js/**/*.js'], ['js', 'reload']);
    gulp.watch('src/sass/**/*.scss', ['sass', 'reload']);
    gulp.watch('*.html', ['reload']);
});

// SASSコンパイル
gulp.task('sass', () => {
    gulp.src('src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'));
});

// ES2015コンパイル
gulp.task('js', () => {
    gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});
