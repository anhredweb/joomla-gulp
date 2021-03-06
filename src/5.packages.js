var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the list of the active packages
 *
 * @return  array
 */
function getPackages() {
	var results = [];

	if (extensions && extensions.hasOwnProperty('packages')) {
		var sourceArray = extensions.packages;

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(sourceArray[index]);
		}
	}

	return results;
}

/**
 * Get packages tasks
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:modules.frontend'
 *
 * @return  array
 */
function getPackagesTasks(baseTask) {
	var packages = getPackages();
	var tasks = [];

	for (index = 0; index < packages.length; ++index) {
	    tasks.push(baseTask + '.' + packages[index]);
	}

	if (tasks.length > 0)
	{
		return gulp.series(tasks)();
	}

	return gulp.task(baseTask, function (cb) {
		cb();
	})
}

// Clean
gulp.task('clean:packages',
	getPackagesTasks('clean:packages'),
	function(cb) {
		cb();
});

// Copy
gulp.task('copy:packages',
	getPackagesTasks('copy:packages'),
	function(cb) {
		cb();
});

// Watch
gulp.task('watch:packages',
	getPackagesTasks('watch:packages'),
	function(cb) {
		cb();
});

exports.getPackages = getPackages;
exports.getPackagesTasks = getPackagesTasks;
