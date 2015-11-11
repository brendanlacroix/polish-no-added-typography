define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-no-added-typography',

    message: function () {
      assert.strictEqual(plugin.message, 'Do not add new typographic rules.');
    }
  });

  registerSuite({
    name: 'polish-no-added-typography CSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/css.css', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'css' }));

        assert.strictEqual(errors.length, 8);
        assert.equal(errors[0].node.toString().trim(), '@font-face {\n  font-family: FontAwesome;\n  src: url("fonts/fontawesome-webfont.eot?v=#4.0.3");\n  src: url("fonts/fontawesome-webfont.eot?#iefix&v=#4.0.3") format("embedded-opentype"), url("fonts/fontawesome-webfont.woff?v=#4.0.3") format("woff"), url("fonts/fontawesome-webfont.ttf?v=#4.0.3") format("truetype"), url("fonts/fontawesome-webfont.svg#fontawesomeregular?v=#4.0.3") format("svg");\n}');
        assert.equal(errors[1].node.toString().trim(), 'font-family: FontAwesome');
        assert.equal(errors[2].node.toString().trim(), 'color: #f0f');
        assert.equal(errors[3].node.toString().trim(), 'font-family: sans');
        assert.equal(errors[4].node.toString().trim(), 'font-size: 12px');
        assert.equal(errors[5].node.toString().trim(), 'line-height: 20px');
        assert.equal(errors[6].node.toString().trim(), 'font-weight: bolder');
        assert.equal(errors[7].node.toString().trim(), 'letter-spacing: 2px');
      }));
    }
  });

  registerSuite({
    name: 'polish-no-added-typography SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 14);
        assert.equal(errors[0].node.toString().trim(), '@font-face {\n  font-family: FontAwesome;\n  src: url("fonts/fontawesome-webfont.eot?v=#4.0.3");\n  src: url("fonts/fontawesome-webfont.eot?#iefix&v=#4.0.3") format("embedded-opentype"), url("fonts/fontawesome-webfont.woff?v=#4.0.3") format("woff"), url("fonts/fontawesome-webfont.ttf?v=#4.0.3") format("truetype"), url("fonts/fontawesome-webfont.svg#fontawesomeregular?v=#4.0.3") format("svg");\n}');
        assert.equal(errors[1].node.toString().trim(), 'font-family: FontAwesome');
        assert.equal(errors[2].node.toString().trim(), 'color: palegoldenrod');
        assert.equal(errors[3].node.toString().trim(), 'font-family: sans');
        assert.equal(errors[4].node.toString().trim(), 'font-size: 12px');
        assert.equal(errors[5].node.toString().trim(), 'line-height: 20px');
        assert.equal(errors[6].node.toString().trim(), 'font-weight: bolder');
        assert.equal(errors[7].node.toString().trim(), 'letter-spacing: 2px');
        assert.equal(errors[8].node.toString().trim(), 'color: red');
        assert.equal(errors[9].node.toString().trim(), 'font-family: sans');
        assert.equal(errors[10].node.toString().trim(), 'font-size: 12px');
        assert.equal(errors[11].node.toString().trim(), 'line-height: 20px');
        assert.equal(errors[12].node.toString().trim(), 'font-weight: bolder');
        assert.equal(errors[13].node.toString().trim(), 'letter-spacing: 2px');
      }));
    }
  });
});
