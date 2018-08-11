var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});


gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
});
