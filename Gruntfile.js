module.exports = function(grunt){

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: require('./package.json'),
		clean:['temp'],
		watch:{
			files: [
				'Gruntfile.js',
				'demos/**/*.*',
				'spec/**/*.*',
				'src/**/*.*',
				'sandpit/**/*.*',
				'specrunner/**/*.*'
				],
			tasks: ['build', 'jasmine', 'jshint'],
			options: {
				livereload: true
			}
		},
		jasmine:{
			pivotal:{
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
			// engine:{
			// 	src: 'lib/imagine.js',
			// 	options:{
			// 		specs: 'spec/imagine.engine.spec.js'
			// 	}
			// }
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

	grunt.registerTask('default', ['build', 'jasmine', 'jshint', 'watch']);
};