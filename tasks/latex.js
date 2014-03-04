/*
 * grunt-latex
 * https://github.com/tvooo/grunt-latex
 *
 * Copyright (c) 2013 Tim von Oldenburg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var latex = require('./lib/latex').init(grunt);
  var async = grunt.util.async;
  var path = require('path');

  // Shallow object copy, for options
  function CloneObject( source ) {
    for (var i in source) {
      this[i] = source[i];
    }
  }

  function compile(args, wd, cb) {
    console.log( args );
    var child = grunt.util.spawn({
      cmd: args.shift(),
      args: args,
      opts: {
        cwd: wd
      }
    }, function (err, result, code) {
      var success = code === 0;

      if (code === 127) {
        return grunt.warn(
          'You need to have a LaTeX distribution with pdflatex installed ' +
          'and in your system PATH for this task to work. ' +
          'More info: https://github.com/tvooo/grunt-latex'
        );
      }

      // pdflatex exits with error code 1 if it finds an error,
      // but it might be that a PDF could be created nevertheless.
      if ( code === 1 && /Output written on/g.test(result.stdout) ) {
        success = true;
      }

      cb();
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }

  grunt.registerMultiTask('latex', 'Compile a LaTeX source file to PDF', function () {
    var options = this.options({
      interaction: 'nonstopmode',
      engine: 'pdflatex'
    });
    var done = this.async();

    async.forEachSeries( this.filesSrc, function( f, cb ) {
      var tmpOptions = new CloneObject(options);
      var cwd = path.dirname( f );
      // The CWD fucks up our outputDirectory, let's fix that
      if ( options['outputDirectory'] ) {
        var actualOutputDir = path.resolve(
          cwd, // pdflatex cwd
          process.cwd(), // go to Grunt cwd
          options['outputDirectory'] // and to the specified dir
        );

        if ( !grunt.file.exists( actualOutputDir ) ) {
          grunt.file.mkdir( actualOutputDir );
        }

        tmpOptions['outputDirectory'] = actualOutputDir;
      }

      var args = latex.buildArgsArray(tmpOptions);
      var tmpArgs = args.slice(0);
      // Strip directory name from file and supply it as extra cwd arg
      tmpArgs.push( path.basename( f ) );

      compile( tmpArgs, cwd, cb );
    }, done );

  });

};
