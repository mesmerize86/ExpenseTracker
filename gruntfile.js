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

	var themeSiteConfig = {};

	function registerWatchTask(themeName, site, module){

		themeSiteConfig.themeName = themeName;
		themeSiteConfig.site = site;
		themeSiteConfig.module = module;
		themeSiteConfig.hasSite = site !== undefined;
		themeSiteConfig.hasModule = module !== undefined;
		themeSiteConfig.themeConfigName = configJson[themeName];

		var isDebugMode = true;
		var expenseTrackerConfig = require('./expenseTrackerConfig.js')(themeSiteConfig, grunt);

		// console.log(expenseTrackerConfig.sass());
		register(isDebugMode, themeSiteConfig, expenseTrackerConfig);

		grunt.task.run('connect','watch');

	}

	function register(isDebugMode,themeSiteConfig, expenseTrackerConfig){
		var gruntConfig = {};

		if(!themeSiteConfig.hasModule || themeSiteConfig.module == 'css'){
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