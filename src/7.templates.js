var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the available templates
 *
 * @param   string  app  'frontend' | 'backend'
 *
 * @return  array
 */
function getTemplates(app) {
	var results = [];

	if (extensions && extensions.hasOwnProperty('templates')
		&& extensions.templates.hasOwnProperty(app)
	) {
		var sourceArray = extensions.templates[app];

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(app + '.' + sourceArray[index]);
		}
	}

	return results;
}

/**
 * Function to get the tasks to execute
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:templates'
 *
 * @return  array
 */
function getTemplatesTasks(baseTask, app) {
	var tasks = [];
	var templates = getTemplates(app);

	if (templates) {
		for (index = 0; index < templates.length; ++index) {
		    tasks.push(baseTask + '.' + templates[index]);
		}
	}

	if (tasks.length > 0)
	{
		return gulp.series.apply(gulp, tasks);
	}

	return gulp.task(baseTask + '.' + app, function (cb) {
		cb();
	})
}

gulp.task('clean:templates.frontend',
	getTemplatesTasks('clean:templates', 'frontend'),
	function (cb) {
		cb();
});
gulp.task('clean:templates.backend',
	getTemplatesTasks('clean:templates', 'backend'),
	function (cb) {
		cb();
});

// Clean test site
gulp.task('clean:templates',
	gulp.series('clean:templates.frontend', 'clean:templates.backend'),
	function (cb) {
		return true
	});

gulp.task('copy:templates.frontend',
	getTemplatesTasks('copy:templates', 'frontend'),
	function (cb) {
		cb();
});
gulp.task('copy:templates.backend',
	getTemplatesTasks('copy:templates', 'backend'),
	function (cb) {
		cb();
});
// Copy to test site
gulp.task('copy:templates',
	gulp.series('copy:templates.frontend', 'copy:templates.backend'),
	function (cb) {
		cb();
	});

gulp.task('watch:templates.frontend',
	getTemplatesTasks('watch:templates', 'frontend'),
	function (cb) {
		cb();
});
gulp.task('watch:templates.backend',
	getTemplatesTasks('watch:templates', 'backend'),
	function (cb) {
		cb();
});

// Watch
gulp.task('watch:templates',
	gulp.series('watch:templates.frontend', 'watch:templates.backend'),
	function (cb) {
		cb();
	});

exports.getTemplates = getTemplates;
exports.getTemplatesTasks = getTemplatesTasks;
