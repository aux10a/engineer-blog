# engineer-blog

エンジニアブログプロジェクトです。Jekyll を使用した静的サイトジェネレーターで構築されています。

## 技術スタック

- Jekyll 4.0
- Docker / Docker Compose
- SCSS

## プロジェクト構成

```
.
├── _categories/        # カテゴリー定義ファイル
├── _layouts/          # レイアウトテンプレート
├── _posts/           # ブログ記事
├── assets/           # 静的ファイル（CSS, JavaScript）
├── _config.yml      # Jekyll設定ファイル
├── _config_dev.yml  # 開発環境用の追加設定
└── docker-compose.yml # Docker開発環境設定
```

## 開発環境

### 必要な環境

- Docker
- Docker Compose

### セットアップ手順

1. リポジトリをクローン
```bash
git clone [repository-url]
cd engineer-blog
```

2. Docker環境の起動
```bash
docker-compose up
```

これにより以下の環境が構築されます：
- Jekyll開発サーバー: http://localhost:4000
- ライブリロード対応 (port: 35729)

### 開発環境の特徴

- **Jekyll 4.0**: 最新のJekyllバージョンを使用
- **ライブリロード**: ファイル変更を検知して自動的にブラウザを更新
- **Docker化**: 環境依存のない開発環境
- **設定ファイルの分離**: 
  - `_config.yml`: 基本設定
  - `_config_dev.yml`: 開発環境用の追加設定

### ボリュームマウント

- `.:/srv/jekyll`: プロジェクトディレクトリ
- `./vendor/bundle:/usr/local/bundle`: Bundlerの依存関係

### 公開ポート

- `4000`: メインのWebサーバー
- `35729`: ライブリロード用WebSocket

## 本番環境

### デプロイ環境

- **ホスティング**: GitHub Pages
- **URL**: https://aux10a.github.io/engineer-blog
- **テーマ**: minimal theme (pages-themes/minimal)

### 機能と設定

- **SEO対策**:
  - OGP画像設定
  - Twitter/Facebookカード対応
  - サイトマップ自動生成
- **アナリティクス**: Google Analytics (G-ZEHXJ40S19)
- **パフォーマンス**:
  - CSSの圧縮設定有効
  - キャッシュ除外設定

### コンテンツ管理

- **ページネーション**: 1ページ12記事
- **カテゴリー**:
  - 開発Tips
  - アプリケーションレビュー
  - 個人開発プロジェクト
  - 技術チュートリアル
  - 低予算開発のノウハウ
