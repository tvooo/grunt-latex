exports.init = function (grunt) {
  'use strict';
  var fs = require('fs');
  var wrench =  require('wrench');

  var exports = {};

  function camelCaseToDashed(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  // Extracts the options that cannot be used as CLI parameter but only
  // as 'raw' arguments.
  // Returns an object: {raw: str, options: []} with the raw string to be
  // used to generate a config and the list of used options.
  exports.extractOptions = function extractOptions(options) {

    function formatOption( option, value ) {
      if ( 'boolean' === typeof value ) {
        return value ? '-' + camelCaseToDashed(option) : '';
      } else if ( 'string' === typeof value ) {
        return '-' + camelCaseToDashed(option) + '=' + value;
      }
    }

    var supportedOptions = [
      'interaction',
      'draftmode',
      'haltOnError',
      'outputDirectory',
      'outputFormat'
    ];

    var usedOptions = [];

    for( var option in options) {
      var value = options[ option ];
      if ( supportedOptions.indexOf(option) >= 0 ) {
        usedOptions.push( formatOption( option, value ) );
        if ( option === 'outputDirectory' && !fs.existsSync( value ) ) {
          wrench.mkdirSyncRecursive( value );
        }
      }
    }

    return usedOptions;
  };


  // build the array of arguments to build the compass command
  exports.buildArgsArray = function (options) {
    var args = this.extractOptions( options );

    grunt.verbose.writeflags(options, 'Options');

    if (process.platform === 'win32') {
      args.unshift('pdflatex'); // maybe .exe?
    } else {
      args.unshift('pdflatex');
    }

    return args;
  };

  return exports;
};