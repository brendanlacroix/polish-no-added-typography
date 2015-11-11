var typeRules = [
  'color',
  'line-height',
  'letter-spacing'
];

module.exports = {
  name: 'no-added-typography',
  message: 'Do not add new typographic rules.',
  test: function(ast){
    var errors = [];

    ast.traverse(function(node) {
      if (node.type === 'declaration') {
        node.traverse(function (ident) {
          var string;

          if (ident.type !== 'ident') {
            return;
          }

          string = ident.toString();

          if (typeRules.indexOf(string) !== -1 || string.indexOf('font-') !== -1) {
            errors.push({
              node: node
            });
          }
        });
      } else if (node.type === 'atruleb') {
        if (node.contains('atkeyword') && node.first('atkeyword').toString() === '@font-face') {
          errors.push({
            node: node
          });
        }
      }
    });

    return errors;
  }
};
