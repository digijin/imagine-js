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
				src: ['src/polyfill/*.js', 'src/imagine.js', 'src/imagine/*.js'],
				dest: 'lib/imagine.js',
			},
        },
        uglify:{
        	dist:{
        		files:{
        			'lib/imagine.min.js': ['lib/imagine.js']
        		}
        	}
        }
	});


	grunt.registerTask('build', ['concat', 'uglify']);

	grunt.registerTask('default', ['build', 'jasmine', 'jshint', 'watch']);
};