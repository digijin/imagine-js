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
			tasks: ['jasmine'],
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['jasmine', 'watch']);
}