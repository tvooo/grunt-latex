# grunt-latex

> Compile LaTeX documents using pdflatex and other latex engines.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-latex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-latex');
```

## The "latex" task

### Prerequisites

For this plugin to work, you need to have a LaTeX distribution installed that comes with the ```pdflatex``` command line application. Common LaTeX distributions are:

* [TeX Live (Linux/Windows)](http://www.tug.org/texlive/)
* [MacTeX (Mac OS)](http://www.tug.org/mactex/)
* [MiKTex (Windows)](http://miktex.org/)

From version 0.2.0, it is also possible to set the `engine` parameter to use other commands than `pdflatex`, for example `lualatex`. Please note that not all options may be supported by other engines.

### Overview
In your project's Gruntfile, add a section named `latex` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  latex: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  }
});
```

### Options

Currently, a few of pdflatex' command line options are supported. If you have the need for more, don't hesitate to file an issue on Github.

#### options.interaction
Type: `String`  
Default value: `'nonstopmode'`

Sets the interaction mode; can be `'nonstopmode'`, `'batchmode'`, `'scrollmode'` or `'errorstopmode'`.

#### options.draftmode
Type: `Boolean`  
Default value: `false`

If `true`, the task will run in draft mode, e.g. no output PDF will be generated.

#### options.haltOnError
Type: `Boolean`  
Default value: `false`

If `true`, the task will stop processing at the first error.

#### options.outputDirectory
Type: `String`  
Default value: `.`

Specifies the directory to write files into.

#### options.outputFormat
Type: `String`  
Default value: `'pdf'`

Specifies the output format. Can be either `'pdf'` or `'dvi'`.

#### options.auxDirectory
**MiKTex only!** (gracefully ignored in other distributions, afaik)  
Type: `String`  
Default value: not set

Specifies a folder to store auxiliary files, so that the source/output folder does not get polluted.

#### options.engine
Type: `String`  
Default value: `'pdflatex'`

Allows you to set an alternative binary, instead of pdflatex, e.g. `lualatex`. Alternative binaries may not support all other options, so use at your own risk.

#### options.jobname
Type: `String`  
Default value: not set

Set a job name (rename the output files). **Warning: Don't use this option on multiple source files if they are in the same folder! Because they all have the same jobname, they will subsequently overwrite each other's output.**

#### options.shellEscape
Type: `Boolean`  
Default value: `false`

Enable `\write18{SHELL COMMAND}`. Among other uses, it is sometimes necessary for `epstopdf` to work properly.

### Usage Examples

#### Default Options
The most simple way to use grunt-latex is to specify only the source LaTeX files to be compiled.

```js
grunt.initConfig({
  latex: {
    src: ['document.tex']
  },
});
```

#### Custom Options
You can set task-specific options, but you can also define different targets with target-specific options.

```js
grunt.initConfig({
  latex: {
    options: {
      haltOnError: 'true'
    },
    pdf_target: {
      options: {
        outputDirectory: 'dest/pdf'
      },
      src: ['document.tex']
    },
    dvi_target: {
      options: {
        outputDirectory: 'dest/dvi',
        outputFormat: 'dvi'
      },
      src: ['document.tex']
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 1.0.0 Proper semver
* 0.2.0 Multi-engine support
* 0.1.0 Initial release

