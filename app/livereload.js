var gulp = require('gulp');

gulp.task('reload', function () {
  location && location.reload();
});

gulp.watch('app/**/*.html', ['reload']);
gulp.watch('app/app.js', ['reload']);
