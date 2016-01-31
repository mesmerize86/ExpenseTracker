module.exports = function(grunt){

	'use strict'
	//Load NPM Plugins
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//Load Theme Config
	var configJson = grunt.file.readJSON('config.json');

	//Project Configuration
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		connect:{
			expenseTracker:{
				options: {
					port: 9001,
					hostname: 'localhost',
					base: '.',
					open: true,
					keepalive: false,
					livereload: true
				}
			}
		}
	});

	//grunt debug:themename:site:module
	//grunt release:themename:site:module

	grunt.registerTask('debug', 'Watch css and script task [debug]', registerWatchTask);

	function registerWatchTask(themeName, site, module){

		if(themeName === 'store'){
			grunt.log.error('Store can not be compile. Please choose different theme name.');
			return;
		}

		var isDebugMode = true;

		var themeName = configJson[themeName];
		var expenseTrackerConfig = require('./expenseTrackerConfig.js')(themeName, site, module, grunt);


		register(isDebugMode, module, expenseTrackerConfig);
		run(isDebugMode, module);

	}

	function register(isDebugMode, module, expenseTrackerConfig){
		var gruntConfig = {};

		if(module == 'css' || module =='all'){
			gruntConfig.sass = expenseTrackerConfig.sass();
		}

		// if(module == 'js' || module == 'all'){
		// }

		gruntConfig.watch = expenseTrackerConfig.watch();
		grunt.config.merge(gruntConfig);
	}

	function run(isDebugMode, module){

		if(module == 'css' || module =='all'){
			grunt.task.run(['sass']);
		}

		// if(module == 'js' || module == 'all'){

		// }

		grunt.task.run(['connect', 'watch' + (module == 'all' ? '' : ':' + module )]);
	}
};