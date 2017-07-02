import axios from 'axios';

var memoize = function(f) {
  var cache = {};

  return function() {
    var arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};

var pureHttpCall = memoize(function(url, params) {
  return function() {
    return getUrl(url, then);
  };
});

export default function getUrl(reposUrl, renderRepos) {
  axios
    .get(reposUrl)
    .then(renderRepos)
    .catch(() => {
      alert(`There was an error calling ${reposUrl}`);
    });
}
