/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-contrib");
	grunt.loadNpmTasks("grunt-buster");
	grunt.loadNpmTasks("grunt-git-describe");
	grunt.loadNpmTasks("grunt-github-upload");

	grunt.registerTask("test", "lint buster");
	grunt.registerTask("dist", "describe requirejs concat min");
	grunt.registerTask("default", "test clean dist");

	grunt.config.init({
		meta : {
			version : "SNAPSHOT",
			banner : "/*!\n" +
				"* TroopJS Bundle - <%= meta.version %>\n" +
				"* http://troopjs.com/\n" +
				"* Copyright (c) <%= grunt.template.today('yyyy') %> " + "Mikael Karon <mikael@karon.se>\n" +
				"* Licensed MIT\n" +
				"*/",
			dist : {
				bundle : "dist/troopjs-bundle.js",
				min : "dist/troopjs-bundle.min.js"
			},
			auth : "<json:auth.json>"
		},
		clean : "<config:meta.dist>",
		lint : {
			src: [ "grunt.js", "src/lib/troopjs-*/src/**/*.js" ]
		},
		requirejs : {
			dist : {
				options : {
					out : "<config:meta.dist.bundle>",
					baseUrl : "src",
					paths : {
						"compose" : "lib/composejs/compose",
						"troopjs-core" : "lib/troopjs-core/src",
						"troopjs-utils" : "lib/troopjs-utils/src",
						"troopjs-jquery" : "lib/troopjs-jquery/src",
						"troopjs-requirejs" : "lib/troopjs-requirejs/src"
					},
					map : {
						"*" : {
							"jquery" : "empty:",
							"config" : "empty:"
						}
					},
					include : grunt.file.expandFiles("src/lib/troopjs-*/src/**/*.js").map(function (file) {
						return file.replace(/.*\/(troopjs-\w+)\/src\/(.+)\.js$/, "$1/$2");
					}),
					optimize : "none"
				}
			}
		},
		buster : {
			test : {
				config : "test/buster.js"
			}
		},
		concat : {
			dist : {
				src : [ "<banner>", "<config:requirejs.dist.options.out>" ],
				dest : "<config:meta.dist.bundle>"
			}
		},
		min : {
			dist : {
				src : [ "<banner>", "<config:concat.dist.dest>" ],
				dest : "<config:meta.dist.min>"
			}
		},
		upload : {
			"troopjs-bundle.js" : {
				repo : "troopjs/troopjs-bundle",
				auth : "<%= [ meta.auth.username, meta.auth.password ].join(':') %>",
				file : "<config:meta.dist.bundle>",
				description : "TroopJS bundle - <%= meta.version %>"
			},
			"troopjs-bundle.min.js" : {
				repo : "troopjs/troopjs-bundle",
				auth : "<%= [ meta.auth.username, meta.auth.password ].join(':') %>",
				file : "<config:meta.dist.min>",
				description : "TroopJS bundle - <%= meta.version %> (minified)"
			}
		}
	});
};
