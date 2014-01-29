/*global module:false*/
var sources = [
   "src/js/hwinfo.js"
];

module.exports = function (grunt) {

   // Project configuration.
   grunt.initConfig({
      // Task configuration.
      jshint: {
         options: {
            curly: false,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: true,
            boss: true,
            eqnull: true,
            browser: true,
            globals: {
               "jQuery": false,
               "$": false,
               "chrome": false,
               "bootbox": false
            }
         },
         gruntfile: {
            src: 'Gruntfile.js'
         },
         hwinfo: {
            src: sources
         }
      },
      watch: {
         gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
         },
         hwinfo: {
            files: sources,
            tasks: ['jshint:hwinfo']
         }
      },
      crx: {
         hwinfo: {
            src: "src/",
            dest: "build/crx",
            privateKey: "~/.ssh/chrome-apps.pem"
         }
      },
      csslint: {
         options: {
            // No Vendor Prefixes. We only will be using Blink-based browsers.
            "compatible-vendor-prefixes": false,
            "vendor-prefix": false
         },
         hwinfo: {
            src: ['src/css/style.css']
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-csslint');
   grunt.loadNpmTasks('grunt-crx');

   // Default task.
   grunt.registerTask('default', ['jshint', 'csslint']);

   // Test task.
   grunt.registerTask('test', ['jshint', 'csslint']);

   // Release task.
   grunt.registerTask('release', ['jshint', 'crx']);
};