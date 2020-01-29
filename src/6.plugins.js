var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the list of available plugins
 *
 * @return  array
 */
function getPlugins()
{
	var results = []

	if (extensions && extensions.hasOwnProperty('plugins')) {

		for(var type in extensions.plugins) {
			var sourceArray = extensions.plugins[type];

			for (index = 0; index < sourceArray.length; ++index) {
			    results.push(type + '.' + sourceArray[index]);
			}
		}
	}

	return results;
}

/**
 * Function to ease the custom plugins management
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:plugins.frontend'
 * @param   string  app       'frontend', 'backend'
 *
 * @return  array
 */
function getPluginsTasks(baseTask) {
	var tasks = [];
	var plugins = getPlugins();

	if (plugins) {
		for (pos = 0; pos < plugins.length; ++pos) {
			tasks.push(baseTask + '.' + plugins[pos]);
		}
	}

	if (tasks.length > 0)
	{
		return gulp.series.apply(gulp, tasks);
	}

	return gulp.task(baseTask, function (cb) {
		cb();
	})
}

// Clean
gulp.task('clean:plugins',
	getPluginsTasks('clean:plugins'),
	function(cb) {
		cb();
});

// Copy
gulp.task('copy:plugins',
	getPluginsTasks('copy:plugins'),
	function(cb) {
		cb();
});

// Watch
gulp.task('watch:plugins',
	getPluginsTasks('watch:plugins'),
	function(cb) {
		cb();
});

exports.getPlugins = getPlugins;
exports.getPluginsTasks = getPluginsTasks;
