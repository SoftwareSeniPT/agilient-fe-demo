module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/custom.css': 'scss/custom.scss',
                    'css/mobile.css': 'scss/mobile.scss',
                }
            }
        },
        codekit: {
            dist: {
                src: ['**/*.kit', '!kit/components/*.kit'],
                dest: ''
            }
        },
        watch: {
            scss: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
            },
            codekit: {
                files: ['**/*.kit'],
                tasks: ['codekit'],
            },
        },
    });
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['watch']);
    require('load-grunt-tasks')(grunt);
};
