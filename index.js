module.exports = function(opts) {
  // Added Angular after data. See https://github.com/mdo/code-guide/issues/106
  var orderList = opts.order || ['class', 'id', 'name', 'data', 'ng', 'src', 'for', 'type', 'href', 'values', 'title', 'alt', 'role', 'aria'];

  return function(tree) {
    tree.walk(function(node) {
      if (node.attrs) {
        var attrs = Object.keys(node.attrs);
        if (attrs.length === 1) {
          return node;
        }

        var sortAttrs = {};
        var noSortAttrs = [];
        attrs = attrs.filter(function(attr) {
          // The name attribute can be shared (i.e. data-*, aria-*, ng-*),
          // so used a regular expression
          for (var i = 0; i < orderList.length; i++) {
            if (new RegExp(orderList[i]).test(attr)) {
              return true;
            }
          }

          noSortAttrs.push(attr);
          return false;
        }).sort(function(a, b) {
          orderList.forEach(function(item) {
            if (new RegExp(item).test(a)) {
              a = item;
            }

            if (new RegExp(item).test(b)) {
              b = item;
            }
          });

          return orderList.indexOf(a) - orderList.indexOf(b);
        }).concat(noSortAttrs).forEach(function(attr) {
          sortAttrs[attr] = (node.attrs[attr]) ? node.attrs[attr] : true;
        });

        node.attrs = sortAttrs;
      }

      return node;
    });

    return tree;
  };
};
