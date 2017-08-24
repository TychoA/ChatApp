// require grunt
var grunt = require('grunt');

// load the install tasks
require('load-grunt-tasks')(grunt);

// set up configuration
grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
                options: {
                        sourceMap: true
                },
                dist: {
                        src: './public/js/*.js',
                        dest: 'public/src/concat.js'
                }
        },
        babel: {
                dist: {
                        options: {
                                sourceMap: true
                        },
                        src: "./public/src/concat.js" ,
                        dest: "./public/src/es5.js"
                }
        },
        sass: {
                dist: {
                        options: {
                                style: "compact"
                        },
                        src:  './public/scss/main.scss',
                        dest: './public/main.css'
                }
        },
        uglify: {
                build: {
                        src: './public/src/es5.js',
                        dest: './public/minified.min.js'
                }
        }
});

// register the default tasks
grunt.registerTask('default', ['concat', 'babel', 'sass', 'uglify']);
