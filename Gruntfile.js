module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    source: 'src',
    target: 'build',
    temp: 'tmp',

    clean: {
      build: ['<%= temp %>', '<%= target %>'],
      temp: ['<%= temp %>']
    },

    dataUri: {
      build: {
        src: '<%= source %>/css/main.css',
        dest: '<%= temp %>/css',
        options: {
          target: '<%= source %>/img/*',
          baseDir: '<%= source %>'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          '<%= temp %>/css/main.min.css': ['<%= temp %>/css/main.css', '<%= source %>/css/ie.css']
        }
      }
    },

    uglify: {
      build: {
        files: {
          '<%= temp %>/js/main.min.js': [
            '<%= source %>/js/embed-swf-ie.js',
            '<%= source %>/js/html5-video-player.js',
            '<%= source %>/js/divine-video-player.js',
            '<%= source %>/js/main.js',
            '<%= source %>/js/google-analytics.js'
          ],
          '<%= temp %>/js/html5-video-shim.min.js': [
            '<%= source %>/js/html5-video-shim.js'
          ]
        }
      }
    },

    wrap: {
      build: {
        src: '<%= temp %>/js/main.min.js',
        wrapper: ['(function() {', '}());']
      }
    },

    htmlbuild: {
      build: {
        src: '<%= source %>/card.html',
        dest: '<%= target %>',
        options: {
          beautify: false,
          scripts: {
            "main": '<%= temp %>/js/main.min.js',
            "html5-video-shim": '<%= temp %>/js/html5-video-shim.min.js'
          },
          styles: {
            "main": '<%= temp %>/css/main.min.css'
          }
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: '<%= source %>', src: 'swf/*', dest: '<%= target %>', filter: 'isFile'},
          {expand: true, cwd: '<%= source %>', src: 'img/volume.png', dest: '<%= target %>', filter: 'isFile'}
        ]
      }
    }

  });

  grunt.registerTask('build', [
      'clean:build',
      'dataUri:build',
      'cssmin:build',
      'uglify:build',
      'wrap:build',
      'htmlbuild:build',
      'copy:build',
      'clean:temp'
  ]);
};
