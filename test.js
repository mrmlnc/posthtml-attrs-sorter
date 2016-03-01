var posthtml = require('posthtml');
var assert = require('assert');
var m = require('./');

var test = function(input, output, opts, done) {
  posthtml()
    .use(m(opts))
      .process(input)
      .then(function(result) {
        assert.equal(result.html, output);
        done();
      })
      .catch(function(error) {
        done(error);
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
