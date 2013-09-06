module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    source: 'src',
    target: 'build',
    temp: '.tmp',
    bowerComponents: 'src/bower_components',
    divinePlayer: '<%= bowerComponents %>/divine-player/release',

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
          '<%= temp %>/css/main.min.css': [
            '<%= temp %>/css/main.css',
            '<%= source %>/css/ie.css',
            '<%= source %>/css/fallback.css'
          ],
          '<%= temp %>/css/show-fallback.min.css': [
            '<%= source %>/css/show-fallback.css'
          ]
        }
      }
    },

    uglify: {
      build: {
        files: {
          '<%= temp %>/js/main.min.js': [
            '<%= divinePlayer %>/js/divine-player.min.js',
            '<%= source %>/js/static-fallback.js',
            '<%= source %>/js/main.js',
            '<%= source %>/js/google-analytics.js'
          ],
          '<%= temp %>/js/html5-video-shim.min.js': [
            '<%= divinePlayer %>/js/html5-video-shim.min.js'
          ]
        }
      }
    },

    wrap: {
      build: {
        src: '<%= temp %>/js/main.min.js',
        dest: '<%= temp %>/js/main.min.js',
        options: {
          wrapper: ['(function() {', '}());']
        }
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
            "main": '<%= temp %>/css/main.min.css',
            "show-fallback":  '<%= temp %>/css/show-fallback.min.css'
          }
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: '<%= divinePlayer %>', src: 'swf/*', dest: '<%= target %>', filter: 'isFile'},
          {expand: true, cwd: '<%= source %>', src: 'img/volume.png', dest: '<%= target %>', filter: 'isFile'},
          {expand: true, cwd: '<%= source %>', src: 'img/logo.png', dest: '<%= target %>', filter: 'isFile'}
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
