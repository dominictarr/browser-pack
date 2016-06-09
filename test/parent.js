var test = require('tape');
var pack = require('../');

test('pack', function (t) {
    t.plan(1);
    
    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
      var a = []
        Function(['F'], 'return ' + src)(
         function (b) { a.push(b) }
        )
      t.deepEqual(a, [false, true])
      t.end()

    });
    
    p.end(JSON.stringify([
        {
            id: 'parent',
            source: 'F(!!module.parent); require("./child")',
            entry: true,
            deps: { './child': 'child' }
        },
        {
            id: 'child',
            source: 'F(!!module.parent)'
        }
    ]));
});





