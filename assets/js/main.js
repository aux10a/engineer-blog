// 検索機能
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  const searchDataList = document.getElementById('search-data-list');

  if (!searchInput || !searchButton || !searchResults || !searchDataList) {
    console.error('検索に必要な要素が見つかりません');
    return;
  }

  function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  const searchData = {
    posts: Array.from(searchDataList.querySelectorAll('.search-item')).map(item => ({
      title: decodeHtmlEntities(item.dataset.title),
      url: item.dataset.url,
      content: decodeHtmlEntities(item.dataset.content),
      category: item.dataset.category
    }))
  };

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
        .map(post => `<a href="${post.url}" class="search-result-item">
          <span class="search-result-title">${post.title}</span>
        </a>`)
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

  // インクリメンタルサーチ
  searchInput.addEventListener('input', function() {
    if (this.value.length >= 2) {
      doSearch();
    } else {
      searchResults.innerHTML = '';
    }
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
