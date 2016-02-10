var expenseTrackerConfig = function(themeSiteConfig, grunt){

	var config = {
		watch: configureWatch,
		sass: configureSass
	};

	var themeConfig = themeSiteConfig.themeConfigName;

	var sites = [];

	for(site in themeConfig.interface){
		sites.push(site);
	}
	
	var activeSites = sites.filter(function(site){
		return !themeSiteConfig.hasSite || site == themeSiteConfig.site;
	});

	function configureWatch(){
		var watchConfig = {};

		watchConfig = {
			options: {
				atBegin: true,
				nospawn: true,
			}
		};

		var defaultConfig = themeConfig.config;

		if(themeSiteConfig.hasSite){
			defaultConfig = extendOptions({}, themeConfig.config, themeConfig.interface[themeSiteConfig.site].config || {});
		}

		watchConfig.css = {
			files: [defaultConfig.sassPath + '/**/*.{sass,scss}'],
			tasks: ['sass']
		};

		return watchConfig;
	}

	function configureSass(){
		var sassConfig = {};
		
		var destPath, site;

		activeSites.forEach(function(site){
			var defaultConfig = extendOptions({}, themeConfig.config, themeConfig.interface[site].config || {});
			destPath = themeConfig.interface[site];

			console.log(destPath.css);

			sassConfig[defaultConfig.themeName + "_" + site + "-css"] = {
				options:{
					style: 'compressed'
				},
				files: [
					{
						expand: true,
						cwd: defaultConfig.sassPath,
						src: ['*.{sass,scss}'],
						dest: destPath.css,
						ext: '.css'
					}
				],
			};
		});
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