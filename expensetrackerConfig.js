var expenseTrackerConfig = function(themeSiteConfig, grunt){

	var config = {
		watch: configureWatch,
		sass: configureSass
	};

	var themeConfig = themeSiteConfig.themeName;
	var tempSite = {
		admin : themeSiteConfig.site,
		public: themeSiteConfig.site
	};

	if(themeSiteConfig.site === undefined){
			tempSite.admin = "admin";
			tempSite.public = "public";
	}

	// if(themeSiteConfig.site === undefined){
	// 	for(var site in themeConfig["interface"]){
	// 		defaultConfig = extendOptions({}, themeConfig.config, themeConfig["interface"][site].config || {});
	// 		console.log(defaultConfig);
	// 	}
	// }
	// else{
	// 	defaultConfig = extendOptions({}, themeConfig.config, themeConfig["interface"][themeSiteConfig.site].config || {});
	// 	console.log(defaultConfig);
	// }


	function configureWatch(){
		var watchConfig = {};

		watchConfig = {
			options: {
				atBegin: true,
				nospawn: true,
			}
		};

		for(var site in tempSite){
			defaultConfig = extendOptions({}, themeConfig.config, themeConfig["interface"][tempSite[site]].config || {});
		
			watchConfig.css = {
				files: [defaultConfig.sassPath + '/**/*.{sass,scss}'],
				tasks: ['sass']
			};
		}

		return watchConfig;
	}

	function configureSass(){
		var sassConfig = {};
		
		var destPath, site;

		for(site in tempSite){
			defaultConfig = extendOptions({}, themeConfig.config, themeConfig["interface"][tempSite[site]].config || {});
			destPath = themeConfig["interface"][tempSite[site]];

			sassConfig[defaultConfig.themeName + "_" + site + "-css"] = {
				options:{
					style: 'compressed',
					"sourcema/p=none": ''
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