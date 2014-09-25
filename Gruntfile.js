module.exports = function(grunt){

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: require('./package.json'),
		clean:['temp'],
		coffeelint: {
	     	app: ['src/**/*.coffee'],
	     	options: {
	     		force: false,
	     		max_line_length: {
	     			value: 200
	     		}
	     	}
	    },
		watch:{
			files: [
				'Gruntfile.js',
				'demos/**/*.*',
				'spec/**/*.*',
				'src/**/*.*',
				'sandpit/**/*.*',
				'specrunner/**/*.*'
				],
			tasks: ['build', 'coffeelint', 'jshint'], //, 'jasmine:all'
			options: {
				livereload: true
			}
		},
		jasmine:{
			all:{
				src: 'lib/imagine.js',
				options:{
					vendor: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
		            ],
					specs: 'spec/**/*.spec.js',
					// display: 'short',
					summary: true
				}
			},
			//following are only turned on manually for specific debugging
			inorder:{
				src: 'lib/imagine.js',
				options:{
					vendor: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
		            ],
					specs: [
					'spec/component/collider.spec.js',
					'spec/component/element.spec.js',
					'spec/imagine.component.spec.js',
					'spec/imagine.spec.js',
					'spec/imagine/engine.spec.js'
					]
				}
			},
			collider:{
				src: 'lib/imagine.js',
				options:{
					vendor: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
		            ],
					specs: 'spec/component/collider.spec.js'
				}
			}
		},
        jshint: {
            all: ['Gruntfile.js', 'src/imagine.js']//, 'demos/**/*.js'
        },
        concat:{
        	options: {
				separator: ';\n',
			},
			dist: {
				src: ['temp/polyfill/*.js', 'temp/imagine.js', 'temp/imagine/*.js', 'temp/component/*.js'],
				dest: 'lib/imagine.js',
			},
			spec: {
				src: ['spec/**/*.js'],
				dest: 'specrunner/all.spec.js'
			}
        },
        uglify:{
        	dist:{
        		files:{
        			'lib/imagine.min.js': ['lib/imagine.js']
        		}
        	}
        },
        coffee:{
        	compile:{
        		options:{
        			bare:true
        		},
        		cwd: 'src',
        		src: ['**/*.coffee'],
        		dest: 'temp',
        		expand: true,
				ext: '.js',
				
        	},
        	demos:{
        		src: ['demos/**/*.coffee'],
        		dest: '',
        		expand: true,
        		ext: '.js'
        	}
        }
	});


	grunt.registerTask('build', ['clean', 'coffee', 'concat', 'uglify']);

	grunt.registerTask('default', ['build', 'jasmine:all', 'jshint', 'watch']);
};