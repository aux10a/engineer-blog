// 検索機能の実装
function setupSearch() {
  var searchInput = document.getElementById('search-input');
  var searchButton = document.getElementById('search-button');
  var searchResults = document.getElementById('search-results');

  if (searchInput && searchButton && searchResults) {
    searchButton.addEventListener('click', doSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  function doSearch() {
    var query = searchInput.value.toLowerCase();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    fetch('/posts.json')
      .then(function(response) { return response.json(); })
      .then(function(posts) {
        var results = posts.filter(function(post) {
          return post.title.toLowerCase().includes(query) || 
                 post.content.toLowerCase().includes(query);
        }).slice(0, 5);

        if (results.length) {
          var html = '';
          for (var i = 0; i < results.length; i++) {
            html += '<a href="' + results[i].url + '">' + results[i].title + '</a>';
          }
          searchResults.innerHTML = html;
        } else {
          searchResults.innerHTML = '<p class="no-results">記事が見つかりませんでした</p>';
        }
      });
  }
}

// コピー機能の実装
function setupCodeCopy() {
  document.querySelectorAll('pre').forEach(function(pre) {
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'コピー';
    wrapper.appendChild(button);

    button.addEventListener('click', function() {
      var code = pre.textContent;
      navigator.clipboard.writeText(code).then(function() {
        button.textContent = 'コピー完了！';
        button.classList.add('copied');
        setTimeout(function() {
          button.textContent = 'コピー';
          button.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
  setupSearch();
  setupCodeCopy();
});
