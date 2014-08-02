module.exports = function(grunt){

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: require('./package.json'),
		watch:{
			files: [
				'Gruntfile.js',
				'demos/**/*.*',
				'spec/**/*.*',
				'src/**/*.*',
				'sandpit/**/*.*'
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
					specs: 'spec/**/*.spec.js'
				}
			},
			engine:{
				src: 'lib/imagine.js',
				options:{
					specs: 'spec/imagine.engine.spec.js'
				}
			}
		},
        jshint: {
            all: ['Gruntfile.js', 'src/imagine.js', 'demos/**/*.js']
        },
        concat:{
        	options: {
				separator: ';\n',
			},
			dist: {
				src: ['temp/polyfill/*.js', 'temp/imagine.js', 'temp/imagine/component.js', 'temp/imagine/engine.js', 'src/imagine/input.js', 'src/imagine/time.js'],
				dest: 'lib/imagine.js',
			},
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
				
        	}
        }
	});


	grunt.registerTask('build', ['coffee', 'concat', 'uglify']);

	grunt.registerTask('default', ['build', 'jasmine', 'jshint', 'watch']);
};