var assert = require('assert');
var posthtml = require('posthtml');
var m = require('./');

var test = function(input, output, opts, done) {
  posthtml()
    .use(m(opts))
    .process(input)
    .then(function(result) {
      assert.equal(result.html, output);
      done();
    })
    .catch(function(err) {
      done(err);
    });
};

it('Standard test', function(done) {
  test(
    '<input type="text" class="form-control" name="testInput" autofocus autocomplete="off" id="testId">',
    '<input class="form-control" id="testId" name="testInput" type="text" autofocus autocomplete="off">',
    {},
    done
  );
});

it('Angular test', function(done) {
  test(
    '<a href="#/phones/{{phone.id}}" class="thumb"><img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}"></a>',
    '<a class="thumb" href="#/phones/{{phone.id}}"><img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}"></a>',
    {},
    done
  );
});

it('Aria test', function(done) {
  test(
    '<span onclick="return checkBoxEvent(event);" role="checkbox" aria-checked="mixed">A checkbox label</span>',
    '<span role="checkbox" aria-checked="mixed" onclick="return checkBoxEvent(event);">A checkbox label</span>',
    {},
    done
  );
});

it('Custom config test', function(done) {
  test(
    '<a id="testId" href="#" class="testClass"></a>',
    '<a href="#" id="testId" class="testClass"></a>',
    {
      order: ['href', 'id', 'class']
    },
    done
  );
});

it('Empty config test', function(done) {
  test(
    '<a id="testId" href="#" class="testClass"></a>',
    '<a id="testId" href="#" class="testClass"></a>',
    {
      order: []
    },
    done
  );
});

it('Custom config bug (issue #12)', function(done) {
  test(
    '<img width="20" src="../images/image.png" height="40" alt="image" class="cls" id="id2">',
    '<img id="id2" class="cls" src="../images/image.png" width="20" height="40" alt="image">',
    {
      order: [
        'id',
        'class',
        'src',
        'width',
        'height',
        'for',
        'type',
        'href',
        'title',
        'alt',
        'value'
      ]
    },
    done
  );
});

it('Put unsorted in specific location', function(done) {
  test(
    '<img width="20" src="../images/image.png" height="40" alt="image" class="cls" id="id2">',
    '<img src="../images/image.png" id="id2" width="20" height="40" alt="image" class="cls">',
    {
      order: [
        'src',
        'id',
        '$unknown$',
        'class'
      ]
    },
    done
  );
});
