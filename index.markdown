---
layout: default
title: トップページ
description: お手軽アプリ開発から便利ツールの紹介まで、にゃんこ目線でエンジニアリングの楽しさをお届けします。低予算でも実現できる開発手法や、実践的なプログラミングのコツを発信中！
permalink: /
---

<div class="column-inner">
  <div class="column-inner-2">
    <div class="navigation">
      <h2>記事を探す</h2>
      <div class="category-nav">
        {% for category in site.category_names %}
          {% capture category_url %}/categories/{{ category[0] }}/{% endcapture %}
          <a href="{{ category_url | relative_url }}" class="tag">{{ category[1] }}</a>
        {% endfor %}
      </div>
    </div>

    <h2>新着記事</h2>
    <div class="post-list" itemscope itemtype="http://schema.org/Blog">
      {% for post in site.posts limit:6 %}
      <a href="{{ post.url | relative_url }}" class="post-card-link" itemprop="url">
        <div class="post-card" itemprop="blogPost" itemscope itemtype="http://schema.org/BlogPosting">
          {% if post.layout == 'review' %}
            <h3 itemprop="headline">{{ post.title }}</h3>
          <div class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">
              {{ post.date | date: "%Y年%m月%d日" }}
            </time>
            {% if post.rating %}
            <span class="rating">評価: {{ post.rating }}/5</span>
            {% endif %}
          </div>
          {% if post.kit_name %}
          <div class="kit-info" itemprop="about" itemscope itemtype="http://schema.org/Product">
            <p itemprop="name">{{ post.kit_name }}</p>
            {% if post.maker %}<p class="maker" itemprop="manufacturer">{{ post.maker }}</p>{% endif %}
          </div>
          {% endif %}
          {% if post.categories %}
          <div class="post-categories">
            {% for cat in post.categories %}
              <span class="tag">{{ site.category_names[cat] }}</span>
            {% endfor %}
          </div>
          {% endif %}
          <meta itemprop="author" content="{{ post.author | default: site.author.name }}">
          <meta itemprop="description" content="{{ post.content | strip_html | truncate: 160 }}">
        {% else %}
          <h3 itemprop="headline">{{ post.title }}</h3>
          <div class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">
              {{ post.date | date: "%Y年%m月%d日" }}
            </time>
          </div>
          <meta itemprop="author" content="{{ post.author | default: site.author.name }}">
          <meta itemprop="description" content="{{ post.content | strip_html | truncate: 160 }}">
        {% endif %}
        </div>
      </a>
      {% endfor %}
    </div>

    {% if site.posts.size > 6 %}
    <div class="more-posts">
      <a href="{{ '/archive/' | relative_url }}" class="button">もっと見る →</a>
    </div>
    {% endif %}
  </div>
</div>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Blog",
  "url": "{{ site.url }}",
  "name": {{ site.title | jsonify }},
  "description": {{ site.description | jsonify }},
  "publisher": {
    "@type": "Organization",
    "name": {{ site.title | jsonify }},
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}/assets/images/default-ogp.jpg"
    }
  },
  "blogPost": [
    {% for post in site.posts limit:6 %}
    {
      "@type": "BlogPosting",
      "headline": {{ post.title | jsonify }},
      "url": "{{ post.url | absolute_url }}",
      "datePublished": "{{ post.date | date_to_xmlschema }}",
      "author": {
        "@type": "Person",
        "name": {{ post.author | default: site.author.name | jsonify }}
      },
      "description": {{ post.content | strip_html | truncate: 160 | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
