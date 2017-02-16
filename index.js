module.exports = function(opts) {
  // Added Angular after data. See https://github.com/mdo/code-guide/issues/106
  var orderList = (opts && opts.order) || [
    'class', 'id', 'name',
    'data', 'ng', 'src',
    'for', 'type', 'href',
    'values', 'title', 'alt',
    'role', 'aria',
    '$unknown$'
  ];

  // A RegExp's for filtering and sorting
  var orderListFilterRegExp = new RegExp('^(' + orderList.join('|') + ')');
  var orderListRegExp = orderList.map(function(item) {
    return new RegExp('^' + item);
  });

  return function(tree) {
    tree.walk(function(node) {
      if (!node.attrs) {
        return node;
      }

      var attrs = Object.keys(node.attrs);

      if (attrs.length === 1 || orderList.length === 0) {
        return node;
      }

      var sortableAttrs = [];
      var sortedAttrs = [];
      var notSortedAttrs = [];
      var notSortedAttrsIndex = orderList.indexOf('$unknown$');
      var finalAttrs = {};

      if (notSortedAttrsIndex === -1) {
        notSortedAttrsIndex = orderList.length;
      }

      sortableAttrs = attrs
        // The separation of the attributes on a sortable and not sortable basis
        .filter(function(attr) {
          if (orderListFilterRegExp.test(attr)) {
            return true;
          }

          notSortedAttrs.push(attr);

          return false;
        });

      sortedAttrs = orderListRegExp
        // match to each position
        .map(function(regex) {
          return sortableAttrs
            // attrs that belong in this regex group
            .filter(function(attr) {
              return regex.test(attr);
            })
            // alpha desc sort each group
            .sort(function(a, b) {
              return typeof a.localeCompare === 'function' ? a.localeCompare(b) : a - b;
            });
        })
        // remove empty groups
        .filter(function(group) {
          return group.length > 0;
        });

      sortedAttrs
        // put the non-sorted attributes in desired slot
        .splice(notSortedAttrsIndex, 0, notSortedAttrs);

      sortedAttrs.forEach(function(group) {
        group.forEach(function(attr) {
          finalAttrs[attr] = (node.attrs[attr]) ? node.attrs[attr] : true;
        });
      });

      node.attrs = finalAttrs;

      return node;
    });

    return tree;
  };
};
