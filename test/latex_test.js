'use strict';

var grunt = require('grunt'),
    fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.latex = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  pdf: function(test) {
    test.expect(1);

    var pdfExists = fs.existsSync( 'tmp/document.pdf' );
    test.equal(pdfExists, true, 'PDF file has been created');

    test.done();
  },
  dvi: function(test) {
    test.expect(1);

    var dviExists = fs.existsSync( 'tmp/document.dvi' );
    test.equal(dviExists, true, 'DVI file has been created');

    test.done();
  },
  multi: function(test) {
    test.expect(1);

    var pdfExists = fs.existsSync( 'tmp/document2.pdf' );
    test.equal(pdfExists, true, 'Second PDF file has been created');

    test.done();
  },
  engine: function(test) {
    test.expect(1);

    var pdfExists = fs.existsSync( 'tmp/lualatex.pdf' );
    test.equal(pdfExists, true, 'PDF file has been created using Lualatex');

    test.done();
  },
  bib: function(test) {
    var bblExists = fs.existsSync( 'tmp/document.bbl' );
    test.equal(bblExists, true, 'bibtex run successfully');
    test.done();
  }
};
