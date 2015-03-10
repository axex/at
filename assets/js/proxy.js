function getParams () {
  var queryStr = document.location.href;

  return (function () {
      if (queryStr.indexOf('#') < 0) {
          return {};
      }
      var urlParams = {},
          e,
          d = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); },
          q = queryStr.substring(queryStr.indexOf('#') + 1),
          r = /([^;=]+)=?([^;]*)/g;

      while (e = r.exec(q)) {
        urlParams[d(e[1]).toLowerCase()] = d(e[2]);
      }

      return urlParams;
  })();
}
