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

	var themeSiteConfig = {
			themeName : '',
			site : '',
			module : ''
		};

	function registerWatchTask(themeName, site, module){

		themeSiteConfig.themeName = themeName;
		themeSiteConfig.site = site;
		themeSiteConfig.module = module;
		
		var isDebugMode = true;

		themeSiteConfig.themeName = configJson[themeSiteConfig.themeName];
		var expenseTrackerConfig = require('./expenseTrackerConfig.js')(themeSiteConfig, grunt);

		
		register(isDebugMode, themeSiteConfig, expenseTrackerConfig);
		//run(isDebugMode, themeSiteConfig);

		grunt.task.run('watch');

	}

	function register(isDebugMode,themeSiteConfig, expenseTrackerConfig){
		var gruntConfig = {};

		if(themeSiteConfig.site === undefined || themeSiteConfig.module === undefined || themeSiteConfig.module == 'css'){
			gruntConfig.sass = expenseTrackerConfig.sass();
		}

		gruntConfig.watch = expenseTrackerConfig.watch();
		grunt.config.merge(gruntConfig);
	}

	function run(isDebugMode, themeSiteConfig){

		if(themeSiteConfig.site === undefined || themeSiteConfig.module === undefined || themeSiteConfig.module == 'css'){
			grunt.task.run(['sass']);
		}

		grunt.task.run(['connect', 'watch' + (themeSiteConfig.site  === undefined ? '' : ':' + themeSiteConfig.site )]);
	}
};