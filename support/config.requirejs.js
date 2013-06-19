require = {
	"packages" : [{
		"name" : "jquery",
		"location" : "jquery",
		"main" : "dist/jquery"
	}, {
		"name" : "when",
		"location" : "lib/when",
		"main" : "when"
	}, {
		"name" : "poly",
		"location" : "lib/poly",
		"main" : "poly"
	}, {
		"name" : "troopjs-core",
		"location" : "lib/troopjs-core"
	}, {
		"name" : "troopjs-data",
		"location" : "lib/troopjs-data"
	}, {
		"name" : "troopjs-browser",
		"location" : "lib/troopjs-browser"
	}, {
		"name" : "troopjs-jquery",
		"location" : "lib/troopjs-jquery"
	}, {
		"name" : "troopjs-requirejs",
		"location" : "lib/troopjs-requirejs"
	}, {
		"name" : "troopjs-utils",
		"location" : "lib/troopjs-utils"
	}],

	"map" : {
		"*" : {
			"template" : "troopjs-requirejs/template",
			"logger" : "troopjs-core/logger/console"
		}
	}
};