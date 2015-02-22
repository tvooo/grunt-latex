exports.init = function (grunt) {
  'use strict';

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

    var cmdArgOptions = [
      'interaction',
      'draftmode',
      'haltOnError',
      'outputDirectory',
      'outputFormat',
      'auxDirectory',
      'jobname',
      'shellEscape'
    ];

    var usedOptions = [],
        engine;

    for( var option in options) {
      var value = options[ option ];

      if ( cmdArgOptions.indexOf(option) >= 0 ) {
        var formattedOption = formatOption( option, value );
        if ( formattedOption !== '' ) {
          usedOptions.push( formattedOption );
        }
      }

      if ( option === 'engine' ) {
        engine = value;
      }
    }

    return [engine, usedOptions];
  };


  // build the array of arguments to build the compass command
  exports.buildArgsArray = function (options) {
    var allOptions = this.extractOptions( options ),
        engine = allOptions[0],
        args = allOptions[1];

    grunt.verbose.writeflags(options, 'Options');

    if (process.platform === 'win32') {
      args.unshift( engine ); // maybe .exe?
    } else {
      args.unshift( engine );
    }

    return args;
  };

  return exports;
};
