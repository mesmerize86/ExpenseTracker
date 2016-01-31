var expenseTrackerConfig = function(themeName, site, module, grunt){

	var config = {
		watch: configureWatch,
		 sass: configureSass
	}

	var themeConfig = themeName;
	var defaultConfig = extendOptions({}, themeConfig.config, themeConfig["interface"][site].config || {});

	function configureWatch(){
		var watchConfig = {};

		watchConfig = {
			options: {
				atBegin: true,
				nospawn: true,
			}
		};

		if(module == "css" || module == "all"){
			watchConfig.css = {
				files: [defaultConfig.sassPath + '/**/*.{sass,scss}'],
				tasks: ['sass']
			}
		}

		return watchConfig;
	}

	function configureSass(){
		var sassConfig = {};

		sassConfig[defaultConfig.themeName + "_" + site + "-css"] = {
			options:{
				style: 'compressed',
				"sourcemap=none": ''
			},
			files: [
				{
					expand: true,
					cwd: defaultConfig.sassPath,
					src: ['*.{sass,scss}'],
					dest: themeConfig["interface"][site].css,
					ext: '.css'
				}
			],
		}
		return sassConfig;
	}

	function extendOptions(){
		for(var i = 1; i < arguments.length; i++)
			for(var key in arguments[i])
				if(arguments[i].hasOwnProperty(key))
					arguments[0][key] = arguments[i][key];

		return arguments[0];
	}

	return config;

}

module.exports = expenseTrackerConfig;