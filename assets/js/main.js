// 検索機能
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  const searchDataElement = document.getElementById('search-data');

  if (!searchInput || !searchButton || !searchResults || !searchDataElement) {
    console.error('検索に必要な要素が見つかりません');
    return;
  }

  let searchData;
  try {
    searchData = JSON.parse(searchDataElement.textContent);
  } catch (error) {
    console.error('検索データの解析に失敗しました:', error);
    return;
  }

  function doSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const results = searchData.posts
      .filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
      )
      .slice(0, 5);

    if (results.length) {
      const html = results
        .map(post => `<a href="${post.url}">${post.title}</a>`)
        .join('');
      searchResults.innerHTML = html;
    } else {
      searchResults.innerHTML = '<p class="no-results">記事が見つかりませんでした</p>';
    }
  }

  searchButton.addEventListener('click', doSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') doSearch();
  });
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
