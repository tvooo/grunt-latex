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

  function compile(args, cb) {
    console.log( args );
    var child = grunt.util.spawn({
      cmd: args.shift(),
      args: args
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

      cb(success);
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }

  grunt.registerMultiTask('latex', 'Compile a LaTeX source file to PDF', function () {
    var options = this.options({
      interaction: 'nonstopmode'
    });
    var cb = this.async();
    
    var args = latex.buildArgsArray(options);
    var tmpArgs = args;



    this.filesSrc.forEach( function( f ) {
      tmpArgs = args;
      tmpArgs.push( f );
      compile( tmpArgs, cb );
    } );

  });

};
