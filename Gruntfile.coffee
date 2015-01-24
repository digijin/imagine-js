timer = require("grunt-timer")
module.exports = (grunt) ->
	timer.init grunt,
		deferLogs: true

	require("matchdep").filter("grunt-*").forEach grunt.loadNpmTasks
	grunt.initConfig
		pkg: require("./package.json")

		coffeeify: 
			options:
				debug: true
				# alias: 
				# 	'jquery-browserify': 'jquery'
			game:
				src: 'src/imagine.coffee'
				dest: 'lib/imagine.js'
		clean:
			temp: ["temp"]
			doc: ["doc"]

		codo:
			src: ["src/"]

		nodemon:
			dev:
				script: "server/server.coffee"
				options:
					watch: [
						"Gruntfile.coffee"
						"server/*.*"
					]
					nodeArgs: [
						"--nodejs"
						"--debug"
					]
					callback: (nodemon) ->
						nodemon.on "log", (event) ->
							console.log event.colour
							return

						return

		"node-inspector":
			custom:
				options:
					"web-port": 1337
					"web-host": "localhost"
					"debug-port": 5858
					"save-live-edit": true
					"no-preload": true
					"stack-trace-limit": 4
					hidden: ["node_modules"]

		cjsx:
			demos:
				src: ["demos/**/*.cjsx"]
				dest: ""
				expand: true
				ext: ".js"

		open:
			testChrome:
				path: "http://localhost:4010/SpecRunner.html"
				app: "Chrome"

			testFF:
				path: "http://localhost:4010/SpecRunner.html"
				app: "Firefox"

			breakout:
				path: "file:///G:/Projects/imagine-js/demos/breakout/index.html"
				app: "Chrome"

		coffeelint:
			app: ["src/**/*.coffee"]
			options:
				force: false
				max_line_length:
					value: 200

		watch:
			all:
				files: [
					"Gruntfile.coffee"
					"demos/**/*.*"
					"spec/**/*.*"
					"src/**/*.*"
					"sandpit/**/*.*"
					"specrunner/**/*.*"
				]
				tasks: [
					"build"
					"test"
					"codo"
				]
				options:
					livereload: true

			demos:
				files: [
					"Gruntfile.coffee"
					"demos/**/*.cjsx"
				]
				tasks: ["build"]
				options:
					livereload: true

		jasmine:
			all:
				src: "lib/imagine.js"
				options:
					vendor: [
						"bower_components/jquery/dist/jquery.js"
						"bower_components/jasmine-jquery/lib/jasmine-jquery.js"
					]
					specs: "spec/**/*.spec.js"
					
					# display: 'short',
					summary: true

			
			#following are only turned on manually for specific debugging
			inorder:
				src: "lib/imagine.js"
				options:
					vendor: [
						"bower_components/jquery/dist/jquery.js"
						"bower_components/jasmine-jquery/lib/jasmine-jquery.js"
					]
					specs: [
						"spec/component/collider.spec.js"
						"spec/component/element.spec.js"
						"spec/imagine.component.spec.js"
						"spec/imagine.spec.js"
						"spec/imagine/engine.spec.js"
						"spec/imagine/coffeeify.spec.js"
					]

			collider:
				src: "lib/imagine.js"
				options:
					vendor: [
						"bower_components/jquery/dist/jquery.js"
						"bower_components/jasmine-jquery/lib/jasmine-jquery.js"
					]
					specs: "spec/component/collider.spec.js"

		jshint:
			all: [ #, 'demos/**/*.js'
				"src/imagine.js"
			]

		concat:
			options:
				separator: ";\n"

			dist:
				src: [
					"temp/polyfill/*.js"
					"temp/imagine.js"
					"temp/imagine/*.js"
					"temp/component/*.js"
				]
				dest: "lib/imagine.js"

			spec:
				src: ["spec/**/*.js"]
				dest: "specrunner/all.spec.js"

			platformer:
				src: [
					"demos/platformer/level/parser.js"
					"demos/platformer/level/level1.js"
					"demos/platformer/block.js"
					"demos/platformer/castle.js"
					"demos/platformer/character.js"
					"demos/platformer/player.js"
					"demos/platformer/enemy.js"
					"demos/platformer/turtle.js"
					"demos/platformer/bowser.js"
					"demos/platformer/dying.js"
					"demos/platformer/announce.js"
					"demos/platformer/firework.js"
					"demos/platformer/FPS.js"
					"demos/platformer/script.js"
				]
				dest: "demos/platformer/all.js"

		uglify:
			dist:
				files:
					"lib/imagine.min.js": ["lib/imagine.js"]

			platformer:
				files:
					"demos/platformer/all.min.js": ["demos/platformer/all.js"]

		coffee:
			compile:
				options:
					bare: true

				cwd: "src"
				src: ["**/*.coffee"]
				dest: "temp"
				expand: true
				ext: ".js"

			demos:
				src: ["demos/**/*.coffee"]
				dest: ""
				expand: true
				ext: ".js"

		concurrent:
			dev:
				tasks: [
					"watch:all"
					"startServer"
				]
				options:
					logConcurrentOutput: true

			demos:
				tasks: [
					"watch:demos"
					"startServer"
				]
				options:
					logConcurrentOutput: true

			server:
				tasks: [
					"nodemon"
					"node-inspector"
				]
				options:
					logConcurrentOutput: true

		"bower-install-simple":
			prod:
				options:
					production: true

			dev:
				options:
					production: false

	grunt.registerTask "startServer", ["concurrent:server"]
	grunt.registerTask "build", [
		"clean:temp"
		"coffee"
		"cjsx"
		"concat" #todo: alter this step
		# "coffeeify"
		"uglify"
	]
	grunt.registerTask "default", [
		"build"
		"concurrent:dev"
	]
	grunt.registerTask "test", [
		"coffeelint"
		"jshint"
		"jasmine:all"
	]
	grunt.registerTask "demos", [
		"build"
		"concurrent:demos"
	]
	grunt.registerTask "postinstall", [
		"bower-install-simple"
		"build"
		"codo"
	]
	return