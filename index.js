module.exports = function(opts) {
  // Added Angular after data. See https://github.com/mdo/code-guide/issues/106
  var orderList = (opts && opts.order) || [
    'class', 'id', 'name',
    'data', 'ng', 'src',
    'for', 'type', 'href',
    'values', 'title', 'alt',
    'role', 'aria'
  ];

  // A RegExp's for filtering and sorting
  var orderListFilterRegExp = new RegExp('(' + orderList.join('|') + ')');
  var orderListRegExp = orderList.map(function(item) {
    return new RegExp('^' + item);
  });

  return function(tree) {
    tree.walk(function(node) {
      if (!node.attrs) {
        return node;
      }

      var attrs = Object.keys(node.attrs);
      if (attrs.length === 1) {
        return node;
      }

      var sortedAttrs = [];
      var notSortedAttrs = [];
      attrs = attrs
        // The separation of the attributes on a sortable and not sortable
        .filter(function(attr) {
          if (orderListFilterRegExp.test(attr)) {
            return true;
          }
          notSortedAttrs.push(attr);
          return false;
        })
        .sort(function(a, b) {
          orderListRegExp.forEach(function(re, index) {
            if (re.test(a)) {
              a = index;
            }
            if (re.test(b)) {
              b = index;
            }
          });

          return a - b;
        })
        .concat(notSortedAttrs)
        .forEach(function(attr) {
          sortedAttrs[attr] = (node.attrs[attr]) ? node.attrs[attr] : true;
        });

      node.attrs = sortedAttrs;
      return node;
    });

    return tree;
  };
};
