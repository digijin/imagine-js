module.exports = function(grunt){
	grunt.initConfig({
		pkg: require('./package.json'),
		watch:{
			files: [
				//'Gruntfile.js',
				'demos/**/*.*',
				'spec/**/*.*',
				'src/**/*.*'
				],
			tasks: ['jasmine', 'jshint'],
			options: {
				livereload: true
			}
		},
		jasmine:{
			pivotal:{
				src: 'src/**/*.js',
				options:{
					specs: 'spec/**/*.spec.js'
				}
			}
		},
        jshint: {
            all: ['Gruntfile.js', 'src/imagine.js']
        }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jasmine', 'watch']);
};