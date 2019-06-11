var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
	return gulp.src([
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-messages/angular-messages.min.js',
		'node_modules/angular-sanitize/angular-sanitize.min.js'
	])
	.pipe(concat('angulars.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);